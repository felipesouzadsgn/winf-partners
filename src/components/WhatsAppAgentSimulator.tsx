import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, CheckCircle2, User, Bot, Loader2 } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { generateGeminiResponse } from '../lib/gemini';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const GEMINI_WHATSAPP_TOOLS = [
  {
    name: "tool_gerar_pdf",
    description: "Gera e envia uma proposta comercial em PDF direto no chat do WhatsApp.",
    parameters: {
      type: "object",
      properties: {
        clienteNome: { type: "string" },
        veiculoOuProjeto: { type: "string" },
        peliculaRecomendada: { type: "string" },
        valorEstimado: { type: "number" }
      },
      required: ["clienteNome", "veiculoOuProjeto", "peliculaRecomendada", "valorEstimado"]
    }
  },
  {
    name: "tool_encaminhar_franqueado",
    description: "Encaminha o lead qualificado para o parceiro autorizado da cidade no sistema de CRM.",
    parameters: {
      type: "object",
      properties: {
        clienteNome: { type: "string" },
        cidade: { type: "string" },
        resumoAtendimento: { type: "string" }
      },
      required: ["clienteNome", "cidade", "resumoAtendimento"]
    }
  }
];

const WhatsAppAgentSimulator: React.FC = () => {
  const { user } = useWinf();
  const [mode, setMode] = useState<'B2C' | 'B2B'>('B2C');
  const [messages, setMessages] = useState<{ id: string, role: 'user' | 'ai' | 'system', text: string }[]>([
    { id: '1', role: 'ai', text: 'Muito bom dia ☀️\nQue o nosso dia seja abençoado 🙏\n\nMudando aqui, meu nome é Tiago e eu vou cuidar do seu atendimento aqui na Winf™.\n\nPode me responder no seu tempo, sem pressa 👍\n\nNossa central funciona das 7h às 20h com atendimento humano, e fora desse horário nossa IA continua te auxiliando.\n\nPra eu te orientar da melhor forma, você já tem as medidas dos vidros?\nOu prefere me enviar uma foto ou vídeo mostrando onde deseja aplicar?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === 'B2B') {
        setMessages([
          { id: 'b2b-1', role: 'ai', text: 'Olá 🚀 Bem-vindo ao comando corporativo Winf™ Partners.\nSou responsável pelo direcionamento corporativo dos parceiros e arquitetos.\n\nPara eu focar exclusivamente no que importa para acelerar o seu negócio, como você atua hoje? \n(Instalador/Lojista, Arquiteto, Investidor ou Já é parceiro?)' }
        ]);
    } else {
        setMessages([
          { id: 'b2c-1', role: 'ai', text: 'Olá! Tudo bem? Aqui é o Ralph da Winf™.\nMe conta rapidamente o que você está buscando — é para casa, empresa ou automóvel?' }
        ]);
    }
  }, [mode]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generatePrompt = () => {
    if (mode === 'B2B') {
        return `Você é o Assessor Corporativo de Expansão e Sucesso da WINF™ PARTNERS.
Seu estilo é executivo, visionário, tecnológico e implacável em gerar negócios. Não foque em vender películas soltas, foque em vender o ECOSSISTEMA.
PÚBLICO-ALVO: Instaladores, Lojistas, Arquitetos, Investidores e Franqueados Atuais (B2B).

DIRETRIZES TÁTICAS (FLUXO PARTNER B2B):
1. ABERTURA E POSICIONAMENTO:
Se o cliente iniciar ou perguntar quem é, posicione-se firmemente: "Sou o comando corporativo Winf™ Partners. Auxilio no direcionamento do ecossistema. Para ser cirúrgico, qual seu perfil hoje? (Instalador/Arquiteto/Investidor)".

2. DIRECIONAMENTO POR PERFIL:
--> SE O CLIENTE FOR INSTALADOR OU LOJISTA:
"Excelente perfil 👍 Aplicadores de alta performance precisam de duas coisas: Tecnologia (como os nossos produtos com Nanotecnologia Avançada) e Fluxo de Clientes. O modelo Winf rastreia leads na sua região e direciona para o seu CRM (Winf Capture), além de ensinar seu time pelo Módulo Academy. Posso te apresentar nosso modelo de licenciamento?"

--> SE O CLIENTE FOR ARQUITETO:
"Nós falamos a sua língua 👍 Trabalhamos com Blindagem Térmica Arquitetônica de prestígio. Nossas células moleculares bloqueiam até 99% do UV e baixam drasticamente as calorias do ambiente (TSER avançado). Posso estruturar um PDF com as especificações técnicas e te explicar nosso formato de comissionamento de projetos?"

--> SE TEM INTERESSE EM FRANQUIA/INVESTIR:
"Ótima visão 👍 O modelo de franquia Winf é focado em alta tecnologia e recorrência. Nós geramos a demanda pelo nosso motor de IA e as franquias executam com excelência. Todo o treinamento está embarcado na Winf Academy. Gostaria de entender nossa previsão de ROI e agendar uma reunião executiva?"

--> SE JÁ É PARCEIRO DA WINF:
"Bem-vindo de volta ao centro de comando, parceiro de Elite 👍! Como posso suportar sua operação hoje? Precisa de reposição via WinfStock, falar sobre missões pontuais no W-Rank ou suporte técnico?"

3. FECHAMENTO B2B CONDUZIDO:
Se o parceiro mostrar interesse, não pergunte "quer ver?". Aja rápido e executivo: "Se fizer sentido pro seu negócio, vou registrar seu perfil e já peço pro nosso Diretor Executivo agendar uma call de 15 min com você. Qual seria o melhor horário amanhã?"

4. FERRAMENTAS ('tool_gerar_pdf'):
Você pode fornecer um PDF de proposta corporativa (se solicitado investimento ou dados).
Sempre seja direto. Não cite IA.`;
    }

    return `Você é Ralph, especialista em películas premium da Winf™.

Seu objetivo é:
- Entender rapidamente o cliente
- Identificar necessidade (residencial, automotivo, comercial)
- Solicitar fotos e medidas
- Sugerir soluções ideais
- Preparar proposta
- Conduzir para fechamento

Regras:
- Seja direto e profissional
- Sempre peça foto e medidas quando necessário
- Sempre ofereça enviar opções + proposta
- Nunca deixe a conversa morrer
- Use linguagem natural e humana

Frases-chave obrigatórias:
- "Vou te enviar algumas opções ideais"
- "Vou preparar uma proposta completa pra você"

DIRETRIZES DO FLUXO:
Etapa 1 (Abertura): Já feita. Identificar o tipo do projeto.
Etapa 2 (Qualificação): Descobrir a dor principal (calor, privacidade, estética, segurança).
Etapa 3 (Ação Principal): Pedir foto e medidas ("Se puder, me envie uma foto do local e as medidas aproximadas (largura x altura) — assim já te passo tudo bem assertivo").
Etapa 4/5 (Processamento e Sugestão): Quando o cliente passar medidas, calcule a área mentalmente e sugira opções (Nano Cerâmica, Nano Carbono, Privacidade).
Etapa 6 (Proposta): Ofereça o PDF e descreva os itens. Acione 'tool_gerar_pdf'.
Etapa 7 (Fechamento): Diga "Quer que eu já reserve um horário pra você?" ou repasse as informações pro Franqueado via 'tool_encaminhar_franqueado'.`;
  };

  const handleToolExecution = async (toolCall: any) => {
    const { name, input } = toolCall;
    
    if (name === 'tool_gerar_pdf') {
      const msg = `[PDF GERADO] Proposta Comercial - ${input.clienteNome}.pdf\nProjeto: ${input.veiculoOuProjeto}\nPelícula: ${input.peliculaRecomendada}\nInvestimento Estimado: R$ ${input.valorEstimado}`;
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'system', text: msg }]);
      
      // Also register in CRM
      try {
        await addDoc(collection(db, 'quotes'), {
           customerName: input.clienteNome,
           status: 'Enviado (WhatsApp)',
           totalAmount: input.valorEstimado,
           createdAt: serverTimestamp()
        });
      } catch (e) {}

      return "Proposta em PDF foi enviada ao cliente com sucesso. Diga ao cliente para conferir e pergunte se quer agendar.";
    }

    if (name === 'tool_encaminhar_franqueado') {
      const msg = `[SISTEMA] Lead [${input.clienteNome} - ${input.cidade}] transferido com sucesso para a unidade local.\nResumo: ${input.resumoAtendimento}`;
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'system', text: msg }]);
      
      try {
        await addDoc(collection(db, 'leads'), {
           name: input.clienteNome,
           city: input.cidade,
           status: 'Transferido',
           source: 'WhatsApp Central',
           createdAt: serverTimestamp()
        });
      } catch (e) {}

      return "Lead encaminhado com sucesso. Avise o cliente que a unidade da cidade dele entrará em contato em instantes e encerre o chat de forma premium e educada.";
    }

    return "Ação completada.";
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const sysPrompt = generatePrompt();
      // Generate standard message history for Gemini memory
      const history = messages.filter(m => m.role !== 'system').map(m => `${m.role === 'user' ? 'Cliente' : 'Consultor WINF'}: ${m.text}`).join('\n');
      const finalPrompt = `Histórico da conversa:\n${history}\nCliente: ${userText}\n\nResponda como o Consultor WINF. Se precisar usar ferramenta, use.`;

      const response = await generateGeminiResponse(finalPrompt, sysPrompt, GEMINI_WHATSAPP_TOOLS);

      const logToDB = async (text: string) => {
        if (user?.id && !user.id.startsWith('proto-')) {
          await addDoc(collection(db, 'agent_logs'), {
            user_id: user.id,
            agentType: mode === 'B2C' ? 'Lead Capture & Sales (B2C)' : 'Partner Assistance (B2B)',
            action: 'Nova Interação',
            details: text,
            created_at: serverTimestamp()
          });
        }
      };

      if (response.toolCalls && response.toolCalls.length > 0) {
        for (const tool of response.toolCalls) {
          const result = await handleToolExecution(tool);
          if (response.text) {
             setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', text: response.text }]);
             await logToDB(response.text);
          }
          const followUp = await generateGeminiResponse(`Você executou a ferramenta ${tool.name}. O resultado foi: ${result}. Dê a resposta final ao cliente no WhatsApp.`, sysPrompt);
          if (followUp.text) {
            setMessages(prev => [...prev, { id: (Date.now() + 2).toString(), role: 'ai', text: followUp.text }]);
            await logToDB(followUp.text);
          }
        }
      } else if (response.text) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: response.text }]);
        await logToDB(response.text);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'system', text: "Erro ao processar mensagem no agente." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-[#0b141a] rounded-none border border-white/10 overflow-hidden flex flex-col h-[600px] shadow-2xl relative">
      <div className="absolute top-0 right-0 z-50 flex bg-black/60 backdrop-blur-md rounded-none-bl-2xl border-b border-l border-white/5 overflow-hidden">
        <button 
          onClick={() => setMode('B2C')}
          className={`px-4 py-2 text-xs md:text-[10px] font-bold uppercase tracking-widest transition-all ${mode === 'B2C' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
        >
          Cliente Final
        </button>
        <button 
          onClick={() => setMode('B2B')}
          className={`px-4 py-2 text-xs md:text-[10px] font-bold uppercase tracking-widest transition-all ${mode === 'B2B' ? 'bg-winf-aerocore_blue text-black' : 'text-white/40 hover:text-white'}`}
        >
          Winf Partners (B2B)
        </button>
      </div>
      
      {/* Header WhatsApp Style */}
      <div className="bg-[#202c33] p-4 pt-6 flex items-center gap-4">
        <div className={`w-10 h-10 rounded-none flex items-center justify-center ${mode === 'B2C' ? 'bg-white' : 'bg-winf-aerocore_blue'}`}>
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold flex items-center gap-2">
            {mode === 'B2C' ? 'Central de Vendas WINF™' : 'Corporativo WINF™ Partners'}
            <CheckCircle2 size={14} className={mode === 'B2C' ? 'text-white' : 'text-winf-aerocore_blue'} />
          </h3>
          <p className="text-[#8696a0] text-xs pb-1">{mode === 'B2C' ? 'bot powered by Gemini' : 'partner core system'}</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#efeae2]/5 custom-scrollbar bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover bg-center bg-blend-overlay">
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'system' ? (
              <div className="bg-[#182229] border border-winf-primary/30 text-white text-xs p-3 rounded-none max-w-[80%] my-2 mx-auto shadow-lg flex items-start gap-2 font-mono">
                <FileText size={14} className="shrink-0 mt-0.5" />
                <span className="whitespace-pre-wrap">{msg.text}</span>
              </div>
            ) : (
              <div className={`max-w-[80%] p-3 rounded-none text-sm ${msg.role === 'user' ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none' : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'} shadow text-left relative`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <div className="text-xs md:text-[10px] text-right mt-1 opacity-60 flex justify-end items-center gap-1">
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  {msg.role === 'user' && <CheckCircle2 size={12} className="text-[#53bdeb]" />}
                </div>
              </div>
            )}
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#202c33] p-3 rounded-none rounded-tl-none shadow flex items-center gap-2">
               <Loader2 size={14} className="animate-spin text-[#8696a0]" />
               <span className="text-[#8696a0] text-xs">digitando...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="bg-[#202c33] p-3 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ligue como o cliente..."
          className="flex-1 bg-[#2a3942] text-[#e9edef] rounded-none px-4 py-3 text-sm focus:outline-none placeholder:text-[#8696a0]"
          disabled={isTyping}
        />
        <button
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          className="w-12 h-12 bg-[#00a884] hover:bg-[#008f6f] rounded-none flex items-center justify-center text-white transition-colors disabled:opacity-50"
        >
          <Send size={20} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppAgentSimulator;
