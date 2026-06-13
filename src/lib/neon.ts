import { useAuth } from '@clerk/react'

const apiUrl = import.meta.env.VITE_NEON_API_URL as string | undefined

export function useNeon() {
  const { getToken } = useAuth()

  async function apiGet<T = Record<string, unknown>>(path: string): Promise<T[]> {
    if (!apiUrl) throw new Error('VITE_NEON_API_URL not configured')
    const token = await getToken()
    if (!token) throw new Error('Not authenticated')
    const res = await fetch(`${apiUrl}/${path}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })
    if (!res.ok) throw new Error(`Neon Data API ${res.status}: ${await res.text()}`)
    return res.json() as Promise<T[]>
  }

  return { apiGet }
}

/**
 * @deprecated This function used the old SQL-over-HTTP approach with a neon
 * JWT template. It is kept only so JWTTestComponent continues to compile.
 * It will always throw because the old SQL endpoint is no longer configured.
 */
export async function testNeonJWTAuth(_jwtToken: string): Promise<{ success: boolean; error: string }> {
  return {
    success: false,
    error: 'testNeonJWTAuth is deprecated — the SQL-over-HTTP endpoint has been removed. Use the Neon Data API (PostgREST) instead.',
  }
}
