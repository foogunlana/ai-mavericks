import { SignInButton as ClerkSignInButton } from '@clerk/clerk-react';

interface GatePromptProps {
  onSignIn?: () => void;
}

export function GatePrompt({ onSignIn: _onSignIn }: GatePromptProps) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
      <h2
        className="text-2xl font-semibold text-white"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Members only
      </h2>
      <p className="text-neutral-400 text-base max-w-sm">
        Sign in to access the community directory.
      </p>
      <ClerkSignInButton mode="modal">
        <button className="bg-[#5b21b6] text-white text-sm font-semibold px-6 py-3 rounded cursor-pointer hover:bg-[#4c1d95] transition-colors">
          Sign in
        </button>
      </ClerkSignInButton>
    </div>
  );
}
