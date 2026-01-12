import React from 'react';

export default function Logo({ className }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-midnight-950 font-serif font-bold text-2xl">U</span>
            </div>
            <div className="hidden md:block">
                <span className="block text-white font-serif tracking-widest text-lg leading-none">URBINA</span>
                <span className="block text-gold-500 text-xs tracking-[0.2em] leading-none">AGENCY</span>
            </div>
        </div>
    );
}
