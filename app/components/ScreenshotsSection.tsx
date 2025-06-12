import { useState } from "react";

const screenshots = [1, 2, 3, 4].map(n => `/Kahaani0${n}.png`);

export default function ScreenshotsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));

  return (
    <section className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
        <div className="relative flex flex-col items-center">
          <div className="flex flex-row items-center justify-center w-full">
            <button
              onClick={prev}
              className="px-3 py-2 bg-[#7a4c15] text-white rounded-full font-bold hover:bg-[#a86c2c] transition-colors z-10 mr-2"
              aria-label="Previous screenshot"
            >
              &#8592;
            </button>
            <div className="bg-black rounded-xl shadow-2xl border-4 border-black overflow-hidden mx-auto" style={{ maxHeight: '70vh', maxWidth: 320 }}>
              <img
                src={screenshots[current]}
                alt={`Kahaanigame App Screenshot ${current + 1}`}
                className="object-contain w-full h-auto"
                style={{ maxHeight: '70vh', maxWidth: 320 }}
              />
            </div>
            <button
              onClick={next}
              className="px-3 py-2 bg-[#7a4c15] text-white rounded-full font-bold hover:bg-[#a86c2c] transition-colors z-10 ml-2"
              aria-label="Next screenshot"
            >
              &#8594;
            </button>
          </div>
          <div className="flex justify-center mt-4 gap-2">
            {screenshots.map((_, idx) => (
              <span
                key={idx}
                className={`inline-block w-2 h-2 rounded-full ${idx === current ? 'bg-[#7a4c15]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
        <a href="https://play.google.com/store/apps/details?id=com.kahaanigame.app" target="_blank" rel="noopener noreferrer" className="hidden sm:block">
          <img src="/google-play-badge.png" alt="Get it on Google Play" className="h-20 sm:h-24" />
        </a>
      </div>
    </section>
  );
} 