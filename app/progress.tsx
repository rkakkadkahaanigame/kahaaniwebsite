"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProgressPage() {
  const [usage, setUsage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsage = async () => {
      if (!auth.currentUser) {
        router.replace("/");
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUsage(userDoc.data().usage || {});
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsage();
  }, [router]);

  if (loading) return <div style={{ padding: 32 }}>Loading...</div>;
  if (error) return <div style={{ padding: 32, color: '#b71c1c' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", background: "#fffbe9", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: 32 }}>
      <h2 style={{ color: "#7a4c15", marginBottom: 24 }}>Today's Progress</h2>
      <div style={{ marginBottom: 32 }}>
        <div>Episodes Completed: <b>{usage?.unitsCompletedToday ?? 0}</b></div>
        <div>New Episodes Completed: <b>{usage?.newLevelsCompletedToday ?? 0}</b></div>
      </div>
      <h2 style={{ color: "#7a4c15", marginBottom: 24 }}>Overall Progress</h2>
      <div>
        <div>Current Season: <b>{usage?.season ?? "-"}</b></div>
        <div>Current Episode: <b>{usage?.episode ?? "-"}</b></div>
      </div>
    </div>
  );
} 