'use client';
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";

// Custom hook to get header height
export function useHeaderHeight() {
  const [headerHeight, setHeaderHeight] = useState(112); // Default fallback
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
        // Set CSS custom property for use in other components
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    // Initial measurement
    updateHeaderHeight();

    // Update on resize
    window.addEventListener('resize', updateHeaderHeight);
    
    // Update when fonts load (can affect height)
    document.fonts?.ready.then(updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  return { headerHeight, headerRef };
}

export default function Header() {
  const router = useRouter();
  let pathname = usePathname();
  if (pathname !== '/' && pathname.endsWith('/')) pathname = pathname.slice(0, -1);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { headerRef } = useHeaderHeight();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav 
      ref={headerRef}
      className="w-full flex items-center justify-between px-8 py-4 shadow-md fixed top-0 left-0 z-40 backdrop-blur" 
      style={{ backgroundColor: '#FEEDD2' }}
    >
      <div className="flex items-center ml-2">
        <Link href="/" className="flex items-center mr-2 sm:mr-4">
          <img
            src="/logoHD.png"
            alt="KahaaNi Game Logo"
            className="h-8 w-auto sm:h-12"
          />
        </Link>
        {isLoggedIn && (
          <div className="text-lg font-semibold text-[#7a4c15] ml-2">
            My Account
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 sm:gap-6 sm:absolute sm:left-1/4">
        {!isLoggedIn && (
          <>
            <Link
              href="/"
              className={`text-sm sm:text-base font-medium px-2 sm:px-4 py-1 sm:py-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#a86c2c]
                text-[#7a4c15] hover:bg-[#d4b896] hover:text-[#7a4c15] focus:bg-[#d4b896] focus:text-[#7a4c15]`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm sm:text-base font-medium px-2 sm:px-4 py-1 sm:py-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#a86c2c]
                ${pathname === '/about' ? 'bg-[#7a4c15] text-white' : 'text-[#7a4c15] hover:bg-[#d4b896] hover:text-[#7a4c15] focus:bg-[#d4b896] focus:text-[#7a4c15]'}`}
            >
              About Us
            </Link>
          </>
        )}
      </div>
      
      {!loading && (
        <>
          {!isLoggedIn && (
            <a
              href="/sign-in"
              className={`ml-2 sm:ml-0 text-sm sm:text-base font-medium px-2 sm:px-4 py-1 sm:py-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#a86c2c]
                ${pathname === '/sign-in' ? 'bg-[#7a4c15] text-white' : 'text-[#7a4c15] hover:bg-[#d4b896] hover:text-[#7a4c15] focus:bg-[#d4b896] focus:text-[#7a4c15]'}`}
            >
              Sign-in
            </a>
          )}
        </>
      )}
    </nav>
  );
} 