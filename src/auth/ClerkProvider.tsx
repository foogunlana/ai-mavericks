import { ClerkProvider as ClerkReactProvider } from '@clerk/clerk-react'
import type { ReactNode } from 'react'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export function ClerkProvider({ children }: { children: ReactNode }) {
  if (!publishableKey) {
    // No Clerk key configured — render without auth (public content still works)
    return <>{children}</>
  }
  return (
    <ClerkReactProvider publishableKey={publishableKey}>
      {children}
    </ClerkReactProvider>
  )
}
