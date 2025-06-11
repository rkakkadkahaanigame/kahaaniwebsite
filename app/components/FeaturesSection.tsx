export default function FeaturesSection() {
  const features = [
    {
      icon: "/feature1.png", // replace with your actual image
      title: "Immersive Stories",
      desc: "Engage in interactive, story-driven gameplay with unique characters and choices.",
    },
    {
      icon: "/feature2.png",
      title: "Multiplayer Fun",
      desc: "Play with friends and family, compete on leaderboards, and unlock achievements.",
    },
    {
      icon: "/feature3.png",
      title: "Daily Challenges",
      desc: "New episodes and challenges every day to keep you coming back.",
    },
    {
      icon: "/feature4.png",
      title: "Safe & Secure",
      desc: "Your data and progress are protected with industry-standard security.",
    },
  ];
  return (
    <section className="w-full max-w-5xl mx-auto mb-16 px-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-[#7a4c15]">Game Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center bg-white/80 rounded-xl shadow p-6">
            <img src={f.icon} alt={f.title} className="h-16 mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-[#a86c2c]">{f.title}</h3>
            <p className="text-gray-700 text-base">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 