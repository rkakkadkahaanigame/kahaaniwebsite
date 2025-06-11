import Link from "next/link";

export default function Header() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white/80 shadow-md fixed top-0 left-0 z-40 backdrop-blur">
      <div className="text-2xl font-bold text-[#7a4c15] tracking-wide">Kahaanigame</div>
      <div className="flex gap-2 text-lg font-medium">
        <Link href="/" className="px-4 py-2 rounded-full transition-all hover:bg-[#f7ecd7] hover:text-[#a86c2c]">Home</Link>
        <Link href="/privacy-policy" className="px-4 py-2 rounded-full transition-all hover:bg-[#f7ecd7] hover:text-[#a86c2c]">Privacy Policy</Link>
        <Link href="/terms-of-service" className="px-4 py-2 rounded-full transition-all hover:bg-[#f7ecd7] hover:text-[#a86c2c]">Terms of Service</Link>
      </div>
    </nav>
  );
} 