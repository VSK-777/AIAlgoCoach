import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ title, subtitle }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
        >
            <h2 className="text-[34px] md:text-[38px] font-extrabold text-slate-900 tracking-tight">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};

export default SectionHeading;
