import { useState } from "react";

const screenshots = [1, 2, 3, 4].map(n => `/K0${n}.png`);

const customTexts = [
  "Build Pooja's life story by unlocking seasons and episodes",
  "Improve your English skills by helping Pooja and her family translate their dialogues",
  "Score points for every episode and share with your friends!",
  "46 seasons of entertaining stories!"
];

interface ScreenshotsSectionProps {
  signInPage?: boolean;
  handleGoogleSignIn?: () => void;
}

export default function ScreenshotsSection({ signInPage = false, handleGoogleSignIn }: ScreenshotsSectionProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));

  return (
    <section className={`w-full max-w-5xl mx-auto overflow-hidden pb-8 md:pb-24 ${signInPage ? 'h-[calc(100vh-112px)] flex items-center' : ''}`}>
      <div className={`grid grid-cols-1 md:[grid-template-columns:10%_40%_40%_10%] items-center justify-center gap-6 md:gap-0 w-full`}>
        {/* Left blank column */}
        <div className="hidden md:block" />
        {/* Content column (now first) */}
        <div className={`w-full md:col-span-1 flex items-center justify-center`}>
          {signInPage ? (
            <button onClick={handleGoogleSignIn} className="focus:outline-none">
              <img src="/btn_google_signin_dark_normal_web.png" alt="Sign in with Google" className="h-10" />
            </button>
          ) : (
            <div className="grid w-full py-6 md:py-8 gap-4">
              <div className="flex items-center justify-center">
                <span className="text-2xl md:text-4xl font-bold text-[#7a4c15] text-center">Kahaani Game</span>
              </div>
              <div className="flex items-center justify-center px-4">
                <span className="text-base md:text-lg text-center text-gray-700 leading-relaxed">{customTexts[current]}</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex justify-center items-center">
                  <a href="https://play.google.com/store/apps/details?id=com.kahaanientertainment.kahaani" target="_blank" rel="noopener noreferrer">
                    <img src="/google-play-badge.png" alt="Get it on Google Play" className="h-12 md:h-16" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Carousel column (now second) */}
        <div className="flex flex-col items-center justify-center w-full md:col-span-1">
          <div className="flex flex-row items-center justify-center w-full px-2 gap-2">
            <button
              onClick={prev}
              className="px-2 py-2 md:px-3 bg-[#7a4c15] text-white rounded-full font-bold hover:bg-[#a86c2c] transition-colors z-10 flex-shrink-0"
              aria-label="Previous screenshot"
            >
              &#8592;
            </button>
            <div className="flex items-center justify-center">
              <img
                src={screenshots[current]}
                alt={`Kahaanigame App Screenshot ${current + 1}`}
                className="object-contain rounded-xl shadow-2xl border-4 border-black max-w-[200px] md:max-w-[300px] h-auto max-h-[50vh] md:max-h-[60vh]"
              />
            </div>
            <button
              onClick={next}
              className="px-2 py-2 md:px-3 bg-[#7a4c15] text-white rounded-full font-bold hover:bg-[#a86c2c] transition-colors z-10 flex-shrink-0"
              aria-label="Next screenshot"
            >
              &#8594;
            </button>
          </div>
          <div className="flex justify-center mt-3 gap-2">
            {screenshots.map((_, idx) => (
              <span
                key={idx}
                className={`inline-block w-2 h-2 rounded-full ${idx === current ? 'bg-[#7a4c15]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
        {/* Right blank column */}
        <div className="hidden md:block" />
      </div>
    </section>
  );
} 