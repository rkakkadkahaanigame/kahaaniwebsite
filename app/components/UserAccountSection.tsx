import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { signOut, deleteUser, reauthenticateWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, deleteDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface UserAccountSectionProps {
  usage: any;
  level: any;
  onLogout: () => void;
}

export default function UserAccountSection({ usage, level, onLogout }: UserAccountSectionProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      alert('Please type DELETE in caps to confirm account deletion.');
      return;
    }

    if (!auth.currentUser) return;
    
    setIsDeleting(true);
    try {
      // Store deleted user info
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "deletedUsers"), {
          email: user.email,
          uid: user.uid,
          deletedAt: serverTimestamp(),
        });
      }

      // Delete user data from Firestore
      await deleteDoc(doc(db, "users", auth.currentUser.uid));

      // Try to delete the Firebase Auth account
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

      // Sign out and reload
      await signOut(auth);
      alert("Your account and data have been deleted.");
      window.location.reload();
    } catch (err: any) {
      alert("Failed to delete account: " + (err?.message || err));
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
      setDeleteConfirmText('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 rounded-xl shadow-lg p-6 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#7a4c15] mb-2">Welcome {auth.currentUser?.email}</h2>
        <p className="text-gray-600">Here's your progress:</p>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#f7ecd7] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[#7a4c15] mb-3">Today's Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Episodes Completed:</span>
              <span className="font-bold text-[#a86c2c]">{usage?.unitsCompletedToday ?? 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">New Episodes:</span>
              <span className="font-bold text-[#a86c2c]">{usage?.newLevelsCompletedToday ?? 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f7ecd7] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[#7a4c15] mb-3">Overall Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Current Season:</span>
              <span className="font-bold text-[#a86c2c]">{level?.season ?? "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Current Episode:</span>
              <span className="font-bold text-[#a86c2c]">{level?.episode ?? "-"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="px-6 py-3 bg-[#7a4c15] text-white rounded-lg font-semibold hover:bg-[#a86c2c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
        
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Delete Account
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-red-600 mb-4">Delete Account</h3>
            <p className="text-gray-700 mb-4">
              This action cannot be undone. All your progress and data will be permanently deleted.
            </p>
            <p className="text-gray-700 mb-4">
              Type <strong>DELETE</strong> in caps to confirm:
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-center font-mono"
              placeholder="Type DELETE here"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteDialog(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting || deleteConfirmText !== 'DELETE'}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 