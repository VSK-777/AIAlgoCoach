import React from 'react';

const StatCard = ({ label, value }) => {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-300">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                {value}
            </h3>
            <p className="text-slate-300 font-medium text-sm uppercase tracking-wider">{label}</p>
        </div>
    );
};

export default StatCard;
