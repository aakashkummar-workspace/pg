import React, { useState } from 'react';
import {
    CreditCard, DollarSign, RefreshCw, ShoppingBag,
    Trash2, Star, Camera, Repeat,
    Moon, Sun, Coffee, Users, Umbrella,
    MessageSquare, HelpCircle, BarChart2,
    Wifi, Phone, FileText, CheckCircle, XCircle
} from 'lucide-react';

export const WidgetCard = ({ title, children, className, action, icon: Icon, color = "indigo" }) => (
    <div className={`bg-white/60 backdrop-blur-xl p-5 rounded-[2rem] border border-white/40 shadow-sm hover:shadow-lg hover:border-white/60 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex flex-col ${className}`}>
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
                {Icon && <div className={`p-2 rounded-xl bg-${color}-50 text-${color}-500`}><Icon size={18} /></div>}
                <h3 className="font-bold text-gray-700 text-sm">{title}</h3>
            </div>
            {action && <button className={`text-[10px] font-bold text-${color}-500 hover:text-${color}-600 bg-${color}-50 px-3 py-1 rounded-full uppercase tracking-wider`}>{action}</button>}
        </div>
        <div className="flex-1">
            {children}
        </div>
    </div>
);

// --- 💰 Financial Harmony ---

export const RecurringBillsWidget = () => {
    const [bills, setBills] = useState([
        { name: 'Rent', amount: '$1200', due: 'Due in 2 days', status: 'unpaid' },
        { name: 'Internet', amount: '$60', due: 'Paid by Mike', status: 'paid' },
    ]);

    const togglePay = (index) => {
        const newBills = [...bills];
        newBills[index].status = newBills[index].status === 'paid' ? 'unpaid' : 'paid';
        setBills(newBills);
    };

    return (
        <WidgetCard title="Upcoming Bills" icon={CreditCard} color="emerald">
            <div className="space-y-3">
                {bills.map((bill, i) => (
                    <div key={i} onClick={() => togglePay(i)} className="flex items-center justify-between text-sm group cursor-pointer hover:bg-white/40 p-2 rounded-lg -mx-2 transition-colors">
                        <div>
                            <p className="font-bold text-gray-800">{bill.name}</p>
                            <p className="text-xs text-gray-400">{bill.status === 'paid' ? 'Paid!' : bill.due}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`font-bold ${bill.status === 'paid' ? 'text-emerald-600 line-through opacity-50' : 'text-gray-600'}`}>{bill.amount}</span>
                            {bill.status === 'paid' ? <CheckCircle size={16} className="text-emerald-500" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300 group-hover:border-emerald-400" />}
                        </div>
                    </div>
                ))}
            </div>
        </WidgetCard>
    );
};

export const SplitUpWidget = () => {
    return (
        <WidgetCard title="Split Up" icon={DollarSign} color="blue">
            <div className="space-y-3">
                <div className="flex justify-between items-center bg-red-50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" className="w-8 h-8 rounded-full bg-white" />
                        <div>
                            <p className="text-xs font-bold text-gray-700">Mike</p>
                            <p className="text-[10px] text-gray-400">Dinner</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-red-500">You owe</p>
                        <p className="text-sm font-black text-gray-800">$15.00</p>
                    </div>
                </div>

                <div className="flex justify-between items-center bg-green-50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" className="w-8 h-8 rounded-full bg-white" />
                        <div>
                            <p className="text-xs font-bold text-gray-700">Sarah</p>
                            <p className="text-[10px] text-gray-400">Groceries</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-green-500">Owes you</p>
                        <p className="text-sm font-black text-gray-800">$8.50</p>
                    </div>
                </div>

                <button className="w-full py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors">
                    + Add Expense
                </button>
            </div>
        </WidgetCard>
    );
};

// --- 🧹 Chore & Habit Gamification ---

export const ChoreLeaderboardWidget = () => (
    <WidgetCard title="Karma Points" icon={Star} color="orange" className="row-span-2">
        <div className="space-y-4">
            {[
                { name: 'Aakash', points: 1250, medal: '🥇' },
                { name: 'Sarah', points: 980, medal: '🥈' },
                { name: 'Mike', points: 850, medal: '🥉' },
            ].map((user, i) => (
                <div key={i} className="flex items-center gap-3">
                    <span className="text-lg">{user.medal}</span>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} className="w-8 h-8 rounded-full bg-gray-100" />
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-sm text-gray-700">{user.name}</span>
                            <span className="font-black text-xs text-orange-500">{user.points} XP</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-orange-400 rounded-full" style={{ width: `${(user.points / 1500) * 100}%` }} />
                        </div>
                    </div>
                </div>
            ))}
            <div className="bg-orange-50 p-3 rounded-xl text-center mt-4 cursor-pointer hover:bg-orange-100 transition-colors">
                <p className="text-xs font-bold text-orange-600">🏆 Monthly Prize</p>
                <p className="text-[10px] text-orange-400">Winner gets a free dinner!</p>
            </div>
        </div>
    </WidgetCard>
);

export const SwapMarketWidget = () => {
    const [status, setStatus] = useState('pending'); // pending, accepted, declined

    return (
        <WidgetCard title="Chore Swap Market" icon={Repeat} color="purple">
            <div className="bg-white/50 p-3 rounded-xl border border-white/60 mb-2 transition-all">
                {status === 'pending' ? (
                    <>
                        <div className="flex items-center gap-2 mb-1">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" className="w-5 h-5 rounded-full" />
                            <span className="text-xs font-bold text-gray-600">Mike asks:</span>
                        </div>
                        <p className="text-xs text-gray-700 italic">"Will trade <span className="font-bold">Trash</span> today for <span className="font-bold">Dishes</span> tmrw! 🙏"</p>
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => setStatus('accepted')} className="flex-1 py-1 bg-purple-100 text-purple-600 rounded text-[10px] font-bold hover:bg-purple-200">Accept</button>
                            <button onClick={() => setStatus('declined')} className="flex-1 py-1 bg-gray-100 text-gray-400 rounded text-[10px] font-bold hover:bg-gray-200">Decline</button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-xs font-bold text-gray-500">
                            {status === 'accepted' ? '🤝 Deal Accepted!' : '❌ Offer Declined'}
                        </p>
                        <button onClick={() => setStatus('pending')} className="text-[10px] text-indigo-500 hover:underline mt-1">Undo</button>
                    </div>
                )}
            </div>
        </WidgetCard>
    );
};

// --- 🗓️ Coordination & Respect ---

export const StatusToggleWidget = () => {
    const [activeStatus, setActiveStatus] = useState('Focus');

    return (
        <WidgetCard title="My Status" icon={Users} color="cyan">
            <div className="grid grid-cols-3 gap-2">
                {[
                    { label: 'Focus', icon: <Moon size={16} />, color: 'bg-indigo-100 text-indigo-600', active: 'ring-2 ring-indigo-500' },
                    { label: 'Free', icon: <Sun size={16} />, color: 'bg-green-100 text-green-600', active: 'ring-2 ring-green-500' },
                    { label: 'Sleep', icon: <Coffee size={16} />, color: 'bg-orange-100 text-orange-600', active: 'ring-2 ring-orange-500' },
                ].map((status, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveStatus(status.label)}
                        className={`flex flex-col items-center justify-center py-3 rounded-xl hover:opacity-80 transition-all ${status.color} ${activeStatus === status.label ? status.active : 'opacity-60 scale-95'}`}
                    >
                        {status.icon}
                        <span className="text-[10px] font-bold mt-1">{status.label}</span>
                    </button>
                ))}
            </div>
        </WidgetCard>
    );
};

export const ShowerScheduleWidget = () => {
    const [selectedSlot, setSelectedSlot] = useState(1); // 7:20 is selected by default mock

    return (
        <WidgetCard title="Shower Slots (AM)" icon={Umbrella} color="blue">
            <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
                {['7:00', '7:20', '7:40', '8:00'].map((time, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedSlot(i)}
                        className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${selectedSlot === i ? 'bg-blue-500 text-white border-blue-500 shadow-md transform scale-105' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'}`}
                    >
                        {time}
                    </button>
                ))}
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-1">
                {selectedSlot === 1 ? '7:20 Reserved by Sarah' : 'Slot Available - Click to Book'}
            </p>
        </WidgetCard>
    );
};

// --- 📢 Communication ---

export const DigitalWhiteboardWidget = () => {
    const [notes, setNotes] = useState([
        { id: 1, text: "Leftover Pizza is fair game! 🍕", color: "bg-yellow-100", rotate: "-rotate-1" },
        { id: 2, text: "Don't forget landlord visit @ 5pm", color: "bg-blue-100", rotate: "rotate-2" }
    ]);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleEdit = (note) => {
        setEditingId(note.id);
        setEditText(note.text);
    };

    const handleSave = (id) => {
        setNotes(notes.map(n => n.id === id ? { ...n, text: editText } : n));
        setEditingId(null);
    };

    const handleKeyDown = (e, id) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave(id);
        }
    };

    const addNewNote = () => {
        const colors = ["bg-yellow-100", "bg-blue-100", "bg-green-100", "bg-pink-100"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomRotate = Math.random() > 0.5 ? "rotate-1" : "-rotate-1";

        const newNote = {
            id: Date.now(),
            text: "New Note... ✍️",
            color: randomColor,
            rotate: randomRotate
        };
        setNotes([...notes, newNote]);
    };

    return (
        <WidgetCard
            title="Kitchen Whiteboard"
            icon={FileText}
            color="yellow"
            className="col-span-2"
            action={<span onClick={addNewNote} className="cursor-pointer text-xl font-black">+</span>}
        >
            <div className="grid grid-cols-2 gap-3 h-full content-start">
                {notes.map(note => (
                    <div
                        key={note.id}
                        onClick={() => handleEdit(note)}
                        className={`${note.color} ${note.rotate} p-3 shadow-md hover:scale-105 hover:rotate-0 transition-all h-24 flex items-center justify-center font-hand text-center leading-tight cursor-pointer relative group`}
                    >
                        {editingId === note.id ? (
                            <textarea
                                autoFocus
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onBlur={() => handleSave(note.id)}
                                onKeyDown={(e) => handleKeyDown(e, note.id)}
                                className="w-full h-full bg-transparent resize-none outline-none text-gray-800 text-sm italic text-center font-hand"
                            />
                        ) : (
                            <>
                                <span className="text-gray-700 text-sm italic">{note.text}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setNotes(notes.filter(n => n.id !== note.id));
                                    }}
                                    className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 shadow-sm transition-opacity"
                                >
                                    ×
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </WidgetCard>
    );
};

export const PollsWidget = ({ roomId }) => {
    const STORAGE_KEY = `roomsync_poll_${roomId || 'demo'}`;

    // Load initial state from storage or default
    const [pollState, setPollState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {
            options: { a: 12, b: 8 }, // Raw vote counts, not percentages
            userVotes: {} // map of userId -> option
        };
    });

    // Calculate percentages
    const totalVotes = pollState.options.a + pollState.options.b;
    const getPercent = (count) => totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100);

    const handleVote = (option) => {
        // Simple mock user prevention (cookie-like)
        const hasVoted = localStorage.getItem(`${STORAGE_KEY}_voted`);
        if (hasVoted) return;

        const newState = {
            ...pollState,
            options: {
                ...pollState.options,
                [option]: pollState.options[option] + 1
            }
        };

        setPollState(newState);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        localStorage.setItem(`${STORAGE_KEY}_voted`, 'true');
    };

    const hasVoted = typeof window !== 'undefined' && localStorage.getItem(`${STORAGE_KEY}_voted`);

    return (
        <WidgetCard title="Saturday Movie?" icon={BarChart2} color="pink">
            <div className="space-y-2 mt-1">
                <div onClick={() => !hasVoted && handleVote('a')} className={`relative h-8 bg-gray-100 rounded-lg overflow-hidden ${!hasVoted ? 'cursor-pointer group' : 'cursor-default'}`}>
                    <div className={`absolute inset-0 bg-pink-200 transition-all duration-500`} style={{ width: `${getPercent(pollState.options.a)}%` }} />
                    <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-bold text-gray-700 z-10">
                        <span>Inception 🤯</span>
                        <span>{getPercent(pollState.options.a)}%</span>
                    </div>
                </div>
                <div onClick={() => !hasVoted && handleVote('b')} className={`relative h-8 bg-gray-100 rounded-lg overflow-hidden ${!hasVoted ? 'cursor-pointer group' : 'cursor-default'}`}>
                    <div className={`absolute inset-0 bg-gray-200 transition-all duration-500 ${!hasVoted && 'group-hover:bg-pink-100'}`} style={{ width: `${getPercent(pollState.options.b)}%` }} />
                    <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-bold text-gray-700 z-10">
                        <span>Barbie 💅</span>
                        <span>{getPercent(pollState.options.b)}%</span>
                    </div>
                </div>
                {hasVoted && <p className="text-[10px] text-center text-pink-500 font-bold animate-pulse">Thanks for voting!</p>}
            </div>
        </WidgetCard>
    );
};

// --- 🏠 Logistics & Info ---

export const ContactWidget = () => (
    <WidgetCard title="Emergency" icon={Phone} color="red">
        <div className="space-y-2">
            <div className="flex items-center justify-between text-xs bg-red-50 p-2 rounded-lg text-red-700 font-bold cursor-pointer hover:bg-red-100">
                <span>🔧 Plumber (Mario)</span>
                <span>📞 Call</span>
            </div>
            <div className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded-lg text-gray-700 font-bold cursor-pointer hover:bg-gray-100">
                <span>🏠 Landlord</span>
                <span>📞 Call</span>
            </div>
        </div>
    </WidgetCard>
);

export const RoommatesListWidget = ({ members }) => {
    const roommates = members || [
        { name: "Aakash", role: "Admin", status: "🏠 At Home", avatar: "Aakash" },
        { name: "Sarah", role: "Member", status: "🏢 At Work", avatar: "Sarah" },
        { name: "Mike", role: "Member", status: "🏋️ Gym", avatar: "Mike" },
        { name: "Emily", role: "Guest", status: "✈️ Traveling", avatar: "Emily" },
    ];

    return (
        <WidgetCard title={`Roommates (${roommates.length})`} icon={Users} color="indigo">
            <div className="space-y-3 mt-1">
                {roommates.map((user, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 hover:bg-indigo-50 rounded-xl transition-colors cursor-default group">
                        <div className="relative">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`}
                                alt={user.name}
                                className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white shadow-sm"
                            />
                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.status.includes("Home") ? "bg-green-500" : "bg-gray-400"
                                }`} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-800 text-sm">{user.name}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${user.role === 'Admin' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    {user.role}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium group-hover:text-indigo-500 transition-colors">
                                {user.status}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </WidgetCard>
    );
};
