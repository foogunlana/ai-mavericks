import { ClerkProvider as ClerkReactProvider } from '@clerk/react'
import type { ReactNode } from 'react'
import { clerkPublishableKey } from '../lib/authConfig'

export function ClerkProvider({ children }: { children: ReactNode }) {
  if (!clerkPublishableKey) {
    // No valid Clerk key configured — render without auth (public content still works)
    return <>{children}</>
  }
  // The app is served under a base path (/ai-mavericks/ for GitHub Pages). Use an
  // ABSOLUTE redirect target (origin + base, with trailing slash) and FORCE it,
  // so Clerk's post-auth + sign-out redirects land exactly on the app root rather
  // than the site root or a slash-less path that Vite/GitHub Pages reject (the
  // "did you mean /ai-mavericks/" page). Fallback set too for query-less flows.
  const appUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${import.meta.env.BASE_URL}`
      : import.meta.env.BASE_URL
  return (
    <ClerkReactProvider
      publishableKey={clerkPublishableKey}
      signInForceRedirectUrl={appUrl}
      signUpForceRedirectUrl={appUrl}
      signInFallbackRedirectUrl={appUrl}
      signUpFallbackRedirectUrl={appUrl}
      afterSignOutUrl={appUrl}
    >
      {children}
    </ClerkReactProvider>
  )
}
