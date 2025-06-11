export default function ScreenshotsSection() {
  return (
    <section className="w-full max-w-3xl mx-auto mb-12">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#7a4c15]">Screenshots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(n => (
          <img
            key={n}
            src={`/Kahaani0${n}.png`}
            alt={`Kahaanigame App Screenshot ${n}`}
            className="rounded-lg shadow-lg object-contain w-full h-72 bg-white"
          />
        ))}
      </div>
    </section>
  );
} 