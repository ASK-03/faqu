import Navigation from "@/components/navigation";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Navigation isHero />
      <div className="min-h-screen flex flex-col justify-center items-center bg-black relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
        <div className="absolute -top-16 -left-16 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-lime-500 rounded-full blur-3xl opacity-30"></div>

        {/* Content */}
        <header className="relative z-10 text-center mb-8">
          <h1 className="text-white text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Welcome to <span className="text-orange-500">FAQ-U</span>
          </h1>
          <p className="text-gray-200 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
          A smart FAQ module for SarasAI that intelligently returns relevant FAQ entries based on user queries.
          </p>
        </header>

        <div className="relative z-10 px-8 py-4 bg-[#D2FF72] text-black font-semibold text-lg rounded-full shadow-lg hover:bg-[#ffd0d0] transform hover:scale-105 transition-all duration-30 ease-in-out">
          <Link href="/verify-user">Start Chatting</Link>
        </div>
      </div>
    </main>
  );
}
