import React from 'react';
import { motion } from 'framer-motion';

const ProfileImage = ({ src, alt, fallbackInitials }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center items-center"
        >
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-tr from-primary via-secondary to-blue-400 shadow-2xl">
                <div className="w-full h-full rounded-full bg-white overflow-hidden border-4 border-white shadow-inner flex items-center justify-center">
                    {src ? (
                        <img 
                            src={src} 
                            alt={alt} 
                            className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-105"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : null}
                    <div className="hidden w-full h-full items-center justify-center bg-slate-100 text-slate-400 font-bold text-4xl md:text-6xl rounded-full">
                        {fallbackInitials}
                    </div>
                </div>
            </div>
            
            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        </motion.div>
    );
};

export default ProfileImage;
