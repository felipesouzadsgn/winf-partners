import fs from 'fs';

const path = './src/contexts/WinfContext.tsx';
let content = fs.readFileSync(path, 'utf8');

const newDocs = `        {
          id: 'doc-apresentacao-comercial',
          title: 'Apresentação Comercial Winf™',
          category: 'Estratégia',
          required_plan: 'nivel1',
          content: \`# APRESENTAÇÃO COMERCIAL DA FRANQUIA WINF™
## O Ecossistema de Franquias para Liderar o Futuro da Proteção e do Conforto.

### Seja um Líder. Seja Winf™.
A Oportunidade de Franquia com Modelo de Negócio Validado.

### Fundada sobre Experiência. Construída para o Futuro.
"A Winf™ não nasceu de uma teoria. Ela é o resultado de 30 anos de experiência no mercado de alta performance, fundada por mim, Tiago Augusto Correa. Unimos décadas de know-how com uma visão inovadora para criar um negócio que não apenas atende, mas define o futuro do nosso setor. Não estamos vendendo uma franquia; estamos convidando parceiros para escalar um sucesso comprovado."
- Tiago Augusto Correa, CEO & Chief Vision Officer

### Nosso Maior Argumento: Resultados Reais.
Antes de nos tornarmos uma franquia, fomos nosso próprio caso de sucesso. Nossa unidade piloto em Santos-SP, operando com um modelo de negócio enxuto e inovador:
- Faturamento Médio: R$ 300.000 / ano.
- Operação Otimizada: Atendimento 100% digital e aplicações apenas 4 dias por semana.
- Estrutura Enxuta: Gestão de técnicos parceiros autônomos.
- Marketing Eficaz: Captação de clientes premium via Instagram.

### Um Mercado em Aquecimento. Literalmente.
O mundo busca, mais do que nunca, conforto e eficiência. Com um modelo de negócio validado que prospera em um mercado aquecido, a Winf™ oferece uma oportunidade única para quem busca uma operação lucrativa e com forte posicionamento de marca.

### Não Vendemos Películas. Entregamos Resultados.
A Winf™ é um ecossistema de tecnologia e serviços projetado para entregar o que o cliente realmente deseja: Conforto em sua casa e Performance em seu carro. Fazemos isso através de dois modelos de franquia distintos e sinérgicos.

### O Kiosk: Seu Showroom de Vendas Arquitetônicas.
- Conceito: Um hub de consultoria e vendas de alto impacto, focado na Vertical Arquitetônica.
- Missão: Vender projetos de aplicação de películas para residências e escritórios.
- Perfil do Franqueado: O Vendedor. Foco em relacionamento e vendas consultivas.

### O Studio: Seu Ateliê de Performance Automotiva.
- Conceito: O centro de excelência técnica para aplicação da Vertical Automotiva.
- Missão: Entregar a aplicação perfeita das linhas AeroCore™ e NeoSkin™ PPF.
- Perfil do Franqueado: O Artista. Foco na perfeição técnica e na paixão automotiva.

### Você é o Dono do Negócio. Mas Nunca Estará Sozinho.
Oferecemos suporte completo em Implantação, Treinamento intensivo na Winf Ascend™, Marketing de alto padrão e a transferência de um modelo de Gestão já validado.\`,
          access_role: 'Member',
          created_at: new Date('2026-05-04').toISOString()
        },
        {
          id: 'doc-brand-book-winf',
          title: 'Brand Book Winf™ - Alma da Excelência',
          category: 'Marca',
          required_plan: 'nivel1',
          content: \`# BRAND BOOK WINF™
## A Alma da Excelência: O Guia da Marca Winf™

### 1: Nossa Essência
- Visão: Ser a marca global sinônimo de inteligência, proteção e valorização de superfícies.
- Missão: Oferecer soluções tecnológicas de ponta através de um ecossistema de parceiros de elite.
- Pilares: Excelência Obsessiva, Tecnologia Invisível, Design como Filosofia, Parceria de Elite.
- Arquétipo: O Sábio + O Mago.

### 2: Nossa Identidade Verbal
- Tom de Voz: Confiante, Sofisticado, Educacional.
- Vocabulário: Preferimos "Solução", "Investimento". Evitamos "Peliculinha", "Barato".
- Slogans Oficiais:
  - Winf™. Proteção que se vê. Tecnologia que se sente.
  - Architectural: O mesmo vidro. Uma nova percepção.
  - Automotive: AeroCore™. Invisível, mas indispensável.

### 3: Nossa Identidade Visual
- O Logo: O símbolo minimalista e premium.
- Paleta de Cores: 
  - Preto Winf™ (#000000) - Sofisticação, exclusividade
  - Branco Puro (#FFFFFF) - Clareza, limpeza
  - Azul AeroCore™ (#0057FF) - Tecnologia, performance
  - Verde Winf Ascend™ (#ADFF2F) - Crescimento, energia
  - Cinza Grafite (#222222) / Cinza Claro (#F3F4F6) - Neutralidade
- Tipografia: Montserrat (Títulos/Destaques), Open Sans (Textos Corridos).
- Estilo Fotográfico: Iluminação dramática, alto contraste, arquitetura moderna, estúdios industriais, postura profissional.\`,
          access_role: 'Member',
          created_at: new Date('2026-05-04').toISOString()
        },
        {
          id: 'doc-catalogo-arch',
          title: 'Catálogo Comercial - Architectural',
          category: 'Operacional',
          required_plan: 'nivel1',
          content: \`# CATÁLOGO COMERCIAL - WINF™ ARCHITECTURAL
## O mesmo vidro. Uma nova percepção.

### Manifesto
A Tecnologia Não Precisa Ser Vista. Precisa Ser Sentida.
A Winf™ transforma ambientes em santuários de conforto, privacidade e eficiência, filtrando o que há de ruim no sol e deixando entrar apenas o melhor: a luz.

### Linha INVISIBLE™
- Climatização Invisível. Clareza Absoluta.
- Foco em manter a luz natural, bloquear o calor extremo e proteger os móveis do desbotamento.

### Linha DUAL REFLECT™
- Privacidade Inteligente. Dia e Noite.
- Privacidade diurna bloqueando a visão externa, sem o "efeito espelho" indesejado no período noturno.

### Linha BLACKPRO™
- Conforto Visual. Estilo Sofisticado.
- Focado na redução drástica de brilho em telas (TVs/Monitores) e acabamento fumê elegante de alto padrão.

### Benefícios Universais e Garantia
- Segurança, Saúde e Economia em Cada Janela.
- Proteção anti-estilhaço em caso de quebra, bloqueio severo de Raios UV (antienvelhecimento e proteção à pele), redução do uso de ar condicionado.
- Selo de Garantia Winf™: Instalação por Especialistas Certificados Winf Ascend™.\`,
          access_role: 'Member',
          created_at: new Date('2026-05-04').toISOString()
        },
        {
          id: 'doc-catalogo-auto',
          title: 'Catálogo Comercial - Automotive',
          category: 'Operacional',
          required_plan: 'nivel1',
          content: \`# CATÁLOGO COMERCIAL - WINF™ AUTOMOTIVE
## AeroCore™. Invisível, mas indispensável.

### Manifesto
Engenharia de Ponta. Execução de Mestre.
Pela paixão pela alta performance e proteção das verdadeiras obras de arte da engenharia global.

### Linha AeroCore™ - Películas de Performance
- A Engenharia do Conforto.
- Explicando a tecnologia de nanocerâmica, com índices absurdos de rejeição de calor e barreira de proteção UV definitiva.
- Invisible Series / Performance Series.

### Linha NeoSkin™ PPF (Paint Protection Film)
- A Armadura Invisível.
- Proteção anti-impacto (pedras, detritos), tecnologia self-healing (regeneração de riscos ao calor) e acabamento hidrofóbico.

### Pacotes de Serviço e Aplicação
- Proteção Sob Medida para Sua Necessidade.
- Kit Frontal (High Impact) vs Full Body (Proteção Completa do chassi).
- Selo de Qualidade: "Aplicação Artesanal. Realizada apenas por Mestres Aplicadores Certificados Winf Ascend™."

### A Experiência do Studio
- Mais que um Serviço. Uma Experiência.
- O processo consultivo premium e a execução obsessiva por detalhes em nossos ateliês de performance Winf™ Studio.\`,
          access_role: 'Member',
          created_at: new Date('2026-05-04').toISOString()
        },
        {
          id: 'doc-playbook-kiosk',
          title: 'Playbook do Kiosk Winf™',
          category: 'Operacional',
          required_plan: 'nivel2',
          content: \`# MANUAL OPERACIONAL DO KIOSK WINF™
## O Guia para Transformar Interações em Projetos de Valor.

### 1: A Missão do Consultor de Experiência
- Você Não é um Vendedor. Você é um Arquiteto de Soluções.
- Seus pilares: Embaixador, Especialista, Apresentador.

### 2: Rotinas de Excelência: O Dia a Dia da Operação
- A Excelência Mora nos Detalhes: Checklist de abertura rigoroso.
- A Postura Proativa: Encante e convide; não fique estático no balcão.

### 3: O Domínio do Produto (Arquitetônica)
- Você Vende Conforto, Privacidade e Economia.
- Domine INVISIBLE™, DUAL REFLECT™, BLACKPRO™.
- Argumentos universais: Segurança, Garantia e Valorização Imobiliária.

### 4: A Jornada do Cliente: Venda Consultiva em 5 Passos
- Vender é um roteiro ensaiado, não improviso.
- Passos: Conexão, Diagnóstico, Apresentação da Solução, Oferta de Valor e Ação (Fechamento).

### 5: Ferramentas de Engajamento
- Não Apenas Fale. Mostre. Faça Sentir.
- O Demonstrador Térmico: A prova irrefutável do calor vs nanocerâmica.
- O Simulador Escape3D/VR ou Tablet interativo.

### 6: Gestão e Performance
- O que não se mede, não se gerencia.
- Acompanhar SLAs: Abordagens, Leads, Agendamentos, Taxa de Conversão, Ticket Médio.\`,
          access_role: 'Licenciado',
          created_at: new Date('2026-05-04').toISOString()
        },
        {
          id: 'doc-manual-master',
          title: 'Manual Mestre Winf™ Premium',
          category: 'Estratégia',
          required_plan: 'nivel2',
          content: \`# MANUAL MESTRE DA WINF™ PREMIUM QUALITY WINDOWFILM

### 1. Visão Geral da Marca
Winf™ é uma marca brasileira de películas para controle solar com o conceito “Do Brasil para o Mundo”. Nosso foco está na tecnologia avançada, sustentabilidade, economia de energia e conforto térmico para criar ambientes mais frescos, reduzindo o uso de ar condicionado e promovendo um planeta mais sustentável.

### 2. Valores da Marca
- Sustentabilidade: Reduzir o impacto ambiental.
- Inovação tecnológica: Uso de nano cerâmica e materiais avançados.
- Qualidade premium: Alta durabilidade, garantia (5 a 10 anos).
- Brasil para o Mundo: Orgulho nacional, visão global.
- Foco no cliente: Impacto positivo na vida das pessoas.

### 3. Tom de Voz e Linguagem
Profissional, mas acessível. Positivo, motivacional e inspirador. Direto ao ponto e altamente focado na inovação, tecnologias de futuro e impacto ambiental.\`,
          access_role: 'Licenciado',
          created_at: new Date('2026-05-04').toISOString()
        }`;

const startIndex = content.indexOf('setDocumentItems([');
const endIndex = content.indexOf(']);', startIndex) + 3;

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = content.substring(0, startIndex) + `setDocumentItems([\n${newDocs}\n      ]);` + content.substring(endIndex);
  fs.writeFileSync(path, newContent, 'utf8');
  console.log('Successfully updated the documents array.');
} else {
  console.error('Could not find the target content to replace.');
}
