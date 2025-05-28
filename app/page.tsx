"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, deleteUser, reauthenticateWithPopup } from "firebase/auth";
import { doc, getDoc, deleteDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Home() {
  const [status, setStatus] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState<any>(null);
  const [level, setLevel] = useState<any>(null);
  const [progressLoading, setProgressLoading] = useState(false);
  const [progressError, setProgressError] = useState("");

  useEffect(() => {
    if (status === "success" && auth.currentUser) {
      setProgressLoading(true);
      setProgressError("");
      getDoc(doc(db, "users", auth.currentUser.uid))
        .then(userDoc => {
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUsage(data.usage || {});
            setLevel(data.level || {});
          } else {
            setProgressError("User data not found.");
          }
        })
        .catch(() => setProgressError("Failed to fetch user data."))
        .finally(() => setProgressLoading(false));
    }
  }, [status]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setStatus(null);
    setUserEmail(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUserEmail(user.email || null);
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setStatus("success");
      } else {
        setStatus("notfound");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setStatus(null);
      setUserEmail(null);
      setUsage(null);
      setLevel(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteData = async () => {
    if (!auth.currentUser) return;
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    setLoading(true);
    try {
      // 0. Store deleted user info
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "deletedUsers"), {
          email: user.email,
          uid: user.uid,
          deletedAt: serverTimestamp(),
        });
      }
      // 1. Delete user data from Firestore
      await deleteDoc(doc(db, "users", auth.currentUser.uid));
      // (Add more deletes here if you have other user data elsewhere)

      // 2. Try to delete the Firebase Auth account
      try {
        await deleteUser(auth.currentUser);
      } catch (error: any) {
        if (error.code === "auth/requires-recent-login") {
          // Re-authenticate and try again
          const provider = new GoogleAuthProvider();
          await reauthenticateWithPopup(auth.currentUser, provider);
          await deleteUser(auth.currentUser);
        } else {
          throw error;
        }
      }

      // 3. Sign out and reload/redirect
      await signOut(auth);
      setStatus(null);
      setUserEmail(null);
      setUsage(null);
      setLevel(null);
      alert("Your account and data have been deleted.");
      window.location.reload();
    } catch (err: any) {
      alert("Failed to delete account: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  const isLoggedIn = status === "success";

  return (
    <div className="modern-bg">
      <h1 className="main-heading">Welcome to Kahaani Game</h1>
      <div className="main-content">
        {!isLoggedIn && (
          <div className="login-block">
            <a href="https://play.google.com/store/apps/details?id=com.kahaani.app" target="_blank" rel="noopener noreferrer" className="play-badge-link">
              <img
                src="/google-play-badge.png"
                alt="Get it on Google Play"
                className="play-badge"
              />
            </a>
            <button
              className="google-login-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", marginTop: "2.5rem" }}
            >
              <img
                src="/btn_google_signin_dark_normal_web.png"
                alt="Sign in with Google"
                style={{ height: 48 }}
              />
            </button>
          </div>
        )}
        {status === "success" && (
          <>
            <p className="login-success">Welcome{userEmail ? `, ${userEmail}` : ""}!</p>
            {progressLoading ? (
              <div style={{ padding: 32 }}>Loading progress...</div>
            ) : progressError ? (
              <div style={{ padding: 32, color: '#b71c1c' }}>{progressError}</div>
            ) : (
              <div style={{ maxWidth: 480, margin: "40px auto", background: "#fffbe9", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: 32 }}>
                <h2 style={{ color: "#7a4c15", marginBottom: 24 }}>Today's Progress</h2>
                <div style={{ marginBottom: 32 }}>
                  <div>Episodes Completed: <b>{usage?.unitsCompletedToday ?? 0}</b></div>
                  <div>New Episodes Completed: <b>{usage?.newLevelsCompletedToday ?? 0}</b></div>
                </div>
                <h2 style={{ color: "#7a4c15", marginBottom: 24 }}>Overall Progress</h2>
                <div>
                  <div>Current Season: <b>{level?.season ?? "-"}</b></div>
                  <div>Current Episode: <b>{level?.episode ?? "-"}</b></div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: 24 }}>
              <button className="logout-btn" onClick={handleLogout} disabled={loading}>
                Logout
              </button>
              <button className="logout-btn" onClick={handleDeleteData} disabled={loading}>
                Delete My Data
              </button>
            </div>
          </>
        )}
        {status === "notfound" && (
          <p className="login-error">
            Sorry, no user found – Download the Kahaani game here: <a href="https://play.google.com/store/apps/details?id=com.kahaani.app" target="_blank" rel="noopener noreferrer">Android Download</a>
          </p>
        )}
        {status === "error" && (
          <p className="login-error">Login failed. Please try again.</p>
        )}
      </div>
      <div className="footer-links">
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        |
        <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
      </div>
      <style jsx>{`
        .modern-bg {
          min-height: 100vh;
          background:
            linear-gradient(135deg, rgba(247,236,215,0.92) 0%, rgba(243,246,251,0.92) 100%),
            url('/family-illustration.png') center center / cover no-repeat;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 32px 8px 0 8px;
        }
        .main-heading {
          font-size: 3rem;
          color: #7a4c15;
          font-weight: 800;
          margin-bottom: 3.5rem;
          text-align: center;
          letter-spacing: 1px;
          margin-top: 64px;
        }
        .main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 700px;
        }
        .login-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          background: rgba(255,255,255,0.4);
          border-radius: 18px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          padding: 32px 24px 24px 24px;
        }
        .play-badge-link {
          margin: 2.5rem 0 2.5rem 0;
          display: block;
        }
        .play-badge {
          height: 80px;
          width: auto;
          display: block;
        }
        .footer-links {
          margin-top: 48px;
          text-align: center;
          color: #7a4c15;
          font-size: 1rem;
        }
        .footer-links a {
          color: #7a4c15;
          text-decoration: underline;
          margin: 0 12px;
        }
        .footer-links a:hover {
          text-decoration: underline wavy;
        }
        .google-login-btn[disabled], .logout-btn[disabled] {
          opacity: 0.6;
          pointer-events: none;
        }
        .login-success {
          margin-top: 1.5rem;
          color: #2e7d32;
          font-size: 1.2rem;
          font-weight: 600;
        }
        .login-error {
          margin-top: 1.5rem;
          color: #b71c1c;
          font-size: 1.1rem;
          font-weight: 500;
        }
        .login-error a {
          color: #7a4c15;
          text-decoration: underline;
        }
        .logout-btn {
          margin-top: 1.5rem;
          padding: 0.5rem 1.5rem;
          font-size: 1rem;
          background: #7a4c15;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: background 0.2s;
        }
        .logout-btn:hover {
          background: #a86c2c;
        }
        @media (max-width: 900px) {
          .main-heading {
            font-size: 2.1rem;
            margin-top: 32px;
            margin-bottom: 2rem;
          }
          .main-content {
            max-width: 95vw;
          }
          .login-block {
            max-width: 95vw;
            padding: 24px 8px 16px 8px;
          }
          .play-badge {
            height: 56px;
          }
        }
        @media (max-width: 600px) {
          .main-heading {
            font-size: 1.4rem;
            margin-bottom: 1.2rem;
            margin-top: 24px;
          }
          .main-content {
            max-width: 100vw;
          }
          .login-block {
            max-width: 100vw;
            padding: 16px 4px 8px 4px;
          }
          .play-badge {
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
} 