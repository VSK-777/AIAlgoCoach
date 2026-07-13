import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
            <div className="flex items-center space-x-4 mb-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <Icon size={20} />
                </div>
                <h4 className="text-white font-semibold">{title}</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default FeatureCard;
