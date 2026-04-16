import { FighterState } from '../lib/game';
import { Character, GameEventBuff } from '../types';

const EVENTOS_ESPECIAIS: Record<string, GameEventBuff> = {
  '14/4': {
    personagem: 'Marie Curie',
    multiplierATK: 1.5,
    multiplierDEF: 1.1,
    unlockSpecialMove: 'Pulso Radioativo',
    message: 'A radiação está em nível crítico! Marie Curie recebe +50% de ataque.',
  },
  '23/11': {
    personagem: 'Leonardo Fibonacci',
    multiplierATK: 1.2,
    multiplierDEF: 1.3,
    unlockSpecialMove: 'Sequência da Morte',
    message: 'A ordem matemática se revela. Fibonacci recebe maior defesa e ataque aprimorado.',
  },
  '8/3': {
    personagem: 'Marie Curie',
    multiplierATK: 1.25,
    multiplierDEF: 1.2,
    unlockSpecialMove: 'Raio da Ciência',
    message: 'Dia Internacional da Mulher: as cientistas ganham poder adicional e foco de batalha.',
  },
};

export const obterBuffsDoDia = (): GameEventBuff | null => {
  const hoje = new Date();
  const diaMes = `${hoje.getDate()}/${hoje.getMonth() + 1}`;
  return EVENTOS_ESPECIAIS[diaMes] || null;
};

export const aplicarBuffsAoStatus = (
  character: Character,
  fighter: FighterState
): FighterState => {
  const buff = obterBuffsDoDia();

  if (!buff || buff.personagem !== character.name) {
    return fighter;
  }

  const boostedFighter: FighterState = {
    ...fighter,
    atk: Math.round(fighter.atk * (buff.multiplierATK ?? 1)),
    def: Math.round(fighter.def * (buff.multiplierDEF ?? 1)),
    specialMoveName: buff.unlockSpecialMove || fighter.specialMoveName,
  };

  console.log(`[EVENTO] Buff aplicado: ${buff.message}`);
  return boostedFighter;
};

export const obterMensagemDoEvento = (): string | null => {
  const buff = obterBuffsDoDia();
  return buff ? buff.message : null;
};
