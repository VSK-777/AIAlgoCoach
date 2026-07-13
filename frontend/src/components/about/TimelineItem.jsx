import React from 'react';

const TimelineItem = ({ title, isLast }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm relative z-10 hover:bg-white/10 transition-colors">
                <span className="text-slate-200 font-medium">{title}</span>
            </div>
            {!isLast && (
                <div className="h-8 w-px bg-gradient-to-b from-white/20 to-white/5 my-1"></div>
            )}
        </div>
    );
};

export default TimelineItem;
