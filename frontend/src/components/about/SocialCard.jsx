import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SocialCard = ({ icon: Icon, title, subtitle, href, delay = 0, disabled = false }) => {
    
    const CardContent = (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            whileHover={!disabled ? { y: -5, scale: 1.03 } : {}}
            className={`group relative flex items-center p-5 rounded-[20px] border transition-all duration-300 overflow-hidden ${
                disabled 
                ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed' 
                : 'bg-white border-slate-200/80 shadow-sm hover:shadow-xl hover:border-primary/30 cursor-pointer'
            }`}
        >
            {!disabled && <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
            
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl border transition-colors relative z-10 ${
                disabled ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20'
            }`}>
                <Icon size={24} strokeWidth={1.5} />
            </div>
            
            <div className="ml-4 flex-grow relative z-10">
                <h4 className="text-[16px] font-bold text-slate-900">{title}</h4>
                <p className="text-[13px] font-medium text-slate-500 mt-0.5">{subtitle}</p>
            </div>

            {!disabled && (
                <div className="relative z-10 text-slate-300 group-hover:text-primary transition-colors">
                    <ArrowUpRight size={20} strokeWidth={2} />
                </div>
            )}
        </motion.div>
    );

    if (disabled || !href) {
        return CardContent;
    }

    return (
        <a href={href} target={href.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer" className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-[20px]">
            {CardContent}
        </a>
    );
};

export default SocialCard;
