export default function AboutSection() {
  return (
    <section className="w-full max-w-4xl mx-auto mb-16 px-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-[#7a4c15]">Our Story</h2>
      <p className="text-center text-lg text-gray-700 mb-8">
        Kahaani Game is crafted to bring families and friends together through interactive stories, fun challenges, and a safe, inclusive environment. Join millions of players who have made Kahaani their go-to destination for story-driven gaming!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white/80 rounded-xl shadow p-6">
          <div className="text-3xl font-bold text-[#a86c2c] mb-2">1M+</div>
          <div className="text-gray-700">Players Worldwide</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-6">
          <div className="text-3xl font-bold text-[#a86c2c] mb-2">Award</div>
          <div className="text-gray-700">Best Family Game 2024</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-6">
          <div className="text-3xl font-bold text-[#a86c2c] mb-2">Safe</div>
          <div className="text-gray-700">Child & Family Friendly</div>
        </div>
      </div>
    </section>
  );
} 