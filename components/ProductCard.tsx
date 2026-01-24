
import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="group bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col h-full cursor-pointer animate-fade-in-up"
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden bg-[#111]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-sm font-black uppercase px-3 py-1.5 rounded z-10">
          GHS {product.price.toLocaleString()}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{product.category}</p>
          <h3 className="text-lg font-bold group-hover:text-white transition-colors truncate">{product.name}</h3>
        </div>
        <div className="pt-5 flex items-center justify-between">
          <span className="text-sm text-white/40 line-clamp-1 font-light">{product.description}</span>
          <div className="p-2.5 bg-white/5 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
            <Plus size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
