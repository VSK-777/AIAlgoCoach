import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="bg-white backdrop-blur-md border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:bg-slate-50 hover:scale-[1.02]">
            <div className="flex items-center space-x-4 mb-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <Icon size={20} />
                </div>
                <h4 className="text-slate-900 font-semibold">{title}</h4>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default FeatureCard;
