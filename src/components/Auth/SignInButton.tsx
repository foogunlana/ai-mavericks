import { Show, SignInButton as ClerkSignInButton } from '@clerk/react';
import { FlashyBtn } from '../FlashyBtn/FlashyBtn';
import { clerkEnabled } from '../../lib/authConfig';

export function SignInButton() {
  if (!clerkEnabled) return null;
  return (
    <Show when="signed-out">
      <ClerkSignInButton mode="modal">
        <FlashyBtn>Sign in</FlashyBtn>
      </ClerkSignInButton>
    </Show>
  );
}
