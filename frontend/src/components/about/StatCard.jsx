import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon = Sparkles, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group flex flex-col items-center justify-center p-6 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="bg-primary/10 p-3 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 text-primary">
                <Icon size={24} strokeWidth={2} />
            </div>
            <span className="text-slate-500 text-[15px] font-medium tracking-wide uppercase mb-1">{label}</span>
            <span className="text-xl md:text-2xl font-bold text-slate-900">{value}</span>
        </motion.div>
    );
};

export default StatCard;
