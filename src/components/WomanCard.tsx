import { motion } from "framer-motion";
import type { Woman } from "@/data/women";

const classColors: Record<string, string> = {
  Saber: "from-blue-400 to-blue-600",
  Caster: "from-violet-400 to-purple-600",
  Archer: "from-red-400 to-rose-600",
  Rider: "from-sky-400 to-cyan-600",
  Assassin: "from-gray-500 to-gray-700",
  Shielder: "from-amber-400 to-yellow-600",
  Ruler: "from-gold to-amber-600",
  Berserker: "from-red-600 to-red-800",
  Avenger: "from-rose-deep to-wine",
};

// Generate a unique avatar using DiceBear
const getAvatar = (name: string) =>
  `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(name)}&backgroundColor=transparent`;

interface Props {
  woman: Woman;
  index: number;
  onClick?: () => void;
  compact?: boolean;
}

const WomanCard = ({ woman, index, onClick, compact }: Props) => {
  const colorClass = classColors[woman.gameClass || "Caster"] || classColors.Caster;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.02 }}
        onClick={onClick}
        className="glass-card rounded-xl p-3 card-hover cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <img
            src={getAvatar(woman.name)}
            alt={woman.name}
            className="w-12 h-12 rounded-full bg-muted border-2 border-primary/30"
          />
          <div className="min-w-0">
            <h4 className="text-sm font-semibold truncate">{woman.name}</h4>
            <p className="text-xs text-muted-foreground">{woman.profession}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      onClick={onClick}
      className="glass-card rounded-2xl overflow-hidden card-hover cursor-pointer group"
    >
      <div className={`h-2 bg-gradient-to-r ${colorClass}`} />
      <div className="p-5 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img
            src={getAvatar(woman.name)}
            alt={woman.name}
            className="w-24 h-24 rounded-full bg-muted border-3 border-primary/30 group-hover:border-accent transition-colors"
          />
          {woman.gameClass && (
            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r ${colorClass} text-accent-foreground`}>
              {woman.gameClass}
            </span>
          )}
        </div>
        <h3 className="font-display text-lg font-semibold mb-1">{woman.name}</h3>
        <p className="text-xs font-medium text-accent mb-2">{woman.profession}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{woman.description}</p>
        {woman.power && (
          <div className="mt-3 w-full">
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span>Poder</span>
              <span>{woman.power}/100</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${woman.power}%` }}
                transition={{ delay: index * 0.03 + 0.3, duration: 0.6 }}
                className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WomanCard;
