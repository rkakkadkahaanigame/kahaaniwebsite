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
    <main className="h-full flex flex-col items-center justify-start px-4 pt-16 pb-16">
      <div className="w-full max-w-md mx-auto bg-white/90 rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-[#7a4c15] mb-2">Sign-in to manage your account</h2>
        
        <div className="my-8">
          <button onClick={handleGoogleSignIn} className="focus:outline-none hover:scale-105 transition-transform">
            <img src="/btn_google_signin_dark_normal_web.png" alt="Sign in with Google" className="h-12 mx-auto" />
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          <em>Note: Only existing users can sign-in here.</em>
        </p>
      </div>
    </main>
  );
} 