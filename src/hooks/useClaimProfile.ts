/**
 * useClaimProfile
 *
 * On first authenticated load, calls claim_member_by_email(email) to link the
 * Clerk user to their member row in the database. This stamps
 * members.clerk_user_id = auth.user_id() for the row matching the user's
 * verified primary email.
 *
 * Security notes:
 * - claim_member_by_email is SECURITY DEFINER so it runs with elevated
 *   privileges, but it only stamps auth.user_id() (the authenticated user's
 *   own ID from the JWT) — it cannot stamp a different user's ID.
 * - The email parameter is the user's own verified email from Clerk, which the
 *   client passes in.
 * - The UPDATE condition `AND (clerk_user_id IS NULL OR clerk_user_id =
 *   auth.user_id())` ensures you can only claim an unclaimed row or re-claim
 *   your own.
 */

import { useState, useEffect, useRef } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import { useNeon } from '../lib/neon'

export interface ClaimProfileState {
  memberId: string | null
  claimed: boolean
  loading: boolean
  error: Error | null
}

export function useClaimProfile(): ClaimProfileState {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const { query } = useNeon()

  const [memberId, setMemberId] = useState<string | null>(null)
  const [claimed, setClaimed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Guard against running more than once per session
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isSignedIn) return
    if (hasRun.current) return

    const email = user?.primaryEmailAddress?.emailAddress
    if (!email) return

    hasRun.current = true
    setLoading(true)

    query(`SELECT claim_member_by_email('${email.replace(/'/g, "''")}') AS member_id`)
      .then((results) => {
        const row = results[0]?.rows[0]
        const id: string | null = row?.member_id ?? null
        setMemberId(id)
        setClaimed(true)
        setLoading(false)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err : new Error(String(err)))
        setLoading(false)
        // Allow retry on next render if claim failed
        hasRun.current = false
      })
  }, [isSignedIn, user, query])

  return { memberId, claimed, loading, error }
}
