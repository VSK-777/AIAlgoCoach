import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group p-8 bg-white border border-slate-200/60 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-400 relative overflow-hidden flex flex-col h-full"
        >
            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-primary/10 transition-colors duration-500"></div>
            
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300 relative z-10">
                <Icon size={28} strokeWidth={1.5} />
            </div>
            
            <h3 className="text-[20px] font-bold text-slate-900 mb-3 relative z-10">{title}</h3>
            <p className="text-[15px] text-slate-500 leading-relaxed relative z-10 flex-grow">{description}</p>
        </motion.div>
    );
};

export default FeatureCard;
