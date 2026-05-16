import { jsPDF } from 'jspdf';

export const generateCommercialDeckPDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Background
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, pageWidth, 297, 'F');

  // Header
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('WINF™', 20, 30);
  
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'normal');
  doc.text('BUSINESS DECK & MANIFESTO_ 2026', 20, 38);

  doc.setDrawColor(255, 255, 255);
  doc.line(20, 45, pageWidth - 20, 45);

  let yPos = 60;

  const addSection = (title: string, subtitle: string, whatIsIt: string, whatItDoes: string, hiddenAdvantage: string, financial: string) => {
    if (yPos > 230) {
      doc.addPage();
      doc.setFillColor(10, 10, 10);
      doc.rect(0, 0, pageWidth, 297, 'F');
      yPos = 30;
    }

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 20, yPos);
    
    doc.setTextColor(249, 115, 22); // orange-500
    doc.setFontSize(10);
    doc.text(subtitle.toUpperCase(), 20, yPos + 6);

    yPos += 15;
    
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('O que é: ', 20, yPos);
    doc.setFont('helvetica', 'normal');
    const whatIsSplit = doc.splitTextToSize(whatIsIt, pageWidth - 45);
    doc.text(whatIsSplit, 38, yPos);
    yPos += (whatIsSplit.length * 5) + 5;

    doc.setFont('helvetica', 'bold');
    doc.text('O que faz: ', 20, yPos);
    doc.setFont('helvetica', 'normal');
    const whatItDoesSplit = doc.splitTextToSize(whatItDoes, pageWidth - 45);
    doc.text(whatItDoesSplit, 42, yPos);
    yPos += (whatItDoesSplit.length * 5) + 5;

    doc.setFont('helvetica', 'bold');
    doc.text('Vantagem: ', 20, yPos);
    doc.setFont('helvetica', 'normal');
    const advantageSplit = doc.splitTextToSize(hiddenAdvantage, pageWidth - 45);
    doc.text(advantageSplit, 42, yPos);
    yPos += (advantageSplit.length * 5) + 5;

    doc.setFont('helvetica', 'bold');
    doc.text('Ganhos: ', 20, yPos);
    doc.setFont('helvetica', 'normal');
    const financialSplit = doc.splitTextToSize(financial, pageWidth - 45);
    doc.text(financialSplit, 38, yPos);
    yPos += (financialSplit.length * 5) + 10;

    doc.setDrawColor(50, 50, 50);
    doc.line(20, yPos, pageWidth - 20, yPos);
    yPos += 15;
  };

  // Section
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('A HIERARQUIA DE PODER WINF™', 20, yPos);
  yPos += 15;

  addSection(
    'ASSET LIGHT™ (Nível 01)',
    'Acesso Estratégico & Consultoria',
    'O portal de entrada para o ecossistema WINF™ PARTNERS. Feito para profissionais ágeis que buscam escalabilidade com baixo investimento estrutural.',
    'Proporciona Gestão Completa via WINF OS™, Diagnóstico Digital (Winf Precision) e um pacote de Marketing de Geração de Leads diretamente para o WhatsApp do licenciado.',
    'Acesso à marca premium sem necessidade de ponto comercial físico caro. Operação altamente digitalizada com "Asset Light".',
    'Faturamento estimado de R$ 15.000 a R$ 65.000 mensais dependendo da capacidade de execução regional. Alta margem (75%).'
  );

  addSection(
    'HIGH VELOCITY™ / KIOSK MODE (Nível 02)',
    'O Tactical Hub de Alta Rotação',
    'Um ponto de contato imersivo, desenhado para dominar shoppings Classe A, aeroportos ou galerias de luxo através de módulos compactos.',
    'Atração de clientes em massa com Totem Imersivo VR / Térmico. Venda recorrente e de impulso de acessórios automotivos/pessoais Winf™ e leads para instalação.',
    'Autoridade física esmagadora imediata frente a concorrentes. Visibilidade para a marca e Fast Payback aproveitando o "tráfego rico" dos shoppings.',
    'Ticket médio forte em acessórios (R$ 450) + captação de projetos maiores de veículos e arquitetura de alto padrão.'
  );

  addSection(
    'TOTAL AUTHORITY™ / FLAGSHIP AEROCORE™ (Nível 03)',
    'A Experiência Elite',
    'O padrão ouro absoluto. Estabelece um Centro Estético Automotivo Elite & Showroom Integrado focado no público ultra-high-end.',
    'Operação que atua como hub de serviço de extrema qualidade técnica, com atendimento premium focado na linha AeroCore™ eximindo o licenciado da guerra de preços.',
    'Dominação inquestionável de território. O parceiro dita as regras e atrai os supercarros e mansões da região, e participa do Equity Universe Winf™.',
    'Faturamento projetado para as faixas de R$ 150.000 a mais de R$ 750.000 mensais. Imunidade à concorrência com margens altíssimas.'
  );

  doc.save('WINF_Apresentacao_Comercial_2026.pdf');
};
