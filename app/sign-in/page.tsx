'use client';

import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/'); // Redirect to home page after successful sign-in
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <button onClick={handleGoogleSignIn} className="focus:outline-none">
        <img src="/btn_google_signin_dark_normal_web.png" alt="Sign in with Google" className="h-10" />
      </button>
    </div>
  );
} 