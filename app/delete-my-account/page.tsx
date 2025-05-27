'use client';

import { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, deleteUser } from 'firebase/auth';

export default function DeleteMyAccount() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError('Failed to login with Google.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError('');
    try {
      await signOut(auth);
    } catch (err) {
      setError('Failed to logout.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      await deleteUser(user);
      setUser(null);
    } catch (err) {
      setError('Failed to delete account.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Delete My Account</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!user ? (
        <button onClick={handleGoogleLogin} disabled={loading}>
          {loading ? 'Loading...' : 'Login with Google'}
        </button>
      ) : (
        <div>
          <p>Logged in as: {user.email}</p>
          <button onClick={handleDeleteAccount} disabled={loading}>
            {loading ? 'Loading...' : 'Delete My Account'}
          </button>
          <button onClick={handleLogout} disabled={loading}>
            {loading ? 'Loading...' : 'Logout'}
          </button>
        </div>
      )}
    </div>
  );
} 