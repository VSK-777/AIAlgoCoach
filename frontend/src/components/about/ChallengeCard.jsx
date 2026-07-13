import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const ChallengeCard = ({ title, description }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-5 hover:border-primary/50 transition-colors duration-300">
            <div className="flex items-start space-x-3">
                <CheckCircle2 className="text-green-400 mt-0.5 shrink-0" size={18} />
                <div>
                    <h4 className="text-slate-200 font-medium">{title}</h4>
                    <p className="text-slate-400 text-sm mt-1">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ChallengeCard;
