import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowLeft } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "O que é o Ecossistema WINF™?",
    answer: "A WINF é a primeira marca do mundo a unir inteligência artificial, nanotecnologia em películas e um ecossistema completo de gestão para licenciados de elite."
  },
  {
    question: "Como funciona o sistema de garantias?",
    answer: "O licenciando registra a instalação no sistema, e o cliente recebe um certificado digital com QR Code. A garantia é monitorada e validada pelo Core AI™."
  },
  {
    question: "O que são as WinfCoins?",
    answer: "As WinfCoins são a moeda digital do nosso ecossistema. Você as ganha através de treinamentos, indicações e performance, podendo trocá-las por materiais no BlackShop™."
  },
  {
    question: "Como solicitar suporte técnico?",
    answer: "Você pode usar o hub de suporte diretamente no dashboard ou acionar o seu consultor dedicado através da integração com o WhatsApp Hub."
  }
];

const ModuleFAQ: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] p-6 md:p-10 space-y-8 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group mb-4"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium uppercase tracking-widest">Voltar ao Arsenal</span>
      </button>

      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-none mb-2">
            <HelpCircle size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white">CENTRO DE <span className="text-white">INTELIGÊNCIA FAQ</span></h1>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto">
            Encontre respostas rápidas sobre o ecossistema WINF e aprenda a extrair o máximo de performance da sua licença.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <div 
              key={index}
              className="border border-white/5 rounded-none overflow-hidden bg-black"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-white/5"
              >
                <span className="font-bold text-white pr-4">{item.question}</span>
                <ChevronDown 
                  className={`text-white transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-white/40 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-winf-primary/20 rounded-none p-5 md:p-8 text-center space-y-4">
          <h3 className="text-white font-bold">Ainda com dúvidas?</h3>
          <p className="text-white/40 text-xs">
            Nosso time de especialistas está pronto para ajudar você em tempo real via WhatsApp Hub.
          </p>
          <button className="px-8 py-3 bg-white text-black font-black uppercase text-xs rounded-none hover:bg-white/80 transition-colors">
            Falar com Suporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleFAQ;
