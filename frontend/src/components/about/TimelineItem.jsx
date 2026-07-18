import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ title, description, isLast = false, delay = 0, date }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            className="relative pl-8 md:pl-0"
        >
            <div className="md:flex items-center justify-between md:space-x-8">
                {/* Desktop Date (Left side) */}
                <div className="hidden md:block w-1/3 text-right">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{date}</span>
                </div>

                {/* Timeline Node & Line */}
                <div className="absolute left-0 md:relative md:w-1/3 flex justify-center h-full">
                    <div className="w-10 h-10 rounded-full bg-white border-[3px] border-primary flex items-center justify-center z-10 shadow-md">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                    </div>
                    {!isLast && (
                        <div className="absolute top-10 bottom-[-40px] md:bottom-[-60px] left-5 md:left-1/2 w-0.5 bg-gradient-to-b from-primary to-slate-200 -translate-x-1/2"></div>
                    )}
                </div>

                {/* Content Card (Right side) */}
                <div className="w-full md:w-1/3 pb-10 md:pb-16">
                    <div className="md:hidden text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{date}</div>
                    <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="text-[18px] font-bold text-slate-900 mb-1">{title}</h4>
                        {description && <p className="text-[15px] text-slate-500 leading-relaxed">{description}</p>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TimelineItem;
