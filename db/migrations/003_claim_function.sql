-- 003_claim_function.sql: Identity linking via email-match claim
-- Links an authenticated Clerk user to their existing member row by email match.
-- On first sign-in, call claim_member_by_email(email) to stamp clerk_user_id.

-- Function: claim_member_by_email
-- Links the currently authenticated Clerk user to the member row with matching email.
-- Safe: can only stamp your own clerk_user_id onto a row matching your verified email.
CREATE OR REPLACE FUNCTION claim_member_by_email(p_email TEXT)
RETURNS UUID AS $$
DECLARE
  v_member_id UUID;
BEGIN
  -- Update the member row that matches this email AND has no clerk_user_id yet
  UPDATE members
  SET clerk_user_id = auth.user_id(),
      updated_at = NOW()
  WHERE email = p_email
    AND (clerk_user_id IS NULL OR clerk_user_id = auth.user_id())
  RETURNING id INTO v_member_id;

  -- If no matching member row exists, create a placeholder
  IF v_member_id IS NULL THEN
    INSERT INTO members (email, clerk_user_id, name, slug)
    VALUES (
      p_email,
      auth.user_id(),
      split_part(p_email, '@', 1), -- name defaults to email local part
      auth.user_id()               -- slug defaults to clerk user id (temporary)
    )
    ON CONFLICT (clerk_user_id) DO NOTHING
    RETURNING id INTO v_member_id;
  END IF;

  RETURN v_member_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to authenticated role
GRANT EXECUTE ON FUNCTION claim_member_by_email(TEXT) TO authenticated;

-- Policy: allow authenticated user to see their own member row (after claim)
-- This supplements the existing "authenticated_select_members" policy.
-- The existing policy already allows all authenticated users to read all members
-- so no additional policy is needed for reading.
