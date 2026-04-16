import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  HandHeart,
  ShieldCheck,
  Gift,
  CreditCard,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const orgs = [
  {
    name: "Casa da Mulher Brasileira",
    desc: "Atendimento humanizado às mulheres em situação de violência, com serviços de acolhimento, apoio jurídico e psicológico.",
    url: "https://www.gov.br/mdh/pt-br/navegue-por-temas/politicas-para-mulheres/casa-da-mulher-brasileira-1",
    color: "from-[hsl(345,40%,55%)] to-[hsl(345,50%,30%)]",
  },
  {
    name: "Instituto Maria da Penha",
    desc: "ONG que promove a conscientização e o combate à violência doméstica contra a mulher.",
    url: "https://www.institutomariadapenha.org.br",
    color: "from-[hsl(280,40%,50%)] to-[hsl(280,50%,30%)]",
  },
  {
    name: "Think Olga",
    desc: "Organização feminista voltada para criar conteúdo e campanhas que impactem políticas públicas.",
    url: "https://thinkolga.com",
    color: "from-[hsl(200,60%,50%)] to-[hsl(200,60%,30%)]",
  },
  {
    name: "Fundo ELAS",
    desc: "Fundo de investimento social para organizações e projetos liderados por mulheres.",
    url: "https://www.fundoelas.org.br",
    color: "from-[hsl(38,60%,55%)] to-[hsl(38,50%,35%)]",
  },
  {
    name: "Projeto Justiceiras",
    desc: "Rede de voluntárias que oferece atendimento gratuito de advogadas, psicólogas e assistentes sociais.",
    url: "https://justiceiras.org.br",
    color: "from-[hsl(160,40%,45%)] to-[hsl(160,50%,25%)]",
  },
  {
    name: "Mapa do Acolhimento",
    desc: "Conecta mulheres vítimas de violência com psicólogas e advogadas voluntárias.",
    url: "https://www.mapadoacolhimento.org",
    color: "from-[hsl(320,45%,55%)] to-[hsl(320,50%,30%)]",
  },
];

const howToHelp = [
  {
    icon: CreditCard,
    title: "Doação Financeira",
    desc: "Contribua diretamente para ONGs que acolhem mulheres em situação de risco. Qualquer valor faz diferença.",
  },
  {
    icon: HandHeart,
    title: "Voluntariado",
    desc: "Doe seu tempo e habilidades — atendimento psicológico, jurídico, aulas ou mentoria.",
  },
  {
    icon: Gift,
    title: "Doação de Itens",
    desc: "Roupas, alimentos, produtos de higiene e brinquedos para crianças de abrigos.",
  },
  {
    icon: ShieldCheck,
    title: "Divulgação",
    desc: "Compartilhe os canais de denúncia e amplifique vozes. Informar também é proteger.",
  },
];

const Doacoes = () => {
  const [copied, setCopied] = useState(false);

  const copyPix = () => {
    navigator.clipboard.writeText("doacoes@brave.org.br");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
            <Sparkles className="w-4 h-4" />
            Cada gesto conta
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-gradient">
            Apoie Mulheres
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Milhares de mulheres no Brasil precisam de ajuda para recomeçar. Sua contribuição
            pode oferecer abrigo, apoio jurídico e psicológico para quem mais precisa.
          </p>
        </motion.div>

        {/* How to help */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10">
            Como Ajudar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {howToHelp.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="relative group rounded-2xl p-6 glass-card card-hover overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pix / Donation CTA */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-20 max-w-2xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden p-8 md:p-10 text-center gradient-accent">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="relative">
              <Heart className="w-12 h-12 text-accent-foreground mx-auto mb-4 animate-float" />
              <h3 className="text-2xl font-display font-bold text-accent-foreground mb-2">
                Doe via Pix
              </h3>
              <p className="text-accent-foreground/80 mb-6 text-sm">
                Chave Pix para doações diretas ao projeto Brave
              </p>
              <div className="flex items-center justify-center gap-3 bg-background/20 rounded-xl p-4 backdrop-blur-sm">
                <code className="text-accent-foreground font-mono text-sm">doacoes@brave.org.br</code>
                <button
                  onClick={copyPix}
                  className="p-2 rounded-lg bg-background/20 hover:bg-background/30 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-accent-foreground" />
                  ) : (
                    <Copy className="w-4 h-4 text-accent-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Organizations */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-3">
            Organizações que Apoiam Mulheres
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Conheça e apoie essas organizações que fazem a diferença na vida de milhares de mulheres
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {orgs.map((org, i) => (
              <motion.a
                key={org.name}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                className="group rounded-2xl overflow-hidden glass-card card-hover"
              >
                <div className={`h-2 bg-gradient-to-r ${org.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-lg font-semibold group-hover:text-accent transition-colors">
                      {org.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{org.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "1 em 4", label: "mulheres sofrem violência" },
              { value: "180", label: "Central de Atendimento" },
              { value: "72h", label: "para medida protetiva" },
              { value: "100%", label: "gratuito e anônimo" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="p-4"
              >
                <p className="text-3xl font-display font-bold text-accent mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Doacoes;
