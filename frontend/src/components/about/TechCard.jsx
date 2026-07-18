import React from 'react';
import { motion } from 'framer-motion';

const TechCard = ({ icon: Icon, title, description, version, delay = 0 }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group flex gap-4 p-5 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
        >
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors duration-300">
                <Icon className="text-slate-600 group-hover:text-primary transition-colors duration-300" size={24} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                    <h4 className="text-[18px] font-bold text-slate-900 group-hover:text-primary transition-colors">{title}</h4>
                    {version && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-500 rounded-full border border-slate-200">
                            {version}
                        </span>
                    )}
                </div>
                <p className="text-[15px] text-slate-500 leading-relaxed mt-1">{description}</p>
            </div>
        </motion.div>
    );
};

export default TechCard;
