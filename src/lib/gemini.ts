import { GoogleGenAI, Type } from '@google/genai';

export const getApiKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.warn("GEMINI_API_KEY is not defined in the environment.");
  }
  return key || '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

// Tools will be passed directly in the new format
export async function generateGeminiResponse(
  prompt: string, 
  systemPrompt: string, 
  tools?: any[]
): Promise<{ text: string, toolCalls?: any[] }> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        tools: tools && tools.length > 0 ? [{ functionDeclarations: tools }] : undefined,
        temperature: 0.2, // precise agent
      }
    });
    
    const text = response.text || '';
    const toolCalls: any[] = [];
    
    if (response.functionCalls && response.functionCalls.length > 0) {
      for (const call of response.functionCalls) {
        toolCalls.push({
          id: Math.random().toString(36).substring(7),
          name: call.name,
          input: call.args
        });
      }
    }
    
    return { text, toolCalls };
  } catch (error) {
    console.error("Gemini API Background Error:", error);
    return { text: 'ERRO DE CONEXÃO NEURAL. FALHA NA INTEGRAÇÃO COM GEMINI.' };
  }
}

