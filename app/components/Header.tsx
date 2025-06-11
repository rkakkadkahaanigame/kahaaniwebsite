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
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white/80 shadow-md fixed top-0 left-0 z-40 backdrop-blur">
      <div className="flex items-center gap-6 ml-2">
        <Link href="/" className="text-lg font-semibold text-[#7a4c15] px-4 py-2 rounded-full transition-all hover:bg-[#f7ecd7] hover:text-[#a86c2c]">Home</Link>
        <Link href="/about" className="text-lg font-semibold text-[#7a4c15] px-4 py-2 rounded-full transition-all hover:bg-[#f7ecd7] hover:text-[#a86c2c]">About Us</Link>
      </div>
      <button
        onClick={handleGoogleSignIn}
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        className="flex items-center"
      >
        <img
          src="/btn_google_signin_dark_normal_web.png"
          alt="Sign in with Google"
          style={{ height: 40 }}
        />
      </button>
    </nav>
  );
} 