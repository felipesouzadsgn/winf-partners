
import React from 'react';
import { Award, ShieldCheck, Download, Share2, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface AcademyCertificateProps {
    courseTitle: string;
    userName: string;
    date: string;
    onClose: () => void;
}

const AcademyCertificate: React.FC<AcademyCertificateProps> = ({ courseTitle, userName, date, onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-3xl bg-white rounded-none p-1 shadow-2xl overflow-hidden"
            >
                {/* Certificate Border */}
                <div className="border-[16px] border-zinc-900 p-6 md:p-12 space-y-12 relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-zinc-900 -translate-x-2 -translate-y-2"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-zinc-900 translate-x-2 translate-y-2"></div>
                    
                    {/* Content */}
                    <div className="text-center space-y-8">
                        <div className="flex justify-center">
                            <div className="w-24 h-24 bg-zinc-900 rounded-none flex items-center justify-center text-white">
                                <Award size={48} />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <h1 className="text-zinc-900 text-5xl font-black tracking-tighter uppercase">Certificado de Conclusão</h1>
                            <p className="text-zinc-500 font-serif italic text-xl">A Winf Academy™ orgulhosamente certifica que</p>
                        </div>

                        <div className="py-4 border-b-2 border-zinc-100 inline-block px-12">
                            <h2 className="text-zinc-900 text-4xl font-bold tracking-tight">{userName}</h2>
                        </div>

                        <div className="space-y-4 max-w-xl mx-auto">
                            <p className="text-zinc-600 text-lg leading-relaxed">
                                Concluiu com êxito o treinamento de elite <span className="font-bold text-zinc-900">"{courseTitle}"</span>, demonstrando domínio técnico e compromisso com os padrões de excelência da rede Winf.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                            <div className="text-center space-y-2">
                                <div className="h-px bg-zinc-200 w-full"></div>
                                <p className="text-xs md:text-[10px] text-white/40 uppercase font-bold tracking-widest">Data de Emissão</p>
                                <p className="text-zinc-900 font-bold text-sm">{date}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <ShieldCheck size={40} className="text-zinc-900" />
                                <p className="text-[10px] md:text-[8px] text-white/40 uppercase font-black mt-2">Autenticidade Verificada</p>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="h-px bg-zinc-200 w-full"></div>
                                <p className="text-xs md:text-[10px] text-white/40 uppercase font-bold tracking-widest">Assinatura Digital</p>
                                <p className="text-zinc-900 font-serif italic text-sm">Winf Board of Directors</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions Overlay (Not part of certificate print) */}
                <div className="absolute top-4 right-4 flex gap-2 no-print">
                    <button className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-none transition-all">
                        <Download size={20} />
                    </button>
                    <button className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-none transition-all">
                        <Share2 size={20} />
                    </button>
                    <button onClick={onClose} className="p-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-none transition-all">
                        <X size={20} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AcademyCertificate;
