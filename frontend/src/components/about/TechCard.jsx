import React from 'react';

const TechCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-start space-x-4 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-primary/5">
            <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:text-white group-hover:bg-primary transition-colors">
                <Icon size={24} />
            </div>
            <div>
                <h4 className="text-slate-100 font-semibold text-lg">{title}</h4>
                <p className="text-slate-400 text-sm mt-1">{description}</p>
            </div>
        </div>
    );
};

export default TechCard;
