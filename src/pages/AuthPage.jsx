import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({ label, type, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="w-full mb-4 text-left relative">
            <label className="block text-sm font-bold text-gray-600 mb-2 ml-1">{label}</label>
            <div className="relative">
                <input
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full px-6 py-4 rounded-xl bg-white/50 border border-white/40 focus:border-[#6C63FF]/50 focus:ring-0 transition-all outline-none text-gray-700 font-medium placeholder:text-gray-400"
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6C63FF] transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default function AuthPage({ defaultMode = 'signup', screenTitle, onBack, onAuth }) {
    const [mode, setMode] = useState(defaultMode);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mock logic to handle specific user login vs signup
        if (mode === 'signup') {
            onAuth(formData);
        } else {
            // Sign in mode: Check if it's the specific test user to mock the name
            const isTestUser = formData.email.toLowerCase().includes('aakash');
            onAuth({
                name: isTestUser ? 'Aakash Kumar' : 'User',
                email: formData.email,
                password: formData.password
            });
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
            {/* Vibe Gradient Background (Matching Landing Page) */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#EEF2FF] via-[#FDF2F8] to-[#EBFAFA] animate-pulse" />

            {/* Branding Header */}
            <div className="absolute top-8 left-0 right-0 flex justify-center">
                <div className="text-3xl font-black bg-gradient-to-r from-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent tracking-tight">ROOMSYNC</div>
            </div>

            <div className="bg-white/60 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] max-w-md w-full text-center relative overflow-hidden transition-all shadow-2xl border border-white/50 slide-up">
                {/* CSS for slide-up animation */}
                <style>{`
                    @keyframes slideUp {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .slide-up { animation: slideUp 0.6s ease-out forwards; }
                    .delay-100 { animation-delay: 0.1s; }
                    .delay-200 { animation-delay: 0.2s; }
                    .delay-300 { animation-delay: 0.3s; }
                `}</style>

                <div className="flex justify-start w-full mb-6 relative z-10">
                    <button
                        onClick={onBack}
                        className="text-gray-400 hover:text-[#6C63FF] transition-colors font-bold text-sm flex items-center gap-2 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
                    </button>
                </div>

                <h2 className="text-4xl font-black mb-3 text-gray-900 tracking-tighter slide-up delay-100">
                    {(mode === defaultMode && screenTitle) ? screenTitle : (mode === 'signup' ? 'Create Account' : 'Welcome Back')}
                </h2>

                <p className="text-gray-500 font-medium mb-10 slide-up delay-200">
                    {mode === 'signup' ? 'Join RoomSync and start syncing today.' : 'Sign in to manage your room harmony.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 slide-up delay-300">
                    {mode === 'signup' && (
                        <InputField
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => handleChange(e, 'name')}
                        />
                    )}
                    <InputField
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange(e, 'email')}
                    />
                    <InputField
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleChange(e, 'password')}
                    />

                    <button type="submit" className="w-full py-5 bg-gradient-to-r from-[#6C63FF] to-[#FF6584] text-white rounded-full font-bold text-lg shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all mt-6 mb-8 relative overflow-hidden group">
                        <span className="relative z-10">
                            {screenTitle === 'Sign Up' ? 'Sign Up' : (mode === 'signup' ? 'Get Started' : 'Sign In')}
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </form>

                <div className="text-gray-500 font-bold text-sm slide-up delay-300">
                    {mode === 'signup' ? (
                        <>Already have an account? <button onClick={() => setMode('signin')} className="text-[#6C63FF] hover:underline">Sign In</button></>
                    ) : (
                        <>Don't have an account? <button onClick={() => setMode('signup')} className="text-[#6C63FF] hover:underline">Sign Up</button></>
                    )}
                </div>
            </div>
        </div>
    );
}
