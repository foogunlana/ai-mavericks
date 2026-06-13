/**
 * Centralized auth/data configuration detection.
 *
 * The app must render its public content even when no real credentials are
 * configured (e.g. a fresh clone where .env still holds the .env.example
 * placeholders). We therefore validate the Clerk publishable key's FORMAT
 * rather than just checking it's non-empty — the placeholder
 * `pk_test_your_clerk_key_here` is non-empty but is not a usable key and would
 * crash ClerkProvider at render time.
 */

function isValidClerkKey(key: string | undefined): key is string {
  if (!key) return false;
  const match = /^pk_(test|live)_(.+)$/.exec(key);
  if (!match) return false;
  try {
    // Clerk encodes the Frontend API host as base64 ending with '$'.
    // Placeholders ('your_clerk_key_here') aren't valid base64 → throws.
    return atob(match[2]).endsWith('$');
  } catch {
    return false;
  }
}

function isValidUrl(url: string | undefined): url is string {
  if (!url) return false;
  // Reject the .env.example placeholder host
  if (url.includes('your-project-id')) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/** The Clerk publishable key, or undefined if missing/placeholder/invalid. */
export const clerkPublishableKey: string | undefined = isValidClerkKey(
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
)
  ? import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  : undefined;

/** The Neon Data API URL, or undefined if missing/placeholder/invalid. */
export const neonApiUrl: string | undefined = isValidUrl(
  import.meta.env.VITE_NEON_API_URL,
)
  ? import.meta.env.VITE_NEON_API_URL
  : undefined;

/** True only when Clerk auth is usable (valid key present). */
export const clerkEnabled = !!clerkPublishableKey;

/** True only when both Clerk and Neon are configured for the live data path. */
export const authEnabled = !!clerkPublishableKey && !!neonApiUrl;
