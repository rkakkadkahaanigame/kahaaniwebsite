export default function HeroSection({ onGoogleSignIn, status }: { onGoogleSignIn: () => void, status: string }) {
  if (status === "success") {
    return <p className="text-green-600 mt-2 text-center mb-12">Account action successful!</p>;
  }
  if (status === "error") {
    return <p className="text-red-600 mt-2 text-center mb-12">There was an error. Please try again.</p>;
  }
  return null;
} 