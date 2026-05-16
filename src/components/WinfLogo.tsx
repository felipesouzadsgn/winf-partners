import React from 'react';

interface WinfLogoProps {
  className?: string;
}

export const WinfLogo: React.FC<WinfLogoProps> = ({ className = "" }) => {
  return (
    <div className={`font-black tracking-tighter uppercase flex items-baseline ${className}`}>
      <span>WINF</span>
      <span className="text-[0.5em] align-top relative -top-1 ml-0.5">™</span>
      <span className="w-2 h-2 rounded-full bg-white ml-0.5 self-end mb-1"></span>
    </div>
  );
};
