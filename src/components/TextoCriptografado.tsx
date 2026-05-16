
import React, { useState, useEffect } from 'react';

interface TextoCriptografadoProps {
  text: string;
  onRevealComplete?: () => void;
}

const TextoCriptografado: React.FC<TextoCriptografadoProps> = ({ text, onRevealComplete }) => {
  const [displayText, setDisplayText] = useState('');
  // Caracteres aleatórios para o embaralhamento, conforme solicitado (@#$%)
  const chars = "@#$%"; 

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          // Se a letra for um espaço, mantém o espaço
          if (letter === ' ') return ' '; 
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );

      // Aumenta a iteração gradualmente para revelar o texto
      // Ajuste o `1 / X` para controlar a velocidade de revelação por caractere
      // Ex: 1/2 significa que 1 caractere é revelado a cada 2 ticks do intervalo
      iteration += 1 / 2; 

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text); // Garante que o texto final seja o correto
        if(onRevealComplete) onRevealComplete();
      }
    }, 20); // Intervalo de 20ms para uma animação suave
    return () => clearInterval(interval);
  }, [text, onRevealComplete]);

  return <span className="font-mono text-white/40/80 tracking-wide">{displayText}</span>;
};

export default TextoCriptografado;
