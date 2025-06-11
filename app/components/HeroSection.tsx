export default function HeroSection({ onGoogleSignIn, status }: { onGoogleSignIn: () => void, status: string }) {
  return (
    <section className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-[#7a4c15] mb-4">Welcome to Kahaani Game</h1>
      {status === "success" && <p className="text-green-600 mt-2">Account action successful!</p>}
      {status === "error" && <p className="text-red-600 mt-2">There was an error. Please try again.</p>}
    </section>
  );
} 