import React from 'react';
import RoomSetup from '../components/RoomSetup';
import {
    RecurringBillsWidget, SplitUpWidget,
    SwapMarketWidget,
    StatusToggleWidget, ShowerScheduleWidget,
    DigitalWhiteboardWidget, PollsWidget,
    ContactWidget, RoommatesListWidget
} from '../components/DashboardWidgets';
import MessagingCorner from '../components/MessagingCorner';

const FeatureSection = ({ title, children, delay = "" }) => (
    <div className={`mb-12 animate-up ${delay} will-change-transform`}>
        <h2 className="text-xl font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">
            {children}
        </div>
    </div>
);

export default function DashboardPage({ user, room, onLogout, onJoinRoom }) {
    return (
        <div className="min-h-screen bg-[#F7F9FC] relative overflow-hidden">
            {/* Background Gradient */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#EEF2FF] via-[#FDF2F8] to-[#EBFAFA] opacity-50" />

            {/* Navbar */}
            <nav className="px-6 py-6 flex justify-between items-center max-w-7xl mx-auto z-50 relative">
                <div className="flex items-center gap-2">
                    <div className="text-2xl font-black bg-gradient-to-r from-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent">ROOMSYNC</div>
                    {room && (
                        <span className="hidden md:inline-block px-3 py-1 bg-white/60 border border-white/40 rounded-full text-xs font-bold text-gray-500">
                            {room.name} • {room.code}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-800">{user?.name || 'User'}</p>
                        <p className="text-xs font-medium text-gray-500">{user?.email}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#FF6584] flex items-center justify-center text-white font-bold shadow-lg">
                        {user?.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <button onClick={onLogout} className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors ml-2">
                        Logout
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 pt-10 pb-40">
                <header className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6 w-full">
                    <div className="w-full">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            Welcome back, <br />
                            <span className="bg-gradient-to-r from-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent underline decoration-pink-200">
                                {user?.name?.split(' ')[0] || 'Roomie'}
                            </span>! 👋
                        </h1>
                        {room ? (
                            <p className="text-gray-500 text-lg font-medium max-w-xl">
                                Here's your command center for <strong>{room.name}</strong>.
                            </p>
                        ) : (
                            <p className="text-gray-500 text-lg font-medium max-w-xl">
                                You're almost there! Join a room to start syncing.
                            </p>
                        )}
                    </div>
                </header>

                {!room ? (
                    <div className="flex justify-center items-center py-10 w-full animate-up">
                        <RoomSetup onComplete={onJoinRoom} />
                    </div>
                ) : (
                    <div className="space-y-2">

                        {/* 1. Coordination & Communication (Top Priority) */}
                        <FeatureSection title="📢 Daily Sync" delay="delay-75">
                            <StatusToggleWidget />
                            <DigitalWhiteboardWidget />
                            <PollsWidget roomId={room?.code} />
                        </FeatureSection>

                        {/* 2. Operations (Money & Chores) */}
                        <FeatureSection title="💰 & 🧹 Operations" delay="delay-150">
                            <RecurringBillsWidget />
                            <SwapMarketWidget />
                            <SplitUpWidget />
                        </FeatureSection>

                        {/* 2.5 Message Corner */}
                        <FeatureSection title="💬 Roommate Chat" delay="delay-200">
                            <MessagingCorner user={user} className="md:col-span-2 lg:col-span-2" />
                        </FeatureSection>

                        {/* 3. Logistics (Info) */}
                        <FeatureSection title="🏠 House Info" delay="delay-300">
                            <RoommatesListWidget members={room?.members} />
                            <ContactWidget />
                            <ShowerScheduleWidget />
                        </FeatureSection>

                    </div>
                )}

                <div className="text-center text-gray-400 text-sm font-medium mt-20">
                    © 2026 RoomSync. All rights reserved. • Built for harmony.
                </div>

                <style>{`
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-up { animation: fadeUp 0.6s ease-out forwards; }
        .font-hand { font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif; } 
        /* Using system fonts similar to handwriting for the whiteboard */
      `}</style>
            </main>
        </div>
    );
}
