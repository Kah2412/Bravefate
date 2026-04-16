import { motion } from "framer-motion";
import {
  ShieldAlert,
  Phone,
  FileText,
  AlertTriangle,
  MapPin,
  Users,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const emergencyNumbers = [
  { number: "180", label: "Central de Atendimento à Mulher", desc: "24h, gratuito, anônimo", color: "from-[hsl(345,40%,55%)] to-[hsl(345,50%,30%)]" },
  { number: "190", label: "Polícia Militar", desc: "Emergências", color: "from-[hsl(0,60%,50%)] to-[hsl(0,50%,30%)]" },
  { number: "197", label: "Polícia Civil", desc: "Denúncias", color: "from-[hsl(220,50%,50%)] to-[hsl(220,50%,30%)]" },
  { number: "100", label: "Direitos Humanos", desc: "Disque Direitos Humanos", color: "from-[hsl(280,40%,50%)] to-[hsl(280,50%,30%)]" },
];

const safetySteps = [
  {
    icon: AlertTriangle,
    title: "Identifique os Sinais",
    items: [
      "Controle excessivo do parceiro (finanças, amizades, roupas)",
      "Humilhações públicas ou privadas constantes",
      "Ameaças de agressão ou morte",
      "Isolamento de familiares e amigos",
      "Ciúme excessivo e possessividade",
      "Destruição de objetos pessoais",
    ],
  },
  {
    icon: Lock,
    title: "Planejamento de Segurança",
    items: [
      "Tenha documentos importantes em local seguro fora de casa",
      "Guarde dinheiro de emergência em local secreto",
      "Memorize números de emergência e de pessoas de confiança",
      "Identifique vizinhos que possam ajudar em caso de perigo",
      "Prepare uma mala com roupas essenciais escondida",
      "Combine um sinal de alerta com alguém de confiança",
    ],
  },
  {
    icon: FileText,
    title: "Documentação",
    items: [
      "Registre boletim de ocorrência em qualquer delegacia",
      "Tire fotos e guarde provas de agressões (em nuvem segura)",
      "Solicite medida protetiva na delegacia ou no Ministério Público",
      "Peça exame de corpo de delito no IML",
      "Registre conversas ameaçadoras (prints, áudios)",
      "Procure a Defensoria Pública para apoio jurídico gratuito",
    ],
  },
  {
    icon: MapPin,
    title: "Busque Acolhimento",
    items: [
      "CRAS e CREAS oferecem atendimento social gratuito",
      "Casa da Mulher Brasileira — atendimento integrado",
      "Delegacia da Mulher (DEAM) — atendimento especializado",
      "Casas-abrigo oferecem moradia temporária segura",
      "Núcleos de Atendimento à Mulher nas Defensorias Públicas",
      "ONGs locais de apoio à mulher vítima de violência",
    ],
  },
];

const typesOfViolence = [
  { name: "Física", desc: "Tapas, empurrões, queimaduras ou qualquer ato que cause dor física.", color: "bg-[hsl(0,60%,50%)]/10 text-[hsl(0,60%,50%)]" },
  { name: "Psicológica", desc: "Humilhação, controle, ameaças, manipulação emocional, gaslight.", color: "bg-[hsl(280,40%,50%)]/10 text-[hsl(280,40%,50%)]" },
  { name: "Sexual", desc: "Qualquer ato sexual sem consentimento, inclusive dentro do casamento.", color: "bg-[hsl(345,40%,55%)]/10 text-[hsl(345,40%,55%)]" },
  { name: "Patrimonial", desc: "Destruição de bens, controle de dinheiro, retenção de documentos.", color: "bg-[hsl(38,60%,55%)]/10 text-[hsl(38,60%,55%)]" },
  { name: "Moral", desc: "Calúnia, difamação, exposição da vida íntima.", color: "bg-[hsl(160,40%,45%)]/10 text-[hsl(160,40%,45%)]" },
];

const leiMariadaPenha = [
  "Medida protetiva pode ser concedida em até 48 horas",
  "O agressor pode ser afastado do lar imediatamente",
  "Proibição de aproximação e contato com a vítima",
  "Proteção patrimonial de bens do casal",
  "Encaminhamento para programas de proteção",
  "Atendimento multidisciplinar garantido por lei",
];

const Protocolos = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6"
        >
          <ShieldAlert className="w-4 h-4" />
          Informação salva vidas
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-gradient">
          Protocolos de Segurança
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Guia completo com protocolos, direitos e recursos para mulheres em
          situação de violência. Você não está sozinha.
        </p>
      </motion.div>

      {/* Emergency numbers */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-8">
          <Phone className="w-6 h-6 inline mr-2 text-accent" />
          Números de Emergência
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {emergencyNumbers.map((n, i) => (
            <motion.a
              key={n.number}
              href={`tel:${n.number}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="group rounded-2xl overflow-hidden glass-card card-hover text-center"
            >
              <div className={`h-1.5 bg-gradient-to-r ${n.color}`} />
              <div className="p-5">
                <p className="text-4xl font-display font-bold text-accent mb-1">{n.number}</p>
                <p className="text-sm font-medium mb-1">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Types of violence */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-3">
          Tipos de Violência
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-lg mx-auto text-sm">
          Reconhecer os tipos de violência é o primeiro passo para buscar ajuda
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {typesOfViolence.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              className="rounded-2xl p-5 glass-card card-hover text-center"
            >
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${t.color}`}>
                {t.name}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Safety protocols */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10">
          <Sparkles className="w-6 h-6 inline mr-2 text-accent" />
          Protocolo de Segurança
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {safetySteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 * i }}
              className="rounded-2xl p-6 glass-card card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Passo {i + 1}</span>
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                </div>
              </div>
              <ul className="space-y-2">
                {step.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="w-3 h-3 mt-1 text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lei Maria da Penha */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-16 max-w-3xl mx-auto"
      >
        <div className="rounded-3xl overflow-hidden gradient-accent p-8 md:p-10 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-accent-foreground" />
              <div>
                <h3 className="text-xl font-display font-bold text-accent-foreground">
                  Lei Maria da Penha
                </h3>
                <p className="text-accent-foreground/70 text-sm">Lei nº 11.340/2006 — Seus direitos</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {leiMariadaPenha.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-sm text-accent-foreground/90"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-accent-foreground" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  </div>
);

export default Protocolos;
