import React, { useState } from 'react';

const InputField = ({ label, placeholder, value, onChange }) => (
    <div className="w-full mb-4 text-left">
        <label className="block text-sm font-bold text-gray-600 mb-2 ml-1">{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full px-6 py-4 rounded-xl bg-white/50 border border-white/40 focus:border-[#6C63FF]/50 focus:ring-0 transition-all outline-none text-gray-700 font-medium placeholder:text-gray-400"
        />
    </div>
);

export default function RoomSetup({ onComplete }) {
    const [activeTab, setActiveTab] = useState('create'); // 'create' or 'join'
    const [formData, setFormData] = useState({ roomName: '', roomCode: '' });

    const handleCreate = (e) => {
        e.preventDefault();
        // Mock generation of room code
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        onComplete({
            type: 'create',
            name: formData.roomName || 'My Room',
            code: code,
            role: 'Admin'
        });
    };

    const handleJoin = (e) => {
        e.preventDefault();
        onComplete({
            type: 'join',
            name: 'Existing Room', // In real app, fetch from code
            code: formData.roomCode,
            role: 'Member'
        });
    };

    return (
        <div className="bg-white/60 backdrop-blur-2xl p-10 rounded-[2.5rem] max-w-md w-full text-center relative shadow-xl border border-white/50 mx-auto">
            <h2 className="text-3xl font-black mb-2 text-gray-900">Setup Your Space</h2>
            <p className="text-gray-500 font-medium mb-8">Create a new household or join an existing one.</p>

            {/* Tabs */}
            <div className="flex bg-gray-100/50 p-1 rounded-2xl mb-8 relative">
                <button
                    onClick={() => setActiveTab('create')}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'create' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Create Room
                </button>
                <button
                    onClick={() => setActiveTab('join')}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'join' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Join Room
                </button>
            </div>

            {activeTab === 'create' ? (
                <form onSubmit={handleCreate} className="space-y-4">
                    <InputField
                        label="Room Name"
                        placeholder="e.g. Sky Castle 🏰"
                        value={formData.roomName}
                        onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                    />
                    <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#6C63FF] to-[#FF6584] text-white rounded-xl font-bold text-lg shadow-lg hover:translate-y-[-2px] transition-all">
                        Create Room
                    </button>

                    {/* Mock Previous Rooms List for quick testing/access */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Previously Created Rooms</p>
                        <div className="space-y-3">
                            {[
                                { name: 'Sky Castle 🏰', code: 'SKY123' },
                                { name: 'Chill Zone 🧊', code: 'CHILL9' }
                            ].map((room) => (
                                <button
                                    key={room.code}
                                    type="button"
                                    onClick={() => {
                                        setActiveTab('join');
                                        setFormData({ ...formData, roomCode: room.code });
                                    }}
                                    className="w-full flex items-center justify-between p-4 rounded-xl bg-white/40 border border-white/60 hover:bg-white/80 transition-all group"
                                >
                                    <span className="font-bold text-gray-700">{room.name}</span>
                                    <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                        {room.code}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleJoin} className="space-y-4">
                    <InputField
                        label="Room Code"
                        placeholder="e.g. X7Z9A2"
                        value={formData.roomCode}
                        onChange={(e) => setFormData({ ...formData, roomCode: e.target.value })}
                    />
                    <div className="text-left">
                        <p className="text-xs text-gray-400 ml-1">
                            Don't have a code? <button type="button" className="font-bold text-indigo-500 hover:text-indigo-600 transition-colors" onClick={() => setFormData({ ...formData, roomCode: 'DEMO123' })}>Use Demo Code "DEMO123"</button>
                        </p>
                    </div>
                    <button type="submit" className="w-full py-4 bg-white border-2 border-indigo-100 text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all">
                        Join Room
                    </button>
                </form>
            )}
        </div>
    );
}
