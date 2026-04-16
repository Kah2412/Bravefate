import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ReactNode } from "react";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: string;
  onClick?: () => void;
  highlighted?: boolean;
}

export const ResourceCard = ({
  title,
  description,
  icon,
  onClick,
  highlighted,
}: ResourceCardProps) => {
  const Icon = Icons[icon as keyof typeof Icons] as React.ElementType || Icons.AlertCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ translateY: -4 }}
      onClick={onClick}
      className={`p-5 rounded-2xl transition-all cursor-pointer group 
        ${
          highlighted
            ? "gradient-accent text-accent-foreground shadow-lg shadow-accent/30"
            : "glass-card hover:border-accent/50"
        }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-xl flex-shrink-0 ${
            highlighted ? "bg-white/20" : "bg-accent/15 text-accent"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className={`text-xs ${highlighted ? "opacity-90" : "text-muted-foreground"}`}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

interface ResourceDetailProps {
  title: string;
  description: string;
  content: string;
  icon: string;
  tips?: string[];
  onClose?: () => void;
}

export const ResourceDetail = ({
  title,
  description,
  content,
  icon,
  tips,
  onClose,
}: ResourceDetailProps) => {
  const Icon = Icons[icon as keyof typeof Icons] as React.ElementType || Icons.AlertCircle;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="w-full max-w-2xl rounded-2xl bg-background p-8 shadow-2xl border border-border"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-accent/15 text-accent flex-shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-6">
        <p className="text-foreground leading-relaxed">{content}</p>

        {tips && tips.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Dicas importantes:</h3>
            <ul className="space-y-2">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="mt-8 w-full py-3 rounded-xl border border-border hover:bg-muted transition-colors font-medium"
        >
          Entendi
        </button>
      )}
    </motion.div>
  );
};

interface ContactCardProps {
  name: string;
  number: string;
  description: string;
  when: string;
  details?: string;
  color: "rose" | "coral" | "teal" | "gold" | "violet" | "wine";
}

export const ContactCard = ({
  name,
  number,
  description,
  when,
  details,
  color,
}: ContactCardProps) => {
  const colorClasses: Record<string, string> = {
    rose: "bg-rose-soft/15 text-rose-deep border-rose-soft/30",
    coral: "bg-coral/15 text-coral border-coral/30",
    teal: "bg-teal/15 text-teal border-teal/30",
    gold: "bg-gold/15 text-gold border-gold/30",
    violet: "bg-violet/15 text-violet border-violet/30",
    wine: "bg-wine/15 text-wine border-wine/30",
  };

  const colorBg: Record<string, string> = {
    rose: "bg-rose-deep text-white",
    coral: "bg-coral text-white",
    teal: "bg-teal text-white",
    gold: "bg-gold text-white",
    violet: "bg-violet text-white",
    wine: "bg-wine text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ translateY: -4 }}
      className={`p-6 rounded-2xl border ${colorClasses[color]} transition-all group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-sm mb-1">{name}</h3>
          <p className="text-xs opacity-75">{description}</p>
        </div>
      </div>

      <div className={`inline-block px-4 py-2 rounded-lg ${colorBg[color]} font-mono font-bold text-lg mb-4`}>
        {number}
      </div>

      <p className="text-xs opacity-85 mb-3">{when}</p>

      {details && (
        <p className="text-xs opacity-75 leading-relaxed border-t border-current/20 pt-3 mt-3">
          {details}
        </p>
      )}
    </motion.div>
  );
};

interface SelfAssessmentCardProps {
  question: string;
  yes: string;
  no: string;
  onAnswer: (answer: boolean) => void;
  progress?: number;
}

export const SelfAssessmentQuestion = ({
  question,
  yes,
  no,
  onAnswer,
  progress,
}: SelfAssessmentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl glass-card border border-border"
    >
      {progress !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted">
            <div
              className="h-full rounded-full gradient-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <p className="text-lg font-semibold mb-6">{question}</p>

      <div className="flex gap-3">
        <button
          onClick={() => onAnswer(true)}
          className="flex-1 py-3 rounded-xl border-2 border-rose-deep/30 text-rose-deep font-medium hover:bg-rose-deep/10 transition-all active:scale-95"
        >
          {yes}
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="flex-1 py-3 rounded-xl border-2 border-teal/30 text-teal font-medium hover:bg-teal/10 transition-all active:scale-95"
        >
          {no}
        </button>
      </div>
    </motion.div>
  );
};

interface QuoteCardProps {
  text: string;
  author?: string;
  highlighted?: boolean;
}

export const QuoteCard = ({ text, author, highlighted }: QuoteCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-6 rounded-2xl border-l-4 ${
        highlighted
          ? "gradient-accent text-accent-foreground border-accent shadow-lg shadow-accent/20"
          : "glass-card border-accent/30"
      }`}
    >
      <p className="text-lg leading-relaxed mb-3 italic">"{text}"</p>
      {author && <p className="text-sm opacity-75">— {author}</p>}
    </motion.div>
  );
};

interface AffirmationCardProps {
  text: string;
}

export const AffirmationCard = ({ text }: AffirmationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-xl gradient-accent text-accent-foreground text-center font-medium shadow-lg shadow-accent/20"
    >
      {text}
    </motion.div>
  );
};
