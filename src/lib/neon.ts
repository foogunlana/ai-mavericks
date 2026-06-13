import { useAuth } from '@clerk/react'

const apiUrl = import.meta.env.VITE_NEON_API_URL as string | undefined

export function useNeon() {
  const { getToken } = useAuth()

  // The Neon Data API requires a Clerk JWT minted from the 'neon' template,
  // which carries role=authenticated (drives the Postgres role switch) plus the
  // user's verified email — read server-side by claim_member() for identity
  // linking. Never send a raw client-supplied email; it must come from the JWT.
  async function token(): Promise<string> {
    const t = await getToken({ template: 'neon' })
    if (!t) throw new Error('Not authenticated')
    return t
  }

  async function apiGet<T = Record<string, unknown>>(path: string): Promise<T[]> {
    if (!apiUrl) throw new Error('VITE_NEON_API_URL not configured')
    const res = await fetch(`${apiUrl}/${path}`, {
      headers: { Authorization: `Bearer ${await token()}`, Accept: 'application/json' },
    })
    if (!res.ok) throw new Error(`Neon Data API ${res.status}: ${await res.text()}`)
    return res.json() as Promise<T[]>
  }

  // Call a Postgres function exposed via PostgREST RPC (POST /rpc/<fn>).
  async function rpc<T = unknown>(
    fn: string,
    body: Record<string, unknown> = {},
  ): Promise<T> {
    if (!apiUrl) throw new Error('VITE_NEON_API_URL not configured')
    const res = await fetch(`${apiUrl}/rpc/${fn}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await token()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`Neon Data API rpc/${fn} ${res.status}: ${await res.text()}`)
    return res.json() as Promise<T>
  }

  return { apiGet, rpc }
}

/**
 * @deprecated The old SQL-over-HTTP endpoint has been removed in favour of the
 * Neon Data API (PostgREST). Kept only so JWTTestComponent continues to compile.
 */
export async function testNeonJWTAuth(_jwtToken: string): Promise<{ success: boolean; error: string }> {
  return {
    success: false,
    error: 'testNeonJWTAuth is deprecated — use the Neon Data API (PostgREST) instead.',
  }
}
