'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Header() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/"); // Redirect to home page after successful sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 shadow-md fixed top-0 left-0 z-40 backdrop-blur" style={{ backgroundColor: '#FEEDD2' }}>
      <div className="flex items-center ml-2">
        <Link href="/" className="flex items-center mr-2 sm:mr-4">
          <img
            src="/logoHD.png"
            alt="KahaaNi Game Logo"
            className="h-8 w-auto sm:h-12"
          />
        </Link>
      </div>
      <div className="flex items-center gap-3 sm:gap-6 sm:absolute sm:left-1/4">
        <Link href="/" className="text-sm sm:text-base font-medium text-[#7a4c15] px-2 sm:px-4 py-1 sm:py-2 rounded-full transition-all hover:bg-[#f7ecd7] hover:text-[#a86c2c]" style={{ backgroundColor: '#FEEDD2' }}>Home</Link>
        <Link href="/about" className="text-sm sm:text-base font-medium text-[#7a4c15] px-2 sm:px-4 py-1 sm:py-2 rounded-full transition-all hover:bg-[#f7ecd7] hover:text-[#a86c2c]" style={{ backgroundColor: '#FEEDD2' }}>About Us</Link>
      </div>
      <button
        onClick={handleGoogleSignIn}
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        className="flex items-center ml-2 sm:ml-0"
      >
        <img
          src="/btn_google_signin_dark_normal_web.png"
          alt="Sign in with Google"
          className="h-6 sm:h-10"
        />
      </button>
    </nav>
  );
} 