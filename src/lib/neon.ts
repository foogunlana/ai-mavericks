import { useAuth } from '@clerk/react'

// Base URL of the Neon Data API (PostgREST), e.g.
// https://ep-xxxx.apirest.<region>.aws.neon.tech/neondb/rest/v1
const apiUrl = import.meta.env.VITE_NEON_API_URL as string | undefined

async function dataApiFetch(
  path: string,
  token: string,
  init?: RequestInit,
): Promise<unknown> {
  if (!apiUrl) throw new Error('Neon Data API URL not configured')
  const res = await fetch(`${apiUrl}/${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Neon Data API error: ${res.status} ${body}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export function useNeon() {
  const { getToken } = useAuth()

  // SELECT rows from a table/view. `query` is the PostgREST query string
  // (e.g. 'select=*&order=date.desc'). Returns the row array directly.
  const select = async <T = Record<string, unknown>>(
    resource: string,
    query = 'select=*',
  ): Promise<T[]> => {
    const token = await getToken({ template: 'neon' })
    if (!token) throw new Error('Not authenticated')
    const data = await dataApiFetch(`${resource}?${query}`, token)
    return (data as T[]) ?? []
  }

  // Call a Postgres function exposed via PostgREST RPC.
  const rpc = async <T = unknown>(
    fn: string,
    params: Record<string, unknown> = {},
  ): Promise<T> => {
    const token = await getToken({ template: 'neon' })
    if (!token) throw new Error('Not authenticated')
    const data = await dataApiFetch(`rpc/${fn}`, token, {
      method: 'POST',
      body: JSON.stringify(params),
    })
    return data as T
  }

  return { select, rpc }
}

// Dev-only diagnostic: verify a Clerk JWT is accepted by the Data API and RLS
// returns rows. Used by JWTTestComponent.
export async function testNeonJWTAuth(jwtToken: string) {
  try {
    if (!apiUrl) throw new Error('Neon Data API URL not configured')
    const res = await fetch(`${apiUrl}/members_view?select=slug&limit=1`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    const text = await res.text()
    if (!res.ok) {
      return { success: false, error: `${res.status} ${text}` }
    }
    return { success: true, data: JSON.parse(text) }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
