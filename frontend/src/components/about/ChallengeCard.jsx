import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const ChallengeCard = ({ title, description, delay = 0 }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group flex flex-col p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300 relative overflow-hidden h-full"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-emerald-400 transition-colors duration-300"></div>
            
            <div className="flex items-start gap-3 mb-2">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} strokeWidth={2} />
                <h4 className="text-[18px] font-bold text-slate-900 leading-tight">{title}</h4>
            </div>
            <p className="text-[15px] text-slate-500 leading-relaxed pl-8 flex-grow">{description}</p>
        </motion.div>
    );
};

export default ChallengeCard;
