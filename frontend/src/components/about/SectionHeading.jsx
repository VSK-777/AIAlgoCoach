import React from 'react';

const SectionHeading = ({ title, subtitle }) => {
    return (
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500 mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className="text-slate-600 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeading;
