import { ClerkProvider as ClerkReactProvider } from '@clerk/clerk-react'
import { ReactNode } from 'react'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY environment variable')
}

export function ClerkProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkReactProvider publishableKey={publishableKey}>
      {children}
    </ClerkReactProvider>
  )
}
