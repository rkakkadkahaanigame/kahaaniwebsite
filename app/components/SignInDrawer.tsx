import React from 'react';

interface SignInDrawerProps {
  open: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void;
}

export default function SignInDrawer({ open, onClose, onGoogleSignIn }: SignInDrawerProps) {
  return (
    <div>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-50 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 flex flex-col items-center pt-8 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-[#7a4c15] mb-8">Sign in to Kahaani</h2>
        <button onClick={onGoogleSignIn} className="focus:outline-none">
          <img src="/btn_google_signin_dark_normal_web.png" alt="Sign in with Google" className="h-10" />
        </button>
      </div>
    </div>
  );
} 