import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronRight, Zap, Thermometer, Sun } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    image?: string;
    line?: string;
    performance?: {
      thermal: number;
      light: number;
      shield: number;
      privacy: number;
    };
  };
  onDetails: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDetails }) => {
  // Fallback image if none provided
  const imageUrl = product.image || `https://picsum.photos/seed/${product.id}/800/600`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-zinc-900/40 border border-white/10 rounded-none overflow-hidden transition-all hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      id={`product-card-${product.id}`}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        
        {/* Badge */}
        {product.line && (
          <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-none">
            <p className="text-xs md:text-[10px] font-black uppercase tracking-[0.2em] text-white">
              {product.line}
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white tracking-tighter uppercase group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <p className="text-white/40 text-sm leading-relaxed line-clamp-2 font-medium">
            {product.description}
          </p>
        </div>

        {/* Quick Stats */}
        {product.performance && (
          <div className="flex items-center gap-4 py-4 border-y border-white/5">
            <div className="flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs md:text-[10px] font-bold text-white/60 uppercase tracking-widest">{product.performance.thermal}/10</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-white" />
              <span className="text-xs md:text-[10px] font-bold text-white/60 uppercase tracking-widest">{product.performance.light}/10</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs md:text-[10px] font-bold text-white/60 uppercase tracking-widest">{product.performance.shield}/10</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => onDetails(product.id)}
          className="w-full group/btn relative flex items-center justify-between bg-white text-black px-8 py-4 rounded-none font-black uppercase tracking-widest overflow-hidden transition-all hover:bg-gray-200 active:scale-95"
        >
          <span className="relative z-10">Ver Detalhes</span>
          <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover/btn:translate-x-1" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
        </button>
      </div>

      {/* Decorative Corner Icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity">
        <Shield className="w-12 h-12 text-white" />
      </div>
    </motion.div>
  );
};

export default ProductCard;
