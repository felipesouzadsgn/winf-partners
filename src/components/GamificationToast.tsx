
import React, { useEffect } from 'react';
import { Coins, X } from 'lucide-react';
import { NotificationState } from '../types';

interface GamificationToastProps {
  notification: NotificationState;
  onClose: () => void;
}

const GamificationToast: React.FC<GamificationToastProps> = ({ notification, onClose }) => {
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.show, onClose]);

  if (!notification.show) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div className="bg-[#121212] border border-white/10 rounded-none shadow-[0_0_30px_rgba(0,0,0,0.5)] p-4 flex items-center gap-4 max-w-sm backdrop-blur-md relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-winf-aerocore_blue/5 to-transparent pointer-events-none" />
        
        <div className="w-12 h-12 rounded-none bg-black border border-zinc-700/30 flex items-center justify-center shrink-0 shadow-lg relative">
           <div className="absolute inset-0 bg-zinc-800/20 rounded-none animate-pulse"></div>
           <Coins size={20} className="text-white/40 relative z-10" />
        </div>
        
        <div className="flex-1 min-w-[200px]">
           <p className="text-white text-sm font-medium leading-tight" dangerouslySetInnerHTML={{ __html: notification.message }}></p>
           {notification.points > 0 && (
             <p className="text-xs text-green-400 font-bold mt-1 flex items-center gap-1">
               +{notification.points} WinfCoins
             </p>
           )}
        </div>

        <button 
          onClick={onClose}
          className="text-white/40 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default GamificationToast;