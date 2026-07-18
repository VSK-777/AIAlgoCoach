import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const ChallengeCard = ({ title, description }) => {
    return (
        <div className="bg-white backdrop-blur-md border border-slate-200 rounded-xl p-5 hover:border-primary/50 transition-colors duration-300">
            <div className="flex items-start space-x-3">
                <CheckCircle2 className="text-green-400 mt-0.5 shrink-0" size={18} />
                <div>
                    <h4 className="text-slate-800 font-medium">{title}</h4>
                    <p className="text-slate-600 text-sm mt-1">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ChallengeCard;
