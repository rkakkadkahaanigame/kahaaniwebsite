"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, deleteUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Header, { useHeaderHeight } from "./components/Header";
import HeroSection from "./components/HeroSection";
import ScreenshotsSection from "./components/ScreenshotsSection";
import UserAccountSection from "./components/UserAccountSection";
import Footer from "./components/Footer";

export default function Home() {
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading" | "notfound">("loading");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [usage, setUsage] = useState<any>(null);
  const [level, setLevel] = useState<any>(null);
  const [progressLoading, setProgressLoading] = useState(false);
  const [progressError, setProgressError] = useState("");
  const { headerHeight } = useHeaderHeight();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        
        // Check if user exists in Firestore
        setProgressLoading(true);
        setProgressError("");
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            // User exists - proceed normally
            const data = userDoc.data();
            setUsage(data.usage || {});
            setLevel(data.level || {});
            setStatus("success");
          } else {
            // User doesn't exist in Firestore - delete Firebase Auth account
            try {
              await deleteUser(user);
              setStatus("notfound");
            } catch (deleteError) {
              console.error("Error deleting new user:", deleteError);
              setStatus("notfound");
            }
            setUsage(null);
            setLevel(null);
          }
        } catch (error) {
          console.error("Error checking user data:", error);
          setProgressError("Failed to fetch user data.");
          setUsage({});
          setLevel({});
          setStatus("success"); // Still allow them to see account if there's a fetch error
        } finally {
          setProgressLoading(false);
        }
      } else {
        setStatus("idle");
        setUserEmail(null);
        setUsage(null);
        setLevel(null);
        setProgressLoading(false);
        setProgressError("");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setStatus("loading");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Status will be updated by the auth state listener
    } catch (err) {
      console.error("Sign-in error:", err);
      setStatus("error");
    }
  };

  const handleLogout = () => {
    // Status will be updated by the auth state listener
    setStatus("idle");
  };

  const isLoggedIn = status === "success";
  const isLoading = status === "loading";
  const isNotFound = status === "notfound";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main 
        className="h-full flex flex-col items-center justify-center px-4 pb-16" 
      >
        {isLoading && (
          <div className="text-center py-8">
            <p className="text-[#7a4c15] text-lg">Loading...</p>
          </div>
        )}
        
        {!isLoading && !isLoggedIn && !isNotFound && (
          <>
            <HeroSection onGoogleSignIn={handleGoogleSignIn} status={status} />
            <ScreenshotsSection />
          </>
        )}

        {!isLoading && isNotFound && (
          <div className="w-full max-w-2xl mx-auto bg-white/90 rounded-xl shadow-lg p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Sorry, No User Found</h2>
            <p className="text-gray-700 mb-6 text-lg">
              To start playing Kahaani Game, please download it on your mobile below:
            </p>
            <a 
              href="https://play.google.com/store/apps/details?id=com.kahaanientertainment.kahaani" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img 
                src="/google-play-badge.png" 
                alt="Get it on Google Play" 
                className="h-16 mx-auto hover:scale-105 transition-transform"
              />
            </a>
            <div className="mt-6">
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2 bg-[#7a4c15] text-white rounded-lg hover:bg-[#a86c2c] transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}

        {!isLoading && isLoggedIn && (
          <>
            {progressLoading ? (
              <div className="text-center py-8">
                <p className="text-[#7a4c15] text-lg">Loading your progress...</p>
              </div>
            ) : (
              <UserAccountSection 
                usage={usage} 
                level={level} 
                onLogout={handleLogout}
              />
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
} 