import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Zap, RotateCcw, Trophy, Sparkles } from "lucide-react";
import { women } from "@/data/women";
import { saveGameSession } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { canUseSpecial, canUseHeavy, FighterState, AttackType, ATTACKS, applyDamage } from "@/lib/game";
import {
  buildFighter,
  chooseEnemyAction,
  resolveAttack,
  resolveBlock,
  getHitFlashStrength,
  getCombatPopup,
  prepareTurnEnd,
  getEventMessage,
} from "@/gameLogic/arenaEngine";

const getAvatar = (name: string) =>
  `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(name)}&backgroundColor=transparent`;

const isWorldUraniumDay = () => {
  const now = new Date();
  return now.getMonth() === 3 && now.getDate() === 15;
};

const buildCombatResult = (attacker: FighterState, defender: FighterState, attackType: AttackType) => {
  const result = resolveAttack(attacker, defender, attackType);
  const isCrit = attacker.gameClass === "Assassin" && Math.random() < 0.2;
  const isCuriePower = attacker.name === "Marie Curie" && isWorldUraniumDay();

  let damage = result.damage;
  if (isCrit) damage = Math.round(damage * 1.6);
  if (isCuriePower) damage = Math.round(damage * 1.5);

  const defenderAfter = applyDamage(defender, damage);
  const attackerAfter = { ...result.attacker };

  if (attacker.gameClass === "Caster") {
    const refund = Math.round(ATTACKS[attackType].energyCost * 0.2);
    attackerAfter.energy = Math.min(attackerAfter.maxEnergy, attackerAfter.energy + refund);
  }

  const suffix = [isCrit ? "CRITICAL HIT" : null, isCuriePower ? "URANIUM BOOST" : null]
    .filter(Boolean)
    .join(" • ");

  return {
    ...result,
    attacker: attackerAfter,
    defender: defenderAfter,
    damage,
    message: `${attacker.name} usa ${attackType === "special" ? attacker.specialMoveName : ATTACKS[attackType].label} e causa ${damage} de dano!${suffix ? ` ${suffix}` : ""}`,
  };
};

type BattlePhase = "select" | "battle" | "result";

type PlayerAction = "attack" | "heavy" | "block" | "special" | null;

const Arena = () => {
  const [phase, setPhase] = useState<BattlePhase>("select");
  const [fighter1, setFighter1] = useState<typeof women[0] | null>(null);
  const [fighter2, setFighter2] = useState<typeof women[0] | null>(null);
  const [winner, setWinner] = useState<typeof women[0] | null>(null);
  const [classFilter, setClassFilter] = useState<string | null>(null);
  const [battleFighters, setBattleFighters] = useState<FighterState[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [battleShake, setBattleShake] = useState(0);
  const [hitFlash, setHitFlash] = useState(false);
  const [effectMessage, setEffectMessage] = useState<string | null>(null);
  const [playerAction, setPlayerAction] = useState<PlayerAction>(null);
  const animationRef = useRef<number>();
  const { toast } = useToast();

  const pool = women.filter((w) => !classFilter || w.gameClass === classFilter);

  const showBattleFeedback = useCallback((message: string, intensity: number) => {
    setEffectMessage(message);
    setBattleShake(intensity);
    setHitFlash(true);
    if (animationRef.current) {
      window.clearTimeout(animationRef.current);
    }
    animationRef.current = window.setTimeout(() => {
      setHitFlash(false);
      setBattleShake(0);
    }, 180);
  }, []);

  const startBattle = useCallback(() => {
    if (!fighter1 || !fighter2) return;

    const f1 = buildFighter(fighter1, 22);
    const f2 = buildFighter(fighter2, 78);
    const eventMessage = getEventMessage();

    setBattleFighters([f1, f2]);
    setCurrentTurn(0);
    setBattleLog(eventMessage ? [eventMessage] : []);
    setPhase("battle");
    setWinner(null);
    setPlayerAction(null);
    setEffectMessage(eventMessage);
  }, [fighter1, fighter2]);

  const performAttack = useCallback(
    async (attackType: AttackType) => {
      if (isAnimating || phase !== "battle" || currentTurn !== 0) return;
      if (!battleFighters[0] || !battleFighters[1]) return;

      setPlayerAction(attackType === "heavy" ? "heavy" : attackType === "special" ? "special" : "attack");
      setIsAnimating(true);

      const attacker = battleFighters[0];
      const defender = battleFighters[1];
      const result = buildCombatResult(attacker, defender, attackType);
      const popup = getCombatPopup(attackType, attacker.combo + 1, true);

      window.setTimeout(() => {
        setBattleFighters([
          prepareTurnEnd({ ...result.attacker, action: attackType }),
          prepareTurnEnd({ ...result.defender, action: result.defender.health > 0 ? "hit" : "defeat" }),
        ]);

        setBattleLog((prev) => [popup, result.message, ...prev].slice(0, 10));
        showBattleFeedback(result.message, getHitFlashStrength(attackType));

        if (result.defender.health <= 0) {
          window.setTimeout(() => {
            setBattleFighters((prev) => [
              { ...prev[0], action: "victory" },
              { ...prev[1], action: "defeat" },
            ]);
            setWinner(fighter1);
            setPhase("result");
            setIsAnimating(false);
          }, 900);
          return;
        }

        window.setTimeout(() => {
          setBattleFighters((prev) => [
            { ...prev[0], action: "idle" },
            { ...prev[1], action: prev[1].health > 0 ? "idle" : "defeat" },
          ]);
          setCurrentTurn(1);
          setIsAnimating(false);
        }, 850);
      }, 50);
    },
    [battleFighters, currentTurn, fighter1, isAnimating, phase, showBattleFeedback]
  );

  const performBlock = useCallback(() => {
    if (isAnimating || phase !== "battle" || currentTurn !== 0) return;
    if (!battleFighters[0]) return;

    setPlayerAction("block");
    setIsAnimating(true);

    const blocker = resolveBlock(battleFighters[0]);
    setBattleFighters((prev) => [
      { ...blocker.attacker, action: "block" },
      { ...prev[1] },
    ]);
    setBattleLog((prev) => [`${battleFighters[0].name} constrói uma guarda sólida.`, ...prev].slice(0, 10));
    showBattleFeedback("Bloqueio perfeito!", 6);

    window.setTimeout(() => {
      setBattleFighters((prev) => [
        { ...prev[0], action: "idle" },
        { ...prev[1] },
      ]);
      setCurrentTurn(1);
      setIsAnimating(false);
    }, 650);
  }, [battleFighters, currentTurn, isAnimating, phase, showBattleFeedback]);

  const handlePlayerAction = (action: PlayerAction) => {
    if (action === "attack") return performAttack("light");
    if (action === "heavy") return performAttack("heavy");
    if (action === "special") return performAttack("special");
    if (action === "block") return performBlock();
  };

  const reset = () => {
    setPhase("select");
    setFighter1(null);
    setFighter2(null);
    setWinner(null);
    setBattleFighters([]);
    setBattleLog([]);
    setPlayerAction(null);
    setEffectMessage(null);
    setBattleShake(0);
    setHitFlash(false);
    if (animationRef.current) {
      window.clearTimeout(animationRef.current);
    }
  };

  useEffect(() => {
    const saveSession = async () => {
      if (!winner || battleFighters.length !== 2) return;
      try {
        await saveGameSession({
          character1: battleFighters[0],
          character2: battleFighters[1],
          winner: { name: winner.name, gameClass: winner.gameClass },
          duration: 0,
          moves: battleLog.map((message) => ({ character: "", move: message, damage: 0 })),
          experienceGained: 20,
          isPlayerWinner: winner.name === battleFighters[0].name,
        });
        toast({
          title: "Session saved",
          description: "Your battle progress has been recorded.",
        });
      } catch (error) {
        console.warn('Game session not saved:', error);
      }
    };

    if (phase === "result") {
      saveSession();
    }
  }, [phase, winner, battleFighters, battleLog, toast]);

  const randomBattle = () => {
    const shuffled = [...women].sort(() => Math.random() - 0.5);
    setFighter1(shuffled[0]);
    setFighter2(shuffled[1]);
  };

  useEffect(() => {
    if (phase !== "battle" || battleFighters.length !== 2 || currentTurn !== 1 || isAnimating) return;

    const timer = window.setTimeout(() => {
      const enemy = battleFighters[1];
      const player = battleFighters[0];
      const enemyAction = chooseEnemyAction(enemy, player);

      if (enemyAction === "block") {
        const result = resolveBlock(enemy);
        setBattleFighters((prev) => [
          { ...prev[0] },
          { ...result.attacker, action: "block" },
        ]);
        setBattleLog((prev) => [`${enemy.name} bloqueia e se prepara para contra-atacar.`, ...prev].slice(0, 10));
        showBattleFeedback("Defesa calculada", 6);
        window.setTimeout(() => {
          setBattleFighters((prev) => [
            { ...prev[0] },
            { ...prev[1], action: "idle" },
          ]);
          setCurrentTurn(0);
          setIsAnimating(false);
        }, 700);
        return;
      }

      const result = resolveAttack(enemy, player, enemyAction);
      setBattleFighters([
        prepareTurnEnd({ ...result.defender, action: result.defender.health > 0 ? "hit" : "defeat" }),
        prepareTurnEnd({ ...result.attacker, action: enemyAction }),
      ]);
      setBattleLog((prev) => [`${enemy.name} acertou ${result.damage}!`, ...prev].slice(0, 10));
      showBattleFeedback(result.message, getHitFlashStrength(enemyAction));

      if (result.defender.health <= 0) {
        window.setTimeout(() => {
          setBattleFighters((prev) => [
            { ...prev[0], action: "defeat" },
            { ...prev[1], action: "victory" },
          ]);
          setWinner(fighter2);
          setPhase("result");
          setIsAnimating(false);
        }, 900);
        return;
      }

      window.setTimeout(() => {
        setBattleFighters((prev) => [
          { ...prev[0], action: "idle" },
          { ...prev[1], action: "idle" },
        ]);
        setCurrentTurn(0);
        setIsAnimating(false);
      }, 900);
    }, 850 + Math.random() * 350);

    return () => window.clearTimeout(timer);
  }, [battleFighters, currentTurn, isAnimating, phase, fighter2, showBattleFeedback]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 text-gradient">
            Arena Fate
          </h1>
          <p className="text-muted-foreground">
            Batalhas épicas entre mulheres lendárias — agora com mais presença e impacto.
          </p>
        </div>

        {phase === "select" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <button
                onClick={() => setClassFilter(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  !classFilter ? "gradient-accent text-accent-foreground" : "bg-slate-900 text-slate-300"
                }`}
              >
                Todas as Classes
              </button>
              {Array.from(new Set(women.map((w) => w.gameClass).filter(Boolean))).map((c) => (
                <button
                  key={c}
                  onClick={() => setClassFilter(c!)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    classFilter === c ? "gradient-accent text-accent-foreground" : "bg-slate-900 text-slate-300"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex flex-col xl:flex-row items-center justify-center gap-8 mb-10">
              <FighterSlot fighter={fighter1} label="Guerreira 1" onClear={() => setFighter1(null)} />
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-slate-950/80 p-4 shadow-xl shadow-cyan-500/10">
                  <Swords className="w-12 h-12 text-accent" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">VS</span>
              </div>
              <FighterSlot fighter={fighter2} label="Guerreira 2" onClear={() => setFighter2(null)} />
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
              <button
                onClick={randomBattle}
                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-100 shadow-lg shadow-slate-950/20 transition hover:bg-slate-800"
              >
                <RotateCcw className="w-4 h-4" /> Sorteio
              </button>
              <button
                onClick={startBattle}
                disabled={!fighter1 || !fighter2}
                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:opacity-90 disabled:opacity-40"
              >
                <Zap className="w-4 h-4" /> Batalhar!
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {pool.map((w) => (
                <button
                  key={w.name}
                  onClick={() => {
                    if (!fighter1) setFighter1(w);
                    else if (!fighter2 && w.name !== fighter1?.name) setFighter2(w);
                  }}
                  disabled={w.name === fighter1?.name || w.name === fighter2?.name}
                  className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-left transition hover:-translate-y-1 hover:border-accent/30 disabled:opacity-40"
                >
                  <div className="mb-4 flex items-center justify-center h-16 w-16 rounded-full border-2 border-accent bg-slate-900 overflow-hidden">
                    <img src={getAvatar(w.name)} alt={w.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-100 truncate">{w.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300 mt-1">{w.gameClass}</p>
                    <p className="mt-2 text-xs text-slate-400 line-clamp-2">{w.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "battle" && battleFighters.length === 2 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6">
            <div className="w-full max-w-5xl rounded-[32px] border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <FighterHUD fighter={battleFighters[0]} isActive={currentTurn === 0} />
                <div className="text-center px-4">
                  <div className="text-xl font-semibold tracking-[0.28em] text-accent uppercase">ROUND {Math.floor(battleLog.length / 2) + 1}</div>
                  <div className="text-sm text-slate-400 mt-2">Agora: {battleFighters[currentTurn].name}</div>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
                    <Sparkles className="w-4 h-4 text-cyan-300" /> Arena Premium
                  </div>
                </div>
                <FighterHUD fighter={battleFighters[1]} isActive={currentTurn === 1} />
              </div>
            </div>

            <motion.div
              animate={{ x: battleShake }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className={`relative w-full max-w-5xl h-[460px] overflow-hidden rounded-[36px] border-4 border-white/10 bg-[#07111f] shadow-2xl shadow-slate-950/50 ${battleShake > 0 ? 'animate-shake' : ''}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_45%),linear-gradient(180deg,_rgba(10,18,31,0.98)_0%,_rgba(2,6,12,0.98)_100%)]" />
              <div className="absolute left-12 top-20 h-24 w-24 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="absolute right-12 top-28 h-28 w-28 rounded-full bg-violet-500/10 blur-3xl" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 via-transparent" />

              {hitFlash && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.45 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0 bg-white/20 mix-blend-screen"
                />
              )}

              <AnimatePresence>
                {effectMessage && (
                  <motion.div
                    key={effectMessage}
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-1/2 top-12 -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/90 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-100 shadow-lg shadow-black/30"
                  >
                    {effectMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {battleFighters.map((fighter, index) => (
                <motion.div
                  key={fighter.name}
                  className="absolute bottom-10"
                  style={{ left: `${index === 0 ? 18 : 82}%`, transform: "translateX(-50%)" }}
                  animate={{
                    x:
                      fighter.action === "light"
                        ? index === 0
                          ? 24
                          : -24
                        : fighter.action === "heavy"
                        ? index === 0
                          ? 34
                          : -34
                        : 0,
                    scale: fighter.action === "hit" ? 0.92 : fighter.action === "special" ? 1.05 : 1,
                    rotate: fighter.action === "hit" ? (index === 0 ? -4 : 4) : 0,
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <div className={`relative ${fighter.action === "victory" ? "animate-bounce" : ""}`}>
                    <div
                      className={`w-28 h-28 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                        fighter.action === "block"
                          ? "border-cyan-300 shadow-cyan-300/50 shadow-lg"
                          : fighter.action === "hit"
                          ? "border-rose-400 shadow-rose-400/40 shadow-lg"
                          : fighter.action === "special"
                          ? "border-yellow-400 shadow-yellow-400/45 shadow-xl"
                          : "border-accent shadow-accent/20"
                      } bg-slate-950`}
                    >
                      <img src={getAvatar(fighter.name)} alt={fighter.name} className="w-full h-full object-cover" />
                    </div>

                    <AnimatePresence>
                      {fighter.action === "special" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          className="absolute inset-0 rounded-full border-2 border-yellow-300/70"
                        />
                      )}
                    </AnimatePresence>

                    <div className="text-center mt-3 space-y-1">
                      <div className="text-sm font-bold text-slate-100 drop-shadow-lg">{fighter.name}</div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-300 drop-shadow">{fighter.gameClass}</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="absolute left-1/2 top-28 -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/70 p-3 shadow-2xl shadow-slate-950/30">
                <Swords className="w-8 h-8 text-accent" />
              </div>
            </motion.div>

            <div className="w-full max-w-5xl mt-6 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 shadow-2xl shadow-slate-950/25">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Combate</p>
                    <h2 className="text-2xl font-semibold text-slate-100">Relatórios ao vivo</h2>
                  </div>
                  <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">Impacto real</span>
                </div>
                <div className="space-y-3 text-sm text-slate-300">
                  {battleLog.slice(-6).map((log, index) => (
                    <div key={`${log}-${index}`} className="rounded-2xl bg-slate-900/70 p-3 border border-white/5 shadow-inner shadow-black/10">
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-slate-950/25">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">Comandos de combate</h3>
                    <p className="text-sm text-slate-400">Ataque leve, pesado, especial e bloqueio com resposta visual.</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-300">
                    {currentTurn === 0 ? 'Sua vez' : 'Adversária'}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => handlePlayerAction('attack')}
                    disabled={currentTurn !== 0 || isAnimating}
                    className="rounded-3xl bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-4 text-left text-sm font-semibold text-white shadow-lg shadow-slate-950/30 transition hover:-translate-y-0.5 disabled:opacity-40"
                  >
                    <span className="block text-xs uppercase tracking-[0.24em] text-slate-400">Golpe rápido</span>
                    <span className="mt-2 block text-base text-slate-100">Ataca com velocidade e controle.</span>
                  </button>
                  <button
                    onClick={() => handlePlayerAction('heavy')}
                    disabled={currentTurn !== 0 || isAnimating || !canUseHeavy(battleFighters[0])}
                    className="rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-4 text-left text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:-translate-y-0.5 disabled:opacity-40"
                  >
                    <span className="block text-xs uppercase tracking-[0.24em] text-slate-200">Golpe pesado</span>
                    <span className="mt-2 block text-base text-slate-100">Dano maior, movimento mais lento.</span>
                  </button>
                </div>
                <button
                  onClick={() => handlePlayerAction('special')}
                  disabled={currentTurn !== 0 || isAnimating || !canUseSpecial(battleFighters[0])}
                  className="mt-4 w-full rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 disabled:opacity-40"
                >
                  Poder especial: {battleFighters[0].specialMoveName}
                </button>
                <button
                  onClick={() => handlePlayerAction('block')}
                  disabled={currentTurn !== 0 || isAnimating}
                  className="mt-4 w-full rounded-3xl bg-slate-800 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-950/30 transition hover:-translate-y-0.5 disabled:opacity-40"
                >
                  Guardião de Aço
                </button>
                <div className="mt-5 rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300">
                  <p className="font-semibold text-slate-100">Estratégia</p>
                  <p>Equilibre pressão e defesa. O especial vira o jogo quando usado no momento certo.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === "result" && winner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-6 py-20"
          >
            <div className="w-full max-w-3xl rounded-[36px] border border-white/10 bg-gradient-to-br from-amber-500/20 to-orange-500/10 p-10 text-center shadow-2xl shadow-amber-500/15">
              <div className="inline-flex items-center justify-center rounded-full bg-amber-500/10 p-4 mb-5 text-amber-200 shadow-inner shadow-amber-500/10">
                <Trophy className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-display font-black uppercase tracking-[0.3em] text-amber-100 mb-4">Vitória</h2>
              <p className="text-lg text-slate-100 mb-4">{winner.name} mostrou presença, impacto e controle total da arena.</p>
              <div className="mb-6 flex flex-wrap justify-center gap-3">
                <span className="rounded-full bg-slate-950/80 px-4 py-2 text-sm uppercase tracking-[0.18em] text-slate-200">Classe: {winner.gameClass}</span>
                <span className="rounded-full bg-slate-950/80 px-4 py-2 text-sm uppercase tracking-[0.18em] text-slate-200">Especial: {winner.specialMoveName}</span>
              </div>
              <button
                onClick={reset}
                className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
              >
                Nova batalha
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const FighterHUD = ({ fighter, isActive }: { fighter: FighterState; isActive: boolean }) => (
  <div className={`p-4 rounded-3xl border ${isActive ? "border-cyan-400/40 bg-slate-950/95 ring-2 ring-cyan-400/20" : "border-white/10 bg-slate-950/80"} shadow-2xl shadow-slate-950/15`}>
    <div className="mb-4 flex items-center gap-3">
      <img src={getAvatar(fighter.name)} className="w-12 h-12 rounded-full border-2 border-cyan-400/40 object-cover" />
      <div>
        <div className="font-semibold text-slate-100">{fighter.name}</div>
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{fighter.gameClass}</div>
      </div>
    </div>
    <div className="space-y-3">
      <StatusBar label="Vida" value={fighter.health} max={fighter.maxHealth} color="bg-rose-500" track="bg-slate-800" />
      <StatusBar label="Energia" value={fighter.energy} max={fighter.maxEnergy} color="bg-yellow-400" track="bg-slate-800" />
      <StatusBar label="Especial" value={fighter.specialMeter} max={100} color="bg-cyan-400" track="bg-slate-800" />
      <StatusBar label="Resistência" value={fighter.stamina} max={100} color="bg-violet-400" track="bg-slate-800" />
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-slate-400">
        <span>Cooldown</span>
        <span>{fighter.cooldown > 0 ? `${fighter.cooldown}s` : "Pronto"}</span>
      </div>
    </div>
  </div>
);

const StatusBar = ({ label, value, max, color, track }: { label: string; value: number; max: number; color: string; track: string }) => (
  <div>
    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-slate-500 mb-1">
      <span>{label}</span>
      <span>{value}/{max}</span>
    </div>
    <div className={`h-2 rounded-full ${track}`}>
      <div className={`${color} h-2 rounded-full transition-all duration-300`} style={{ width: `${Math.max(0, Math.min(100, (value / max) * 100))}%` }} />
    </div>
  </div>
);

const FighterSlot = ({ fighter, label, onClear }: { fighter: typeof women[0] | null; label: string; onClear: () => void }) => (
  <div className="w-56 h-64 rounded-3xl border border-dashed border-white/10 bg-slate-950/90 flex flex-col items-center justify-center gap-4 p-4 text-center shadow-2xl shadow-slate-950/10 relative">
    {fighter ? (
      <>
        <button onClick={onClear} className="absolute top-3 right-3 rounded-full bg-white/5 p-2 text-slate-300 hover:bg-white/10 transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-cyan-400/40 bg-slate-900">
          <img src={getAvatar(fighter.name)} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">{fighter.name}</p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mt-1">{fighter.gameClass}</p>
          <p className="mt-2 text-[11px] leading-snug text-slate-500">{fighter.description}</p>
        </div>
      </>
    ) : (
      <>
        <Swords className="w-10 h-10 text-slate-500" />
        <p className="text-sm font-semibold text-slate-300">{label}</p>
        <p className="text-[10px] text-slate-500">Escolha uma guerreira para a arena</p>
      </>
    )}
  </div>
);

export default Arena;
