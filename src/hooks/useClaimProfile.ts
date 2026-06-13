/**
 * useClaimProfile
 *
 * On first authenticated load, calls the `claim_member` Data API RPC to link the
 * Clerk user to their member row. The RPC is SECURITY DEFINER and reads BOTH the
 * user id and the verified email from the JWT (never from client input), so a
 * user can only:
 *   - retrieve their own already-linked row,
 *   - claim an UNCLAIMED row whose email matches their verified email, or
 *   - create their own member row.
 * No impersonation is possible.
 */

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@clerk/react'
import { useNeon } from '../lib/neon'

export interface ClaimProfileState {
  memberId: string | null
  claimed: boolean
  loading: boolean
  error: Error | null
}

interface ClaimedMember {
  id: string
}

export function useClaimProfile(): ClaimProfileState {
  const { isSignedIn } = useAuth()
  const { rpc } = useNeon()

  const [memberId, setMemberId] = useState<string | null>(null)
  const [claimed, setClaimed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Guard against running more than once per session.
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isSignedIn || hasRun.current) return
    hasRun.current = true

    let cancelled = false
    setLoading(true)
    setError(null)

    rpc<ClaimedMember | null>('claim_member')
      .then((member) => {
        if (cancelled) return
        setMemberId(member?.id ?? null)
        setClaimed(Boolean(member?.id))
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err : new Error(String(err)))
        hasRun.current = false // allow retry on next sign-in
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
    // rpc is recreated each render; intentionally keyed only on auth state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn])

  return { memberId, claimed, loading, error }
}
