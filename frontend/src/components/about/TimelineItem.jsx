import React from 'react';

const TimelineItem = ({ title, isLast }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full bg-white border border-slate-200 rounded-xl p-4 text-center backdrop-blur-sm relative z-10 hover:bg-slate-50 transition-colors">
                <span className="text-slate-800 font-medium">{title}</span>
            </div>
            {!isLast && (
                <div className="h-8 w-px bg-gradient-to-b from-slate-300 to-slate-100 my-1"></div>
            )}
        </div>
    );
};

export default TimelineItem;
