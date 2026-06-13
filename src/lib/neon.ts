import { useAuth } from '@clerk/clerk-react'

const apiUrl = import.meta.env.VITE_NEON_API_URL
const apiKey = import.meta.env.VITE_NEON_API_KEY

if (!apiUrl) {
  throw new Error('Missing VITE_NEON_API_URL environment variable')
}

export interface NeonQueryOptions {
  arrayMode?: boolean
}

export interface NeonResult {
  fields: Array<{ name: string; dataTypeID: number }>
  command: string
  rows: any[]
}

async function queryWithApiKey(
  statement: string,
  options?: NeonQueryOptions
): Promise<NeonResult[]> {
  if (!apiKey) {
    throw new Error('Neon API key not configured')
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      statement,
      arrayMode: options?.arrayMode ?? false,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Neon API error: ${response.status} ${error}`)
  }

  const data = await response.json()
  return data.results || []
}

export async function queryWithJWT(
  statement: string,
  jwtToken: string,
  options?: NeonQueryOptions
): Promise<NeonResult[]> {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({
      statement,
      arrayMode: options?.arrayMode ?? false,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Neon API error: ${response.status} ${error}`)
  }

  const data = await response.json()
  return data.results || []
}

export function useNeon() {
  const { getToken } = useAuth()

  const query = async (statement: string, options?: NeonQueryOptions) => {
    const token = await getToken({ template: 'neon' })
    if (!token) {
      throw new Error('Not authenticated - cannot get Clerk JWT')
    }
    return queryWithJWT(statement, token, options)
  }

  return { query, queryWithApiKey }
}

export async function testNeonJWTAuth(jwtToken: string) {
  try {
    const result = await queryWithJWT(
      'SELECT auth.user_id() as user_id, current_user;',
      jwtToken
    )
    return {
      success: true,
      data: result,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
