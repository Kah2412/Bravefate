export interface SupportResource {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  category: "sinais" | "seguranca" | "ajuda" | "apoio" | "provas" | "direitos";
  tips?: string[];
}

export interface ImportantContact {
  id: string;
  name: string;
  number: string;
  description: string;
  when: string;
  details?: string;
  color: "rose" | "coral" | "teal" | "gold" | "violet" | "wine";
}

export interface StrengthenContent {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  category: "autoestima" | "independencia" | "recomeço" | "direitos" | "emocional";
  affirmations?: string[];
}

export const supportResources: SupportResource[] = [
  {
    id: "sinais-01",
    title: "Sinais de Relacionamento Abusivo",
    description: "Reconheça os primeiros sinais de um relacionamento prejudicial",
    content: `Um relacionamento abusivo pode ser difícil de identificar, especialmente quando começamos a normalizá-lo. Aqui estão os sinais principais:`,
    icon: "AlertCircle",
    category: "sinais",
    tips: [
      "Ciúmes excessivo e controle sobre o que você veste, onde vai ou com quem fala",
      "Criticismo constante sobre sua aparência, inteligência ou capacidades",
      "Isolamento de amigos e família, deixando você dependente apenas dele",
      "Mudanças de humor bruscas entre ternura excessiva e frieza",
      "Ameaças de abandoná-lo ou prejudicar-se caso você saia",
      "Responsabilização: 'você foi quem provocou minha raiva'",
      "Violência física (tapas, empurrões, abusos sexuais)",
      "Nega realidades ou nega que situações abusivas aconteceram",
      "Controla o dinheiro ou impede que trabalhe",
      "Ameaça tirar os filhos se você deixá-lo",
    ],
  },
  {
    id: "seguranca-01",
    title: "Como Sair com Segurança",
    description: "Passo a passo para sair de um relacionamento abusivo de forma segura",
    content: `Sair é uma das fases mais perigosas. Planeje com cuidado:`,
    icon: "Shield",
    category: "seguranca",
    tips: [
      "Faça um plano. Combine data e hora com pessoas de confiança",
      "Guarde documentos importantes (RG, CPF, certidões) em local seguro",
      "Arrume uma mala com roupas e itens essenciais escondida ou com amiga",
      "Abra conta bancária independente, se possível",
      "Escolha um local seguro para ir após sair (casa de amiga, abrigo, família)",
      "Informe sua rota de fuga a uma pessoa de confiança",
      "Se tiver filhos, consulte um advogado sobre corretamente",
      "Comunique à polícia ou a um abrigo especializado",
      "Mude sua senha de redes sociais e email",
      "Bloqueie números e endereços de email do agressor",
      "Considere tecnicamente rastreamento (GPS, câmeras ocultas, app de localização)",
      "Se em perigo imediato: saia sem aviso prévio e ligue para 190",
    ],
  },
  {
    id: "ajuda-01",
    title: "Como Pedir Ajuda",
    description: "Formas seguras de buscar suporte profissional",
    content: `Pedir ajuda é um ato de coragem. Você não está sozinha:`,
    icon: "Heart",
    category: "ajuda",
    tips: [
      "Ligue 180 - Denúncias de Violência contra a Mulher (24h, anônimo)",
      "Procure delegacias especializadas em violência doméstica",
      "Busque abrigos para mulheres em sua região (confidencial)",
      "Converse com psicólogas e assistentes sociais em centros de saúde",
      "Procure organizações de defesa de mulheres em sua cidade",
      "Se tiver risco de morte iminente: ligue 190",
      "Em crises emocionais: ligue 188 (Centro de Valorização da Vida)",
      "Avise uma amiga, familiar ou colega de trabalho sobre a situação",
      "Em situações online, denuncie às plataformas",
      "Um padre, pastor ou líder espiritual pode oferecer suporte",
    ],
  },
  {
    id: "apoio-01",
    title: "Como Montar Rede de Apoio",
    description: "Construa um sistema de proteção com pessoas de confiança",
    content: `Uma rede de apoio é essencial para sua segurança e recuperação:`,
    icon: "Users",
    category: "apoio",
    tips: [
      "Identifique 3-5 pessoas completamente confiáveis (amiga, familiar, colega)",
      "Compartilhe com elas que está em risco (não precisa entrar em detalhes)",
      "Combine sinais de alerta (mensagem cifrada, código combinado)",
      "Crie um plano de contato de emergência com cada uma",
      "Deixe documentos importantes com alguém de confiança",
      "Informe um local seguro onde pode ir urgentemente",
      "Terapia em grupo de mulheres vítimas de violência ajuda",
      "Avise colegas de trabalho (nível apropriado de detalhe) sobre possível assédio",
      "Participe de grupos de apoio (presenciais ou online)",
      "Conecte-se com outras mulheres em situação similar",
      "Não isole-se: mantenha contato com amigos e família",
    ],
  },
  {
    id: "provas-01",
    title: "Como Registrar Provas com Segurança",
    description: "Documente incidentes para possível ação legal",
    content: `Documentação segura pode ser crucial em processos legais:`,
    icon: "Shield",
    category: "provas",
    tips: [
      "Tire fotos de hematomas/lesões com data e hora (use app próprio para data)",
      "Guarde mensagens ameaçadoras (printescreen com data visível)",
      "Use app de notas privadas para guardar datas e detalhes de incidentes",
      "Grave áudios de conversas (se legal no seu estado) em local seguro",
      "Procure atendimento médico mesmo que ferimentos pareçam leves (fica em prontuário)",
      "Registre depoimentos de testemunhas por escrito assinado",
      "Guarde cartões de atendimento psicológico/médico",
      "Crie pasta segura na nuvem com esses registros (senha forte, 2FA)",
      "NÃO compartilhe provas com o agressor ou em redes públicas",
      "Leve a documentação ao fazer denúncia formal",
    ],
  },
  {
    id: "direitos-01",
    title: "Seus Direitos Legais",
    description: "Conheça a Lei Maria da Penha e outras proteções",
    content: `Você tem direitos. A lei brasileira protege mulheres vítimas de violência:`,
    icon: "ShieldAlert",
    category: "direitos",
    tips: [
      "Lei Maria da Penha (11.340/06) é a principal proteção contra violência doméstica",
      "Você pode pedir medida protetiva de urgência (afastamento do agressor)",
      "A medida protetiva é GRÁTIS e pode ser feita em 24h em delegacia",
      "Violência é crime: lesão corporal, ameaça, injúria, difamação",
      "Você tem direito a não ser questionada em delegacia sobre sexualidade",
      "Pode pedir proteção policial 24h se houver risco iminente",
      "Tem direito a multa, responsabilidade criminal e civil do agressor",
      "Filhos também são protegidos pela Lei Maria da Penha",
      "Procure advogada pública gratuita (Defensoria Pública)",
      "Denúncia é anônima: ligue 180 sem medos",
    ],
  },
];

export const importantContacts: ImportantContact[] = [
  {
    id: "contact-180",
    name: "Violência contra a Mulher",
    number: "180",
    description: "Disque Denúncia Nacional - Violência contra a Mulher",
    when: "Disponível 24 horas, todos os dias, ligações anônimas",
    details:
      "Recebe denúncias de qualquer tipo de violência contra mulheres. Oferece orientação sobre direitos, abrigos e serviços.",
    color: "rose",
  },
  {
    id: "contact-190",
    name: "Emergência",
    number: "190",
    description: "Polícia Militar - Para situações de perigo imediato",
    when: "Disponível 24 horas para emergências com risco de vida",
    details:
      "Ligação móvel ou fixa. Informe sua localização clara e o tipo de emergência. Resposta em minutos.",
    color: "coral",
  },
  {
    id: "contact-188",
    name: "Prevenção do Suicídio",
    number: "188",
    description: "Centro de Valorização da Vida - Apoio emocional",
    when: "24 horas para crises emocionais, depressão, ansiedade",
    details:
      "Ligação confidencial com psicólogos e voluntários. Sem julgamentos. Gratuito em telefone fixo ou móvel.",
    color: "teal",
  },
  {
    id: "contact-192",
    name: "Polícia Federal",
    number: "192",
    description: "Para crimes federais e perseguição online",
    when: "Investigação de crimes como cyberstalking, difamação, ódio",
    details: "Denuncie em delegacia de polícia federal ou online em portais oficiais.",
    color: "violet",
  },
];

export const strengthenContents: StrengthenContent[] = [
  {
    id: "strengthen-01",
    title: "Reconstruindo Autoestima",
    description: "Exercícios práticos para fortalecer sua autoimagem",
    content: `Abuso corrói a autoestima. Reconstruir leva tempo e prática:`,
    icon: "Sparkles",
    category: "autoestima",
    affirmations: [
      "Sou digna de amor e respeito",
      "Minhas escolhas importam",
      "Meu corpo é meu",
      "Mereci melhor",
      "Sou mais forte do que imaginava",
      "Vale a pena lutar por mim",
      "Meu valor não depende de ninguém",
    ],
  },
  {
    id: "strengthen-02",
    title: "Independência Financeira",
    description: "Passos para conquistar independência e segurança econômica",
    content: `Autonomia financeira é poder real:`,
    icon: "DollarSign",
    category: "independencia",
    affirmations: [
      "Posso construir meu futuro financeiro",
      "Meu dinheiro é meu controle",
      "Sou capaz de sustentar a mim mesma",
      "Educação financeira liberta",
    ],
  },
  {
    id: "strengthen-03",
    title: "Recomeço e Renovação",
    description: "Caminhos para começar uma nova vida",
    content: `Não é para voltar. É para recomeçar melhor:`,
    icon: "RefreshCw",
    category: "recomeço",
    affirmations: [
      "Meu passado não define meu futuro",
      "Posso construir vida nova",
      "Cada dia é uma chance",
      "Sou mais sábia agora",
    ],
  },
  {
    id: "strengthen-04",
    title: "Seus Direitos Fundamentais",
    description: "O que você deve saber sobre seus direitos como pessoa",
    content: `Você nasceu com direitos. Ninguém pode tirar:`,
    icon: "ShieldAlert",
    category: "direitos",
    affirmations: [
      "Tenho direito a opinião própria",
      "Tenho direito a não lidar com abuso",
      "Tenho direito a mudar de ideia",
      "Tenho direito ao respeito",
      "Tenho direito a amigos e família",
      "Tenho direito a segurança",
    ],
  },
];
