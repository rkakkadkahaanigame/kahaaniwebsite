import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full text-center py-2 text-xs sm:text-sm text-gray-500 border-t fixed bottom-0 left-0" style={{ backgroundColor: '#FEEDD2' }}>
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex flex-row gap-4">
          <Link href="/privacy-policy" className="hover:text-[#a86c2c] transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-[#a86c2c] transition-colors">Terms of Service</Link>
        </div>
        <span>© 2025 Kahaani Entertainment LLC. All rights reserved.</span>
      </div>
    </footer>
  );
} 