import { ClerkProvider as ClerkReactProvider } from '@clerk/react'
import type { ReactNode } from 'react'
import { clerkPublishableKey } from '../lib/authConfig'

export function ClerkProvider({ children }: { children: ReactNode }) {
  if (!clerkPublishableKey) {
    // No valid Clerk key configured — render without auth (public content still works)
    return <>{children}</>
  }
  // The app is served under a base path (/ai-mavericks/ for GitHub Pages), so
  // point Clerk's post-auth redirects back into that base instead of the site
  // root — otherwise sign-in/up lands on Vite's "did you mean /ai-mavericks/" page.
  const baseUrl = import.meta.env.BASE_URL
  return (
    <ClerkReactProvider
      publishableKey={clerkPublishableKey}
      signInFallbackRedirectUrl={baseUrl}
      signUpFallbackRedirectUrl={baseUrl}
      afterSignOutUrl={baseUrl}
    >
      {children}
    </ClerkReactProvider>
  )
}
