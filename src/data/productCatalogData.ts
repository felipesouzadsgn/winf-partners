export interface ProductCatalogData {
  id: string;
  name: string;
  badge: string;
  subname: string;
  category: 'arch' | 'auto' | 'marine' | 'aero';
  line: 'select' | 'aerocore' | 'neoskin';
  image: string;
  shortDescription: string;
  fullDescription: string;
  keyMetrics: {
    ir: string;
    uv: string;
    tser: string;
    warranty: string;
    thickness?: string;
  };
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  specs: {
    vlt: string;
    irer: string;
    tsr: string;
    thickness: string;
    material: string;
    glareReduction: string;
  };
}

export const PRODUCT_CATALOG: ProductCatalogData[] = [
  // ==========================================
  // WINF SELECT (ARQUITETURA)
  // ==========================================
  {
    id: 'select-invisible',
    name: 'Winf Select™ Invisible',
    subname: 'Máxima Transparência e Controle Térmico',
    badge: 'O PODER INVISÍVEL',
    category: 'arch',
    line: 'select',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2072',
    shortDescription: 'Transparência cristalina com bloqueio térmico absoluto.',
    fullDescription: 'Aeronáutica e Nanocerâmica fundidas. A película Invisible oferece proteção térmica de ponta sem alterar a fachada original do projeto arquitetônico.',
    keyMetrics: { ir: 'Até 86%', uv: '99%', tser: 'Até 60%', warranty: '10 Anos' },
    benefits: [
      { title: 'Visão Pura', description: 'Transparência impecável que mantém a estética original.', icon: 'Eye' },
      { title: 'Bloqueio IR Constante', description: 'Nanocerâmica que intercepta as ondas de calor de forma invisível.', icon: 'Sun' }
    ],
    specs: { vlt: '70-80%', irer: '0%', tsr: '0%', thickness: '1.5 Mil', material: 'Nanocerâmica', glareReduction: '15%' }
  },
  {
    id: 'select-dualreflect',
    name: 'Winf Select™ Dual Reflect',
    subname: 'Controle de Privacidade Espelhada',
    badge: 'ESTÉTICA CORPORATIVA',
    category: 'arch',
    line: 'select',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400',
    shortDescription: 'Reflexão espelhada calibrada com máxima rejeição térmica.',
    fullDescription: 'O equilíbrio perfeito entre a privacidade do reflexo diurno e a redução severa de ofuscamento solar. Essencial para lajes corporativas.',
    keyMetrics: { ir: 'Até 81%', uv: '99%', tser: 'Até 82%', warranty: '10 Anos' },
    benefits: [
      { title: 'Privacidade Diurna', description: 'Visão bloqueada de fora para dentro com alto reflexo.', icon: 'Eye' },
      { title: 'Corte de Ofuscamento', description: 'Remove os reflexos em telas de computadores nos escritórios.', icon: 'Sun' }
    ],
    specs: { vlt: '15-35%', irer: '0%', tsr: '0%', thickness: '1.5 Mil', material: 'Metalizada Dupla', glareReduction: '85%' }
  },
  {
    id: 'select-blackpro',
    name: 'Winf Select™ BlackPro',
    subname: 'Privacidade Escura Avançada',
    badge: 'BLACKOUT ESTÉTICO',
    category: 'arch',
    line: 'select',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2400',
    shortDescription: 'Nanotecnologia escura extrema para conforto térmico e privacidade total.',
    fullDescription: 'Tonalidade preta profunda e luxuosa para esconder interiores de forma incisiva. Reduz drasticamente o calor e traz uma estética minimalista escura.',
    keyMetrics: { ir: 'Até 75%', uv: '99%', tser: 'Até 70%', warranty: '10 Anos' },
    benefits: [
      { title: 'Privacidade Absoluta', description: 'Ambiente recluso e à prova de olhares indesejados.', icon: 'Eye' },
      { title: 'Anti-Ofuscamento Master', description: 'Garante o conforto absoluto da luz para salas de estar.', icon: 'Sun' }
    ],
    specs: { vlt: '05-20%', irer: '0%', tsr: '0%', thickness: '1.5 Mil', material: 'Polissacarídeos e Carbono', glareReduction: '95%' }
  },
  {
    id: 'select-seguranca',
    name: 'Winf Select™ Segurança',
    subname: 'Barreira Anti-Impacto e Antivandalismo',
    badge: 'BLINDAGEM ESTRUTURAL',
    category: 'arch',
    line: 'select',
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=2400',
    shortDescription: 'Segurança extrema em caso de arrombamentos ou tempestades.',
    fullDescription: 'Película estrutural composta por múltiplas camadas de poliéster projetada para manter o vidro no lugar mesmo quando estilhaçado. Impede que vândalos atravessem e evita ferimentos com cacos.',
    keyMetrics: { ir: 'N/A', uv: '99%', tser: 'N/A', warranty: '10 Anos', thickness: '4 a 8 Mil' },
    benefits: [
      { title: 'Muralha Invisível', description: 'Prolonga o tempo de invasão de minutos para segundos.', icon: 'Shield' },
      { title: 'Segurança Ativa', description: 'Alivia os estilhaços em acidentes com crianças ou animais.', icon: 'Shield' }
    ],
    specs: { vlt: '89%', irer: '0%', tsr: '0%', thickness: '4 Mil / 8 Mil', material: 'Poliéster de Alta Tensão', glareReduction: '2%' }
  },
  {
    id: 'select-white-arch',
    name: 'Winf Select White®',
    subname: 'Série Nanocristalina Arquitetônica',
    badge: 'MÁXIMA LUMINOSIDADE',
    category: 'arch',
    line: 'select',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2670&auto=format&fit=crop',
    shortDescription: 'Proteção térmica nanocristalina com máxima transparência para fachadas.',
    fullDescription: 'Especialmente desenvolvida para ambientes modernos que exigem vidraças 100% claras, a Winf Select White® filtra o calor. O equilíbrio perfeito.',
    keyMetrics: { ir: 'Até 90%', uv: '99.9%', tser: 'Até 55%', warranty: '10 Anos' },
    benefits: [
      { title: 'Visão Noturna', description: 'Mantém a clareza e não reflete luz à noite.', icon: 'Eye' },
      { title: 'Escudo Térmico', description: 'Barreira contra raios infravermelhos.', icon: 'Sun' }
    ],
    specs: { vlt: '75-80%', irer: '0%', tsr: '0%', thickness: '1.5 Mil', material: 'Nanocerâmica Cristalina', glareReduction: '10%' }
  },

  // ==========================================
  // AEROCORE - AUTO (TECNOLOGIA NASA/MILITAR - EXTREMO LUXO)
  // ==========================================
  {
    id: 'aerocore-phantom',
    name: 'AeroCore™ Phantom',
    subname: 'Nanocerâmica Criptográfica',
    badge: 'LUXO ABSOLUTO',
    category: 'auto',
    line: 'aerocore',
    image: 'https://images.unsplash.com/photo-1611016186450-41da9d07372d?q=80&w=2600&auto=format&fit=crop',
    shortDescription: 'Nanotecnologia cerâmica veicular avançada baseada em engenharia aeroespacial.',
    fullDescription: 'Criada nos moldes da proteção térmica de ônibus espaciais, a Phantom entrega luxo inigualável, zero interferência em sinal e rejeição irretocável de calor. Preço premium para quem exige o melhor do mundo.',
    keyMetrics: { ir: '99%', uv: '99.9%', tser: '68%', warranty: 'Vitalícia' },
    benefits: [
      { title: 'Rejeição IR Pura', description: 'Malha cerâmica que intercepta o calor violentamente.', icon: 'Sun' },
      { title: 'Clareza Óptica Absoluta', description: 'Sem distorções, visão cristalina mesmo em altas espessuras.', icon: 'Eye' }
    ],
    specs: { vlt: '05-35%', irer: '65%', tsr: '68%', thickness: '1.5 Mil', material: 'Nanocerâmica Pura', glareReduction: '60%' }
  },
  {
    id: 'aerocore-stealth',
    name: 'AeroCore™ Stealth',
    subname: 'Nanocerâmica de Alta Privacidade',
    badge: 'PRIVACIDADE CLASSIFICADA',
    category: 'auto',
    line: 'aerocore',
    image: 'https://images.unsplash.com/photo-1542382103-997f7422f6d0?q=80&w=2670&auto=format&fit=crop',
    shortDescription: 'Escuridão profunda do lado de fora, visibilidade militar do lado de dentro.',
    fullDescription: 'Para clientes que exigem discrição total de veículos de escolta e luxo, sem perder um decibel de conectividade GPS ou visão noturna de dentro para fora.',
    keyMetrics: { ir: '97%', uv: '99.9%', tser: '62%', warranty: 'Vitalícia' },
    benefits: [
      { title: 'Tonalidade Carbon Black', description: 'Estética furtiva, preta profunda e sem reflexos espelhados.', icon: 'Eye' }
    ],
    specs: { vlt: '05%', irer: '60%', tsr: '62%', thickness: '1.5 Mil', material: 'Cerâmica Furtiva', glareReduction: '93%' }
  },
  {
    id: 'aerocore-orbital',
    name: 'AeroCore™ Orbital',
    subname: 'Controle Térmico de Precisão',
    badge: 'DNA ESPACIAL',
    category: 'auto',
    line: 'aerocore',
    image: 'https://images.unsplash.com/photo-1621360662232-a50e599b8287?q=80&w=2684&auto=format&fit=crop',
    shortDescription: 'O ápice do catálogo veicular. Para-brisas e visibilidade extrema em altas temperaturas.',
    fullDescription: 'Um escudo invisível. A película Orbital traz o máximo da tecnologia da NASA para preservar interiores de veículos superesportivos do ressecamento.',
    keyMetrics: { ir: '98%', uv: '99.9%', tser: '55%', warranty: 'Vitalícia' },
    benefits: [
      { title: 'Performance Invisível', description: 'Pode ser aplicada no para-brisas frontal sem violar a lei.', icon: 'Shield' }
    ],
    specs: { vlt: '70-80%', irer: '55%', tsr: '55%', thickness: '1.5 Mil', material: 'Nanocerâmica Clear', glareReduction: '20%' }
  },

  // ==========================================
  // AEROCORE - MARINE
  // ==========================================
  {
    id: 'aerocore-abyssal',
    name: 'AeroCore™ Abyssal',
    subname: 'Proteção Solar Marítima de Salinidade',
    badge: 'BLINDAGEM NÁUTICA',
    category: 'marine',
    line: 'aerocore',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=2670&auto=format&fit=crop',
    shortDescription: 'Construída para suportar salinidade, maresia e sol impiedoso de águas abertas.',
    fullDescription: 'Iates de luxo sofrem com o ofuscamento da água e a alta incidência UV. A Abyssal blinda os vidros da cabine protegendo painéis de navegação eletrônicos.',
    keyMetrics: { ir: '96%', uv: '99.9%', tser: '65%', warranty: '10 Anos' },
    benefits: [
      { title: 'Resistência à Maresia', description: 'Não oxida nem sofre descolamento em ambientes marinhos.', icon: 'Shield' }
    ],
    specs: { vlt: '20-35%', irer: '60%', tsr: '65%', thickness: '2.0 Mil', material: 'Cerâmica Marine Grade', glareReduction: '50%' }
  },
  {
    id: 'aerocore-trident',
    name: 'AeroCore™ Trident',
    subname: 'Cerâmica Náutica Furtiva',
    badge: 'ESTÉTICA NEGRA',
    category: 'marine',
    line: 'aerocore',
    image: 'https://images.unsplash.com/photo-1549488344-1f9a8d29b356?q=80&w=2670&auto=format&fit=crop',
    shortDescription: 'Privacidade absoluta para passageiros no convés principal.',
    fullDescription: 'Bloqueio agressivo de brilho com aspecto escurecido, garantindo a privacidade de celebridades e autoridades em alto mar.',
    keyMetrics: { ir: '98%', uv: '99.9%', tser: '70%', warranty: '10 Anos' },
    benefits: [
      { title: 'Privacidade Externa', description: 'Ninguém vê o luxo do lado de dentro do barco.', icon: 'Eye' }
    ],
    specs: { vlt: '05%', irer: '65%', tsr: '70%', thickness: '2.0 Mil', material: 'Cerâmica Dark Marine', glareReduction: '95%' }
  },
  {
    id: 'aerocore-leviathan',
    name: 'AeroCore™ Leviathan',
    subname: 'Máximo Bloqueio de Glare (Ofuscamento)',
    badge: 'CONFORTO DE PILOTAGEM',
    category: 'marine',
    line: 'aerocore',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=2644&auto=format&fit=crop',
    shortDescription: 'Corta o "glare" insuportável do sol refletido na água do oceano.',
    fullDescription: 'Projetada especificamente para o posto de comando (cockpit) naval, reduzindo os perigosos reflexos d\'água sem escurecer os mostradores vitais do radar.',
    keyMetrics: { ir: '97%', uv: '99.9%', tser: '60%', warranty: '10 Anos' },
    benefits: [
      { title: 'Visão de Comando', description: 'Precisão visual para atracar o navio contra o sol.', icon: 'Sun' }
    ],
    specs: { vlt: '50%', irer: '55%', tsr: '60%', thickness: '1.5 Mil', material: 'Nano-Partículas Anti-Reflexo', glareReduction: '70%' }
  },

  // ==========================================
  // AEROCORE - AERO (AEROESPACIAL)
  // ==========================================
  {
    id: 'aerocore-horizon',
    name: 'AeroCore™ Horizon',
    subname: 'Proteção Estratosférica para Jatos',
    badge: 'ALTA ALTITUDE',
    category: 'aero',
    line: 'aerocore',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a4ad4?q=80&w=2670&auto=format&fit=crop',
    shortDescription: 'Bloqueio extremo de raios UV e Cósmicos (nível básico) para aviação executiva.',
    fullDescription: 'Em altitudes acima de 40.000 pés, a radiação solar não tem filtro. A linha Horizon protege a pele de pilotos e passageiros VIP de longas exposições.',
    keyMetrics: { ir: '90%', uv: '99.9%', tser: '50%', warranty: '5 Anos' },
    benefits: [
      { title: 'Defesa UV de Aviação', description: 'Bloqueia comprimentos de onda curtos destrutivos.', icon: 'Sun' }
    ],
    specs: { vlt: '60%', irer: '45%', tsr: '50%', thickness: '2.0 Mil', material: 'Cerâmica Aeronáutica', glareReduction: '30%' }
  },
  {
    id: 'aerocore-stratos',
    name: 'AeroCore™ Stratos',
    subname: 'Deflexão Térmica de Cockpit',
    badge: 'ESTABILIDADE TÉRMICA',
    category: 'aero',
    line: 'aerocore',
    image: 'https://images.unsplash.com/photo-1559632832-15f5c87fbdca?q=80&w=2670&auto=format&fit=crop',
    shortDescription: 'Evita a fadiga térmica do piloto cortando infravermelho e condensação.',
    fullDescription: 'Aplicada aos painéis de acrílico/policarbonato e vidros de jatos comerciais. Desenvolvida para resistir às flexões da fuselagem em pressurização.',
    keyMetrics: { ir: '95%', uv: '99.9%', tser: '65%', warranty: '5 Anos' },
    benefits: [
      { title: 'Flexão Polimérica', description: 'Acompanha a expansão/contração da janela da aeronave sem trincar.', icon: 'Shield' }
    ],
    specs: { vlt: '35%', irer: '60%', tsr: '65%', thickness: '2.0 Mil', material: 'Elastômero Cerâmico', glareReduction: '40%' }
  },
  {
    id: 'aerocore-zenith',
    name: 'AeroCore™ Zenith',
    subname: 'Blindagem de Luxo para Cabine VIP',
    badge: 'CONFORTO PRESIDENCIAL',
    category: 'aero',
    line: 'aerocore',
    image: 'https://images.unsplash.com/photo-1605342417724-11e2fbc0cb99?q=80&w=2614&auto=format&fit=crop',
    shortDescription: 'Mimetismo eletromagnético para janelas de jatos presidenciais e de bilionários.',
    fullDescription: 'Apenas para quem comprou o espaço aéreo. Rejeita o brilho das nuvens brancas, esfria a cabine para otimizar consumo e não afeta telemetria.',
    keyMetrics: { ir: '98%', uv: '99.9%', tser: '70%', warranty: '5 Anos' },
    benefits: [
      { title: 'Suntuosidade Visual', description: 'Reduz o cansaço dos olhos dos convidados e chefes de estado.', icon: 'Eye' }
    ],
    specs: { vlt: '15%', irer: '68%', tsr: '70%', thickness: '2.0 Mil', material: 'Cerâmica Multi-Layer Aero', glareReduction: '85%' }
  },

  // ==========================================
  // AEROCORE - GLASS + HOME (ARQUITETURA PREMIUM)
  // ==========================================
  {
    id: 'aerocore-prism',
    name: 'AeroCore™ Prism (Cerâmica)',
    subname: 'Cerâmica Arquitetônica Definitiva',
    badge: 'ARQUITETURA DE LUXO',
    category: 'arch',
    line: 'aerocore',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop',
    shortDescription: 'Nanocerâmica de última geração para as mais finas residências do mundo.',
    fullDescription: 'A linha Glass + Home da AeroCore transfere o poder militar para sua casa. A malha cerâmica Prisma elimina o problema de desbotamento de obras de arte sem escurecer seus vidros enormes.',
    keyMetrics: { ir: '99%', uv: '99.9%', tser: '60%', warranty: '15 Anos' },
    benefits: [
      { title: 'Preservação de Obras de Arte', description: 'Protege tapetes persas, móveis caros e quadros de autores famosos.', icon: 'Shield' }
    ],
    specs: { vlt: '50-70%', irer: '55%', tsr: '60%', thickness: '1.5 Mil', material: 'Nanocerâmica Clear Home', glareReduction: '40%' }
  },
  {
    id: 'aerocore-obsidian',
    name: 'AeroCore™ Obsidian (Carbono)',
    subname: 'Carbono Não-Metalizado de Alta Densidade',
    badge: 'ESTÉTICA CARBON NEGRA',
    category: 'arch',
    line: 'aerocore',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2670&auto=format&fit=crop',
    shortDescription: 'Tom grafite natural e frio que impõe respeito às fachadas sem estragar a noite.',
    fullDescription: 'Feito a partir de nanotubos de carbono, cria uma barreira térmica preta profunda para manter arranha-céus refrigerados sem interferir em sinais de smartphone 5G.',
    keyMetrics: { ir: '85%', uv: '99%', tser: '55%', warranty: '10 Anos' },
    benefits: [
      { title: 'Acabamento Sem Metal', description: 'Evita a terrível oxidação brilhante em áreas litorâneas.', icon: 'Sun' }
    ],
    specs: { vlt: '05-20%', irer: '50%', tsr: '55%', thickness: '1.5 Mil', material: 'Carbono Arquitetônico Puro', glareReduction: '90%' }
  },

  // ==========================================
  // NEOSKIN (BRUTAL) - PPF e SEGURANÇA
  // ==========================================
  {
    id: 'neoskin-hazard',
    name: 'NeoSkin Hazard™ (PPF 8 Mil)',
    subname: 'Pele Regenerativa de Sobrevivência',
    badge: 'RESISTÊNCIA BRUTA',
    category: 'auto',
    line: 'neoskin',
    image: 'https://images.unsplash.com/photo-1620336655174-32ff84ee624d?q=80&w=2574&auto=format&fit=crop',
    shortDescription: 'Película brutal. Até depois do fim. PPF de 8 mils para selva de pedra e trilhas.',
    fullDescription: 'A NeoSkin não se desculpa. É espessa, amarelamento zero e possui regeneração térmica. Feita para aguentar galhos em estradas off-road, pedregulhos pontiagudos e ácido. Seu veículo volta intacto.',
    keyMetrics: { ir: 'N/A', uv: '99%', tser: 'N/A', warranty: '10 Anos' },
    benefits: [
      { title: 'Armadura Alifática', description: 'Reveste o carro como pele de rinoceronte resistente a penetrações.', icon: 'Shield' }
    ],
    specs: { vlt: '100%', irer: 'N/A', tsr: 'N/A', thickness: '8 Mil', material: 'TPU Alifático Brutal', glareReduction: '0%' }
  },
  {
    id: 'neoskin-bunker',
    name: 'NeoSkin Bunker™ (PPF Matte)',
    subname: 'PPF Textura Fosca Anti-Reflexo',
    badge: 'FURTIVIDADE TÁTICA',
    category: 'auto',
    line: 'neoskin',
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?q=80&w=2574&auto=format&fit=crop',
    shortDescription: 'Transforma qualquer pintura em um tanque furtivo fosco, sem sacrificar a durabilidade de guerra.',
    fullDescription: 'Por que apenas proteger se você pode intimidar? A película Bunker converte a cor brilhante de fábrica para um acetinado ameaçador de estilo militar, escondendo a sujeira pesada e resistindo a chuvas ácidas.',
    keyMetrics: { ir: 'N/A', uv: '99%', tser: 'N/A', warranty: '10 Anos' },
    benefits: [
      { title: 'Estética Militar Acetinada', description: 'Design opressor que anula reflexos. Fica intimidador na rua.', icon: 'Eye' }
    ],
    specs: { vlt: '100%', irer: 'N/A', tsr: 'N/A', thickness: '8 Mil', material: 'TPU Satin/Fosco', glareReduction: '0%' }
  },
  {
    id: 'neoskin-apocalypse',
    name: 'NeoSkin Apocalypse™ (Security PPF 12 Mil)',
    subname: 'A Fronteira Final contra Impactos',
    badge: 'ESTADO DE EXCEÇÃO',
    category: 'auto',
    line: 'neoskin',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2670&auto=format&fit=crop',
    shortDescription: 'Um escudo insano de 12 milésimos de polegada para os extremos cenários do planeta.',
    fullDescription: 'Se as estradas deixarem de existir, a pintura do seu carro permanece. A Apocalypse é pesada, criada inicialmente para páletes de helicópteros na guerra contra tempestades de areia, agora adaptada para jipes de altíssimo impacto.',
    keyMetrics: { ir: 'N/A', uv: '99%', tser: 'N/A', warranty: '10 Anos' },
    benefits: [
      { title: 'Absorção Cinética Extrema', description: 'Impactos frontais a 120km/h com detritos são simplesmente engolidos pela espessura da película.', icon: 'Shield' }
    ],
    specs: { vlt: '100%', irer: 'N/A', tsr: 'N/A', thickness: '12 Mil', material: 'Ultra-Thick TPU Multi-Layer', glareReduction: '0%' }
  }
];

