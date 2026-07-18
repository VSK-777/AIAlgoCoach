import React, { useState } from 'react';

const ProfileImage = ({ src, alt, fallbackInitials }) => {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.3)] ring-4 ring-slate-200 group transition-all duration-500 hover:scale-105 hover:ring-primary/50">
            {!hasError ? (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
                    <span className="text-5xl font-bold text-slate-900 tracking-wider">{fallbackInitials}</span>
                </div>
            )}
            
            {/* Loading Skeleton */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
                    <span className="text-slate-600 text-sm">Loading...</span>
                </div>
            )}
        </div>
    );
};

export default ProfileImage;
