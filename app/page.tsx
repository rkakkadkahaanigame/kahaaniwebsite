"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
    setLoading(true);
    try {
      // Placeholder: implement actual data deletion logic here
      alert("Your data would be deleted (functionality to be implemented).");
    } finally {
      setLoading(false);
    }
  };

  const isLoggedIn = status === "success";

  return (
    <div className="landing-container">
      {!isLoggedIn && (
        <>
          <img
            src="/family-illustration.png"
            alt="Family Illustration"
            width={800}
            height={534}
            className="landing-image"
            style={{
              maxWidth: "90vw",
              height: "auto",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
            }}
          />
          <button
            className="google-login-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", marginTop: "2rem" }}
          >
            <img
              src="/btn_google_signin_dark_normal_web.png"
              alt="Sign in with Google"
              style={{ height: 48 }}
            />
          </button>
        </>
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
      <style jsx>{`
        .landing-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f7ecd7;
          padding: 32px 16px;
        }
        .landing-image {
          max-width: 90vw;
          height: auto;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
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
        @media (max-width: 600px) {
          .landing-container {
            padding: 16px 4px;
          }
          .landing-image {
            max-width: 100vw;
          }
        }
      `}</style>
    </div>
  );
} 