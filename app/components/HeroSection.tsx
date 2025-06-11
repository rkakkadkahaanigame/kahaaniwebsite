export default function HeroSection({ onGoogleSignIn, status }: { onGoogleSignIn: () => void, status: string }) {
  return (
    <section className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-[#7a4c15] mb-4">Welcome to Kahaani Game</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
        Experience immersive stories, fun challenges, and connect with friends. Download now or manage your account below.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
        <a href="https://play.google.com/store/apps/details?id=com.kahaanigame.app" target="_blank" rel="noopener noreferrer">
          <img src="/google-play-badge.png" alt="Get it on Google Play" className="h-14" />
        </a>
        <button
          onClick={onGoogleSignIn}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          className="mt-2 sm:mt-0"
        >
          <img
            src="/btn_google_signin_dark_normal_web.png"
            alt="Sign in with Google"
            style={{ height: 48 }}
          />
        </button>
      </div>
      {status === "success" && <p className="text-green-600 mt-2">Account action successful!</p>}
      {status === "error" && <p className="text-red-600 mt-2">There was an error. Please try again.</p>}
    </section>
  );
} 