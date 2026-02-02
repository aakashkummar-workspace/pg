import React from 'react';

const BentoCard = ({ emoji, title, description, className, colorClass }) => (
    <div className={`bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 shadow-sm relative overflow-hidden transition-all duration-300 group ${className}`}>
        <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 -mr-16 -mt-16 transition-opacity group-hover:opacity-40 ${colorClass}`} />

        <div className="relative z-10 text-left">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-sm ${colorClass.replace('bg-', 'bg-opacity-10')}`}>
                {emoji}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 tracking-tight">{title}</h3>
            <p className="text-gray-500 leading-relaxed font-medium">{description}</p>
        </div>

        <div className="mt-8 flex items-center text-sm font-bold text-gray-600 group-hover:translate-x-1 transition-transform cursor-pointer">
            Learn More →
        </div>
    </div>
);

export default function LandingPage({ onGetStarted, onSignUp, onLogin }) {
    return (
        <div className="min-h-screen selection:bg-indigo-100 flex flex-col items-center w-full bg-[#F7F9FC]">
            {/* Fallback for the vibe-gradient since Tailwind JIT might not pick it up from index.css immediately */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#EEF2FF] via-[#FDF2F8] to-[#EBFAFA] animate-pulse opacity-50" />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 border-b border-white/20 bg-white/70 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-2xl font-black bg-gradient-to-r from-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent">ROOMSYNC</div>
                    <div className="hidden md:flex gap-8 font-bold text-gray-600 text-sm">
                        <span className="cursor-pointer hover:text-[#6C63FF] transition-colors">Features</span>
                        <span className="cursor-pointer hover:text-[#6C63FF] transition-colors">Pricing</span>
                        <span className="cursor-pointer hover:text-[#6C63FF] transition-colors">Community</span>
                    </div>
                    <button
                        onClick={onLogin}
                        className="bg-[#6C63FF] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-indigo-100 hover:scale-105 transition-transform"
                    >
                        Login
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-48 pb-20 px-6 max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-white text-xs font-bold uppercase tracking-widest text-[#6C63FF] mb-8 shadow-sm">
                    ✨ New way to sync your living
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter text-gray-900 leading-[1.1]">
                    Life is better <br /> in <span className="bg-gradient-to-r from-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent underline decoration-pink-200">Harmony</span>.
                </h1>

                <p className="text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
                    RoomSync is the companion app that automates chores and splits bills so you can focus on the fun stuff.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={onGetStarted}
                        className="px-10 py-5 bg-[#6C63FF] text-white rounded-full font-bold text-lg shadow-xl shadow-indigo-100 hover:scale-105 transition-all"
                    >
                        Get Started
                    </button>
                    <button
                        onClick={onSignUp}
                        className="px-10 py-5 bg-white/70 backdrop-blur-xl text-gray-700 rounded-full font-bold text-lg border border-white/60 hover:bg-white transition-all shadow-sm"
                    >
                        Sign Up
                    </button>
                </div>
            </section>

            {/* Feature Bento */}
            <section className="px-6 pb-40 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 w-full">
                <BentoCard
                    className="md:col-span-4"
                    colorClass="bg-indigo-400"
                    emoji="💳"
                    title="Gentle Bill Splitting"
                    description="A stress-free way to manage group finances. From rent to coffee runs, we handle the math so you don't have to."
                />
                <BentoCard
                    className="md:col-span-2"
                    colorClass="bg-pink-400"
                    emoji="😊"
                    title="Fair Play"
                    description="Chore rotations that actually work and keep everyone happy."
                />
                <BentoCard
                    className="md:col-span-3"
                    colorClass="bg-emerald-400"
                    emoji="📦"
                    title="Stock Alerts"
                    description="Never run out of milk or detergent again with predictive stock tracking."
                />
                <BentoCard
                    className="md:col-span-3"
                    colorClass="bg-orange-400"
                    emoji="❤️"
                    title="Shared Love"
                    description="A private space for your roommate community to thrive and support each other."
                />
            </section>

            <footer className="w-full py-20 px-6 text-center border-t border-white shadow-sm bg-white/30 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
                    <div className="text-3xl font-black bg-gradient-to-r from-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent">ROOMSYNC</div>
                    <p className="text-gray-500 font-medium text-center">Making shared living delightful, one room at a time.</p>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-8">© 2026 RoomSync Lab</div>
                </div>
            </footer>
        </div>
    );
}
