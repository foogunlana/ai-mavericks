import { useAuth } from '@clerk/clerk-react'
import { useState } from 'react'
import { testNeonJWTAuth } from '../lib/neon'

export function JWTTestComponent() {
  const { getToken, isLoaded } = useAuth()
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleTest = async () => {
    setLoading(true)
    try {
      const token = await getToken({ template: 'neon' })
      if (!token) {
        setTestResult({ error: 'No token - user might not be authenticated' })
        return
      }

      const result = await testNeonJWTAuth(token)
      setTestResult(result)
    } catch (error) {
      setTestResult({
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) return <div>Loading auth...</div>

  return (
    <div className="border rounded p-4 my-4">
      <h3 className="font-bold mb-2">JWT Auth Test</h3>
      <button
        onClick={handleTest}
        disabled={loading}
        className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test JWT Auth'}
      </button>
      {testResult && (
        <pre className="mt-3 bg-gray-100 p-2 rounded text-sm overflow-auto">
          {JSON.stringify(testResult, null, 2)}
        </pre>
      )}
    </div>
  )
}
