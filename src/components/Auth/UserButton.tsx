import { SignedIn, UserButton as ClerkUserButton } from '@clerk/clerk-react';

export function UserButton() {
  return (
    <SignedIn>
      <div className="flex items-center">
        <ClerkUserButton
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8 rounded',
              userButtonPopoverCard: 'rounded border border-[#e5e7eb] shadow-sm font-[Space_Grotesk]',
              userButtonPopoverActionButton: 'text-sm text-[#1a1a1a] hover:bg-[#f9fafb]',
              userButtonPopoverActionButtonText: 'text-sm font-medium text-[#1a1a1a]',
              userButtonPopoverFooter: 'hidden',
            },
          }}
        />
      </div>
    </SignedIn>
  );
}
