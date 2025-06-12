import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full text-center py-2 text-gray-500 bg-white border-t fixed bottom-0 left-0">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
        <span>© 2025 Kahaani Entertainment LLC. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:text-[#a86c2c] transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-[#a86c2c] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
} 