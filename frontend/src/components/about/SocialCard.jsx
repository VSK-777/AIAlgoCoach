import React from 'react';

const SocialCard = ({ icon: Icon, title, href }) => {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group"
        >
            <div className="p-4 bg-slate-800 rounded-full group-hover:bg-primary/20 group-hover:text-primary transition-colors text-slate-300 mb-3">
                <Icon size={28} />
            </div>
            <span className="text-slate-200 font-medium">{title}</span>
        </a>
    );
};

export default SocialCard;
