import { Show, SignInButton as ClerkSignInButton } from '@clerk/react';
import { clerkEnabled } from '../../lib/authConfig';

export function SignInButton() {
  if (!clerkEnabled) return null;
  return (
    <Show when="signed-out">
      <ClerkSignInButton mode="modal">
        <button className="bg-[#5b21b6] text-white text-sm font-medium px-4 py-2 rounded cursor-pointer hover:bg-[#4c1d95] transition-colors">
          Sign in
        </button>
      </ClerkSignInButton>
    </Show>
  );
}
