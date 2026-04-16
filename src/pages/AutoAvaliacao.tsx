import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { SelfAssessmentQuestion, QuoteCard } from "@/components/support/SupportCards";

interface Question {
  id: number;
  question: string;
  yes: string;
  no: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Você tem medo de como seu parceiro(a) reage quando fica bravo(a)?",
    yes: "Sim, frequentemente",
    no: "Não",
  },
  {
    id: 2,
    question: "Você evita certos tópicos por medo de provocar conflito?",
    yes: "Sim, sempre",
    no: "Não",
  },
  {
    id: 3,
    question: "Você se sente isolada de amigos e família?",
    yes: "Sim, cada vez mais",
    no: "Não",
  },
  {
    id: 4,
    question: "Seu parceiro(a) controla seu dinheiro ou gastos?",
    yes: "Sim",
    no: "Não",
  },
  {
    id: 5,
    question: "Você recebe críticas frequentes sobre sua aparência, inteligência ou capacidades?",
    yes: "Sim, constantemente",
    no: "Não",
  },
  {
    id: 6,
    question: "Você se sente responsável pelas emoções do seu parceiro(a)?",
    yes: "Sim, sempre",
    no: "Não",
  },
  {
    id: 7,
    question: "Houve qualquer tipo de contato físico violento ou intimidador?",
    yes: "Sim",
    no: "Não",
  },
  {
    id: 8,
    question: "Você questiona seus próprios sentimentos ou percepção das coisas?",
    yes: "Sim, sempre",
    no: "Não",
  },
  {
    id: 9,
    question: "Você sente que perdeu sua identidade ou interesses pessoais?",
    yes: "Sim, completamente",
    no: "Não",
  },
  {
    id: 10,
    question: "Você já pensou em sair mas sente que não pode ou que é perigoso?",
    yes: "Sim",
    no: "Não",
  },
];

type RiskLevel = null | "low" | "attention" | "high";

interface ResultContent {
  title: string;
  description: string;
  message: string;
  suggestions: string[];
  actions: string[];
  color: string;
}

const getResults = (score: number): ResultContent => {
  if (score <= 2) {
    return {
      title: "Risco Baixo",
      description:
        "Baseado em suas respostas, não parecem haver sinais preocupantes de violência no momento.",
      message:
        "Isso não significa que a relação seja perfeita. Relacionamentos saudáveis requerem comunicação, respeito e liberdade.",
      suggestions: [
        "Continuar observando padrões de comportamento",
        "Manter rede de amigos e família forte",
        "Demonstrar seus sentimentos claramente",
        "Procurar ajuda se algo mudar",
      ],
      actions: [
        "✅ Relacionamento presente está seguro",
        "✅ Mas continue vigilante com sinais",
        "✅ Conhecer os contatos de emergência mesmo assim",
      ],
      color: "teal",
    };
  } else if (score <= 6) {
    return {
      title: "Risco - Atenção Necessária",
      description:
        "Suas respostas indicam padrões que podem evoluir para abuso. É importante agir agora.",
      message:
        "Comportamentos controladores, críticos ou isolantes são avisos. Eles frequentemente aumentam com o tempo.",
      suggestions: [
        "Buscar orientação profissional (psicólogo, conselheiro)",
        "Conversar com pessoa de confiança sobre o que enfrentou",
        "Documentar incidentes preocupantes discretamente",
        "Planejar para sua segurança",
        "Contatar 180 para orientação confidencial",
      ],
      actions: [
        "⏸️ Situação requer cuidado e observação",
        "⏸️ Não ignore os seus sentimentos",
        "⏸️ Construir rede de apoio é essencial",
      ],
      color: "gold",
    };
  } else {
    return {
      title: "Risco Alto",
      description:
        "Suas respostas mostram padrões consistentes com abuso. Sua segurança é prioridade.",
      message:
        "Você não is responsável pelo comportamento abusivo. Nada que você fez causou isso. Você merece segurança.",
      suggestions: [
        "Entre em contato com linha de denúncia: 180 (24h, anônimo)",
        "Procure abrigo especializado em sua região",
        "Crie plano de saída com pessoa de confiança",
        "Procure delegacia de polícia especializada em violência doméstica",
        "Consulte advogada sobre medida protetiva de urgência",
        "Busque apoio psicológico",
      ],
      actions: [
        "🚨 Você está em situação de risco",
        "🚨 Procure ajuda imediatamente",
        "🚨 Não está sozinha - existem recursos",
      ],
      color: "rose",
    };
  }
};

const AutoAvaliacao = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (answer) {
      setScore((s) => s + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
    setShowResult(false);
  };

  const result = getResults(score);
  const progress = ((currentQuestion + answers.length) / questions.length) * 100;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-soft/20 text-rose-deep text-sm font-medium mb-6 border border-rose-soft/30">
            <AlertTriangle className="w-4 h-4" />
            Autoavaliação confidencial e segura
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-gradient">
            Como Está Seu Relacionamento?
          </h1>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Esta autoavaliação é anônima, confidencial e não substitui diagnóstico profissional. 
            Responda com sinceridade para melhor compreender sua situação.
          </p>
        </motion.div>

        {/* Quiz */}
        {!showResult ? (
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {currentQuestion < questions.length && (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <SelfAssessmentQuestion
                    question={questions[currentQuestion].question}
                    yes={questions[currentQuestion].yes}
                    no={questions[currentQuestion].no}
                    onAnswer={handleAnswer}
                    progress={Math.round(progress)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto"
          >
            <div
              className={`p-8 rounded-2xl border-2 mb-8 ${
                result.color === "teal"
                  ? "bg-teal/10 border-teal/30"
                  : result.color === "gold"
                    ? "bg-gold/10 border-gold/30"
                    : "bg-rose-soft/20 border-rose-deep/30"
              }`}
            >
              <h2 className={`text-3xl font-display font-bold mb-3 ${
                result.color === "teal"
                  ? "text-teal"
                  : result.color === "gold"
                    ? "text-gold"
                    : "text-rose-deep"
              }`}>
                {result.title}
              </h2>
              <p className="text-foreground mb-4 leading-relaxed">{result.description}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.message}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="text-2xl">📋</span> O que fazer agora
                </h3>
                <ul className="space-y-3">
                  {result.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex gap-3 text-sm">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="text-2xl">✅</span> Lembre-se
                </h3>
                <ul className="space-y-3">
                  {result.actions.map((action, idx) => (
                    <li key={idx} className="text-sm flex gap-3">
                      <span className="flex-1">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <QuoteCard
              text="Você não é responsável pelas ações de outra pessoa. Você é responsável apenas por suas próprias escolhas e sua segurança."
              highlighted
            />

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted transition-colors font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Refazer Avaliação
              </button>
              <a
                href="tel:180"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <AlertTriangle className="w-4 h-4" />
                Contatar 180
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AutoAvaliacao;
