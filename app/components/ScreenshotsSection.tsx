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
    <section className={`w-full max-w-5xl mx-auto overflow-hidden pb-24 ${signInPage ? 'h-[calc(100vh-112px)] flex items-center' : ''}`}>
      <div className={`grid grid-cols-1 md:[grid-template-columns:10%_40%_40%_10%] items-center justify-center gap-2 md:gap-0 w-full h-[60vh] md:h-[70vh] min-h-[320px]`}>
        {/* Left blank column */}
        <div className="hidden md:block" />
        {/* Carousel column */}
        <div className="flex flex-col items-center justify-center w-full md:col-span-1 h-full">
          <div className="flex flex-row items-center justify-center w-full">
            <button
              onClick={prev}
              className="px-3 py-2 bg-[#7a4c15] text-white rounded-full font-bold hover:bg-[#a86c2c] transition-colors z-10 mr-1 sm:mr-4"
              aria-label="Previous screenshot"
            >
              &#8592;
            </button>
            <div className="flex items-center justify-center overflow-hidden">
              <img
                src={screenshots[current]}
                alt={`Kahaanigame App Screenshot ${current + 1}`}
                className="object-contain rounded-xl shadow-2xl border-4 border-black mx-auto"
                style={{ maxHeight: '60vh' }}
              />
            </div>
            <button
              onClick={next}
              className="px-3 py-2 bg-[#7a4c15] text-white rounded-full font-bold hover:bg-[#a86c2c] transition-colors z-10 ml-1 sm:ml-4"
              aria-label="Next screenshot"
            >
              &#8594;
            </button>
          </div>
          <div className="flex justify-center mt-1 sm:mt-2 gap-2">
            {screenshots.map((_, idx) => (
              <span
                key={idx}
                className={`inline-block w-2 h-2 rounded-full ${idx === current ? 'bg-[#7a4c15]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
        {/* Right column: 3 rows or sign-in */}
        <div className={`w-full md:col-span-1 h-full min-h-[320px] flex items-center justify-center`}>
          {signInPage ? (
            <button onClick={handleGoogleSignIn} className="focus:outline-none">
              <img src="/btn_google_signin_dark_normal_web.png" alt="Sign in with Google" className="h-10" />
            </button>
          ) : (
            <div className="grid w-full h-full" style={{ gridTemplateRows: '20% 60% 20%' }}>
              <div className="flex items-end justify-center">
                <span className="text-2xl md:text-4xl font-bold text-[#7a4c15] text-center">Kahaani Game</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-lg text-center text-gray-700 mb-4 md:mb-8 min-h-[48px] flex items-center justify-center">{customTexts[current]}</span>
              </div>
              <div className="flex flex-col items-center justify-start min-h-[64px]">
                <div className="flex justify-center items-end">
                  <a href="https://play.google.com/store/apps/details?id=com.kahaanientertainment.kahaani" target="_blank" rel="noopener noreferrer">
                    <img src="/google-play-badge.png" alt="Get it on Google Play" className="h-12 md:h-16" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Right blank column */}
        <div className="hidden md:block" />
      </div>
    </section>
  );
} 