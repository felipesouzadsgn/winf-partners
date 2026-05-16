import React, { useState, useEffect } from 'react';
import { ShoppingCart, ArrowRight, ChevronLeft, Plus, Minus, Trash2, ShoppingBag, Star, Award, Wallet, CheckCircle2 } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductSkeleton } from './ui/LoadingSkeleton';

const SalesFunnel: React.FC<{user: any}> = ({ user }) => {
  const { products, orders, fetchProducts, fetchOrders, createOrder, updateUserCoins, gamify, isLoading } = useWinf();
  const [cart, setCart] = useState<{product: any, qty: number}[]>([]);
  const [lastAddedProductId, setLastAddedProductId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => { 
    fetchProducts(); 
    fetchOrders(); 
  }, []);

  const addToCart = (product: any) => {
      setCart(prev => {
          const exists = prev.find(p => p.product.id === product.id);
          if (exists) {
            return prev.map(p => p.product.id === product.id ? {...p, qty: p.qty + 1} : p);
          }
          setLastAddedProductId(product.id);
          return [...prev, { product, qty: 1 }];
      });
  };

  const increaseQty = (productId: string) => {
      setCart(prev => prev.map(p => p.product.id === productId ? {...p, qty: p.qty + 1} : p));
  };

  const decreaseQty = (productId: string) => {
      setCart(prev => prev.map(p => p.product.id === productId && p.qty > 1 ? {...p, qty: p.qty - 1} : p).filter(p => p.qty > 0));
  };

  const removeFromCart = (productId: string) => {
      setCart(prev => prev.filter(p => p.product.id !== productId));
  };

  const totalCartAmount = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const totalWinfCoinsRequired = Math.floor(totalCartAmount / 10); // Example: 10% value in coins

  const handleCheckout = async (useCoins: boolean = false) => {
      if (cart.length === 0) return;
      
      if (useCoins && user.winfCoins < totalWinfCoinsRequired) {
          alert("Saldo de WinfCoins insuficiente para este resgate.");
          return;
      }

      setIsProcessing(true);
      const items = cart.map(c => ({ product_id: c.product.id, quantity: c.qty, unit_price: c.product.price }));
      
      const { success, error } = await createOrder(items, { street: 'Winf HQ' }, useCoins ? 'winfcoins' : 'credit_card');
      
      if (success) {
        if (useCoins) {
            await updateUserCoins(-totalWinfCoinsRequired, `Resgate BlackShop: ${cart.length} itens`, 0);
        }
        gamify('REDEEM', { cost: useCoins ? totalWinfCoinsRequired : 0, item: 'Pedido BlackShop' });
        setCart([]);
        alert("Pedido realizado com sucesso! Seus materiais serão adicionados ao estoque após a confirmação.");
      } else {
        alert(`Erro ao finalizar pedido: ${error}`);
      }
      setIsProcessing(false);
  };

  return (
    <div className="space-y-10 animate-fade-in pb-24 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
            <div className="space-y-2">
                <h1 className="text-4xl font-light text-white tracking-tight">WINF <span className="font-bold text-white/40">BLACKSHOP™</span></h1>
                <p className="text-white/40 text-sm max-w-xl">
                    O marketplace exclusivo para membros de elite. Adquira materiais com condições especiais e utilize seus WinfCoins.
                </p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 border border-white/20 p-4 rounded-none">
                <div className="w-12 h-12 bg-white/20 rounded-none flex items-center justify-center text-white">
                    <Wallet size={24} />
                </div>
                <div>
                    <p className="text-xs md:text-[10px] text-white uppercase font-black tracking-widest">Seu Saldo</p>
                    <p className="text-white font-bold text-xl">W$ {user.winfCoins.toLocaleString()}</p>
                </div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Catalog */}
            <div className="lg:col-span-7 space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-white font-bold uppercase tracking-widest text-xs">Catálogo de Elite</h3>
                    <div className="flex gap-2">
                        <span className="text-xs md:text-[10px] bg-white/5 text-white/40 px-2 py-1 rounded-none">Arquitetura</span>
                        <span className="text-xs md:text-[10px] bg-white/5 text-white/40 px-2 py-1 rounded-none">Automotivo</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isLoading ? (
                        <>
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                        </>
                    ) : products.length === 0 ? (
                        <div className="col-span-full p-20 text-center bg-zinc-900/30 border border-white/5 rounded-none">
                            <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="text-sm text-white/40 uppercase font-black tracking-widest">Nenhum produto disponível no catálogo.</p>
                        </div>
                    ) : (
                        products.map(p => (
                        <motion.div 
                            key={p.id} 
                            whileHover={{ y: -5 }}
                            className="bg-zinc-900/50 border border-white/5 rounded-none overflow-hidden group flex flex-col"
                        >
                            <div className="aspect-square bg-black relative overflow-hidden">
                                <img 
                                    src={p.image_url || `https://picsum.photos/seed/${p.name}/400/400`} 
                                    alt={p.name} 
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                                />
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-none border border-white/10">
                                    <p className="text-white font-bold text-xs">W$ {Math.floor(p.price / 10)}</p>
                                </div>
                            </div>
                            <div className="p-5 space-y-4 flex-1 flex flex-col">
                                <div className="flex-1">
                                    <h4 className="text-white font-bold leading-tight">{p.name}</h4>
                                    <p className="text-xs md:text-[10px] text-white/40 mt-1 uppercase tracking-widest">{p.category}</p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <p className="text-white font-mono font-bold">R$ {p.price.toFixed(2)}</p>
                                    <button 
                                        onClick={() => addToCart(p)} 
                                        className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-none text-xs font-bold transition-all border border-white/10"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                        ))
                    )}
                </div>
            </div>
            
            {/* Checkout Area */}
            <div className="lg:col-span-5 space-y-6">
                <div className="bg-zinc-900/30 border border-white/5 rounded-none p-5 md:p-8 sticky top-6 space-y-8">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <ShoppingCart size={24} className="text-white/40" /> Seu Checkout
                    </h3>
                    
                    <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
                        {cart.length === 0 ? (
                            <div className="text-white/40 text-center py-12 flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-white/5 rounded-none flex items-center justify-center">
                                    <ShoppingBag size={32} className="text-gray-700" />
                                </div>
                                <p className="text-sm">Seu carrinho está vazio.</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.product.id} className="flex items-center gap-4 bg-black/20 p-3 rounded-none border border-white/5">
                                    <img src={item.product.image_url || `https://picsum.photos/seed/${item.product.name}/100/100`} alt={item.product.name} className="w-12 h-12 rounded-none object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-white text-sm truncate">{item.product.name}</p>
                                        <p className="text-xs md:text-[10px] text-white/40">R$ {item.product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => decreaseQty(item.product.id)} className="w-6 h-6 bg-white/5 rounded-none flex items-center justify-center text-white/40 hover:text-white transition-colors"><Minus size={12} /></button>
                                        <span className="text-white font-mono text-xs w-4 text-center">{item.qty}</span>
                                        <button onClick={() => increaseQty(item.product.id)} className="w-6 h-6 bg-white/5 rounded-none flex items-center justify-center text-white/40 hover:text-white transition-colors"><Plus size={12} /></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                      <div className="space-y-6 pt-6 border-t border-white/5">
                          <div className="space-y-2">
                              <div className="flex justify-between items-center text-sm">
                                  <span className="text-white/40">Subtotal</span>
                                  <span className="text-white font-mono">R$ {totalCartAmount.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                  <span className="text-white font-bold">Equivalente em WinfCoins</span>
                                  <span className="text-white font-mono font-bold">W$ {totalWinfCoinsRequired}</span>
                              </div>
                          </div>

                          <div className="grid grid-cols-1 gap-3">
                              <button 
                                  onClick={() => handleCheckout(false)} 
                                  disabled={isProcessing}
                                  className="w-full bg-white text-black py-4 rounded-none font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                              >
                                  {isProcessing ? 'Processando...' : <><CheckCircle2 size={18} /> Pagar com Cartão/Pix</>}
                              </button>
                              <button 
                                  onClick={() => handleCheckout(true)} 
                                  disabled={isProcessing || user.winfCoins < totalWinfCoinsRequired}
                                  className="w-full bg-white/10 border border-white/30 text-white py-4 rounded-none font-bold text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                  <Star size={18} className="fill-white" /> Resgatar com WinfCoins
                              </button>
                          </div>
                      </div>
                    )}
                </div>
            </div>
        </div>

        {/* Order History */}
        <div className="bg-zinc-900/30 border border-white/5 rounded-none p-5 md:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white">Histórico de Aquisições</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map(o => (
                    <div key={o.id} className="p-4 bg-black/20 border border-white/5 rounded-none flex justify-between items-center">
                        <div className="space-y-1">
                            <p className="text-white font-bold text-xs">Pedido #{o.id.slice(0,8)}</p>
                            <p className="text-xs md:text-[10px] text-white/40">{new Date(o.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-white/40 font-mono font-bold text-xs">R$ {o.total_amount.toFixed(2)}</p>
                            <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] bg-white/5 px-2 py-0.5 rounded-none text-white/40 uppercase tracking-widest">{o.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
export default SalesFunnel;
