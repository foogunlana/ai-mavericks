import { ClerkProvider as ClerkReactProvider } from '@clerk/react'
import type { ReactNode } from 'react'
import { clerkPublishableKey } from '../lib/authConfig'

export function ClerkProvider({ children }: { children: ReactNode }) {
  if (!clerkPublishableKey) {
    // No valid Clerk key configured — render without auth (public content still works)
    return <>{children}</>
  }
  return (
    <ClerkReactProvider publishableKey={clerkPublishableKey}>
      {children}
    </ClerkReactProvider>
  )
}
