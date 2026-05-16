import React, { useEffect, useRef } from 'react';
import { useWinf } from '../contexts/WinfContext';
import { generateGeminiResponse } from '../lib/gemini';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { differenceInDays } from 'date-fns';

/**
 * This component runs invisibly in the background.
 * It monitors state changes and triggers Gemini automations.
 */
const AgentAutomationsEngine: React.FC = () => {
  const { user, stockItems, leads, quotes, agentInsights } = useWinf();
  
  // Use refs to prevent infinite loops during hot reloads or rapid state changes
  const processedEntities = useRef<Set<string>>(new Set());

  const processingRef = useRef(false);

  useEffect(() => {
    if (!user?.id || user.id.startsWith('proto-') || processingRef.current) return;

    const runAutomations = async () => {
      processingRef.current = true;
      try {
        // 1. Estoque baixo → Gemini detecta e envia alerta + sugere pedido automático
        const lowStockItems = stockItems.filter(s => s.remaining_meters <= 5);
        for (const item of lowStockItems) {
          const insightKey = `STOCK_ALERT_${item.id}`;
          if (!processedEntities.current.has(insightKey) && !agentInsights.some(i => i.related_entity_id === item.id && i.type === 'STOCK_ALERT')) {
            processedEntities.current.add(insightKey);
            
            const prompt = `O parceiro ${user.name} está com estoque baixo do produto ${item.product_name} (apenas ${item.remaining_meters} metros restantes). Gere um alerta curto e direto sugerindo um pedido de reposição.`;
            const system = "Você é o WINF CORE AI, o assistente proativo do parceiro. Seja direto, profissional e focado em vendas.";
            
            const response = await generateGeminiResponse(prompt, system);
            if (response.text) {
              await addDoc(collection(db, 'agent_insights'), {
                user_id: user.id,
                type: 'STOCK_ALERT',
                title: `Estoque Crítico: ${item.product_name}`,
                content: response.text,
                related_entity_id: item.id,
                is_read: false,
                created_at: serverTimestamp()
              });
            }
          }
        }

        // 2. Lead novo → Gemini analisa o perfil e gera roteiro de abordagem personalizado no WhatsApp
        const newLeads = leads.filter(l => l.status === 'Novo');
        for (const lead of newLeads) {
          const insightKey = `LEAD_SCRIPT_${lead.id}`;
          if (!processedEntities.current.has(insightKey) && !agentInsights.some(i => i.related_entity_id === lead.id && i.type === 'LEAD_SCRIPT')) {
            processedEntities.current.add(insightKey);
            
            const prompt = `Um novo lead chegou: Nome: ${lead.name}, Interesse: ${lead.interest}, Origem: ${lead.source}. Gere um roteiro de abordagem curto e persuasivo para o WhatsApp, focado em conversão.`;
            const system = "Você é o WINF SALES AI, especialista em conversão de leads automotivos e arquitetônicos.";
            
            const response = await generateGeminiResponse(prompt, system);
            if (response.text) {
              await addDoc(collection(db, 'agent_insights'), {
                user_id: user.id,
                type: 'LEAD_SCRIPT',
                title: `Roteiro de Abordagem: ${lead.name}`,
                content: response.text,
                related_entity_id: lead.id,
                is_read: false,
                created_at: serverTimestamp()
              });
            }
          }
        }

        // 3. Orçamento enviado há 3 dias sem resposta → Gemini gera mensagem de follow-up automática
        const pendingQuotes = quotes.filter(q => q.status === 'Enviado' && differenceInDays(new Date(), new Date(q.createdAt)) >= 3);
        for (const quote of pendingQuotes) {
          const insightKey = `QUOTE_FOLLOWUP_${quote.id}`;
          if (!processedEntities.current.has(insightKey) && !agentInsights.some(i => i.related_entity_id === quote.id && i.type === 'QUOTE_FOLLOWUP')) {
            processedEntities.current.add(insightKey);
            
            const prompt = `O orçamento para ${quote.customerName} no valor de R$ ${quote.totalAmount} foi enviado há mais de 3 dias e ainda não teve resposta. Gere uma mensagem de follow-up educada e persuasiva para o WhatsApp.`;
            const system = "Você é o WINF SALES AI, especialista em fechamento de vendas.";
            
            const response = await generateGeminiResponse(prompt, system);
            if (response.text) {
              await addDoc(collection(db, 'agent_insights'), {
                user_id: user.id,
                type: 'QUOTE_FOLLOWUP',
                title: `Follow-up Necessário: ${quote.customerName}`,
                content: response.text,
                related_entity_id: quote.id,
                is_read: false,
                created_at: serverTimestamp()
              });
            }
          }
        }

        // 4. Meta mensal em risco (Simulated logic based on mid-month and low sales)
        const currentDay = new Date().getDate();
        const totalSales = quotes.filter(q => q.status === 'Aprovado').reduce((acc, q) => acc + q.totalAmount, 0);
        if (currentDay > 15 && totalSales < 5000) { // Arbitrary threshold for prototype
          const insightKey = `GOAL_RISK_${new Date().getMonth()}`;
          if (!processedEntities.current.has(insightKey) && !agentInsights.some(i => i.type === 'GOAL_RISK')) {
            processedEntities.current.add(insightKey);
            
            const prompt = `Estamos no dia ${currentDay} do mês e as vendas aprovadas do parceiro ${user.name} estão em apenas R$ ${totalSales}. A meta mensal está em risco. Gere um alerta motivacional e sugira 2 ações comerciais rápidas para reverter o cenário.`;
            const system = "Você é o WINF DATA AI, diretor comercial estratégico da rede.";
            
            const response = await generateGeminiResponse(prompt, system);
            if (response.text) {
              await addDoc(collection(db, 'agent_insights'), {
                user_id: user.id,
                type: 'GOAL_RISK',
                title: `Alerta Estratégico: Meta em Risco`,
                content: response.text,
                is_read: false,
                created_at: serverTimestamp()
              });
            }
          }
        }

        // 5. Novo parceiro cadastrado → Gemini envia sequência de onboarding automática
        if (quotes.length === 0 && stockItems.length === 0) {
          const insightKey = `ONBOARDING_${user.id}`;
          if (!processedEntities.current.has(insightKey) && !agentInsights.some(i => i.type === 'ONBOARDING')) {
            processedEntities.current.add(insightKey);
            
            const prompt = `O parceiro ${user.name} acabou de entrar na rede WINF e ainda não tem vendas ou estoque registrado. Gere uma mensagem de boas-vindas empolgante e sugira os 3 primeiros passos que ele deve dar no sistema.`;
            const system = "Você é o WINF CONCIERGE AI, responsável pelo sucesso do parceiro (Customer Success).";
            
            const response = await generateGeminiResponse(prompt, system);
            if (response.text) {
              await addDoc(collection(db, 'agent_insights'), {
                user_id: user.id,
                type: 'ONBOARDING',
                title: `Bem-vindo à WINF, ${user.name}!`,
                content: response.text,
                is_read: false,
                created_at: serverTimestamp()
              });
            }
          }
        }

      } finally {
        processingRef.current = false;
      }
    };

    const timer = setTimeout(() => {
      runAutomations();
    }, 15000); // Increased delay to 15s to allow for full data load and prevent spam on mount

    return () => clearTimeout(timer);
  }, [user, stockItems, leads, quotes, agentInsights]);

  return null; // This component does not render anything
};

export default AgentAutomationsEngine;
