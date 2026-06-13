-- 003_claim_function.sql — Secure identity linking on sign-in.
-- claim_member() reads BOTH the user id and the verified email from the JWT
-- (never from client input), so a caller can only: return their own linked row,
-- claim an UNCLAIMED row whose email matches their verified email, or create
-- their own row. No impersonation is possible. Exposed via PostgREST as
-- POST /rpc/claim_member.

CREATE OR REPLACE FUNCTION claim_member()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid   TEXT := auth.user_id();
  v_email TEXT := lower(auth.jwt() ->> 'email');
  v_member members%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  SELECT * INTO v_member FROM members WHERE clerk_user_id = v_uid LIMIT 1;
  IF FOUND THEN
    RETURN to_jsonb(v_member);
  END IF;

  IF v_email IS NOT NULL THEN
    UPDATE members SET clerk_user_id = v_uid, email = v_email, updated_at = NOW()
    WHERE lower(email) = v_email AND clerk_user_id IS NULL
    RETURNING * INTO v_member;
    IF FOUND THEN
      RETURN to_jsonb(v_member);
    END IF;
  END IF;

  INSERT INTO members (clerk_user_id, email, name, slug)
  VALUES (v_uid, v_email, COALESCE(NULLIF(split_part(v_email, '@', 1), ''), 'member'), v_uid)
  ON CONFLICT (clerk_user_id) DO UPDATE SET updated_at = NOW()
  RETURNING * INTO v_member;

  RETURN to_jsonb(v_member);
END;
$$;

GRANT EXECUTE ON FUNCTION claim_member() TO authenticated;
REVOKE EXECUTE ON FUNCTION claim_member() FROM anonymous;
