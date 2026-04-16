import { Character } from '@/types';
import {
  FighterState,
  AttackType,
  ATTACKS,
  createFighter,
  canUseHeavy,
  canUseSpecial,
  useSpecialMove,
  applyBlock,
  chargeEnergy,
  chargeSpecial,
  recoverStamina,
  reduceCooldown,
  computeDamage,
  applyDamage,
} from '@/lib/game';
import { aplicarBuffsAoStatus, obterMensagemDoEvento } from '@/gameLogic/events';
import { applyDailyBuff, getBuffMessage } from '@/gameLogic/dailyBuff';

export interface CombatResult {
  attacker: FighterState;
  defender: FighterState;
  message: string;
  damage: number;
  impact: 'hit' | 'block' | 'special';
}

const HIT_FLASH = {
  light: 8,
  heavy: 14,
  special: 24,
};

const COMBAT_MESSAGES: Record<AttackType, string[]> = {
  light: ['Golpe preciso', 'Jab afiado', 'Aperto fatal'],
  heavy: ['Soco avassalador', 'Impacto brutal', 'Aço comprimido'],
  special: ['Pulso Radioativo', 'Explosão de Aura', 'Golpe ancestral'],
};

export const buildFighter = (character: Character, position: number): FighterState => {
  const baseFighter = createFighter(character, position);
  const boosted = aplicarBuffsAoStatus(character, baseFighter);
  const withDailyBuff = applyDailyBuff({ ...boosted, name: character.name } as any);
  
  return {
    ...withDailyBuff,
    action: 'idle',
    combo: 0,
    cooldown: 0,
    specialMeter: (withDailyBuff as any).specialMeter || boosted.specialMeter,
    stamina: (withDailyBuff as any).stamina || boosted.stamina,
  };
};

export const getEventMessage = (): string | null => obterMensagemDoEvento();

export const chooseEnemyAction = (enemy: FighterState, player: FighterState): AttackType | 'block' => {
  if (enemy.health < player.health * 0.8 && enemy.energy > 15) {
    return 'block';
  }

  if (canUseSpecial(enemy) && enemy.health <= player.health + 18) {
    return 'special';
  }

  if (enemy.energy >= ATTACKS.heavy.energyCost && canUseHeavy(enemy) && Math.random() > 0.45) {
    return 'heavy';
  }

  return Math.random() > 0.5 ? 'light' : 'block';
};

export const resolveAttack = (
  attacker: FighterState,
  defender: FighterState,
  attackType: AttackType
): CombatResult => {
  const config = ATTACKS[attackType];
  const damage = computeDamage(attacker, defender, attackType);
  const defenderAfter = applyDamage(defender, damage);

  const attackerAfter = {
    ...attacker,
    action: attackType === 'special' ? 'special' : attackType,
    energy: Math.max(0, attacker.energy - config.energyCost),
    specialMeter: Math.min(100, attacker.specialMeter + config.meterGain),
    stamina: Math.max(0, attacker.stamina - config.staminaCost),
    cooldown: attackType === 'special' ? 4 : Math.max(0, attacker.cooldown - 1),
  };

  const combatMessage = `${attacker.name} usa ${attackType === 'special' ? attacker.specialMoveName : config.label} e causa ${damage} de dano!`;

  return {
    attacker: attackerAfter,
    defender: defenderAfter,
    message: combatMessage,
    damage,
    impact: attackType === 'special' ? 'special' : 'hit',
  };
};

export const resolveBlock = (blocker: FighterState): CombatResult => {
  const blocked = applyBlock(blocker);

  return {
    attacker: blocked,
    defender: blocker,
    message: `${blocker.name} sustenta a guarda e absorve o impacto.`,
    damage: 0,
    impact: 'block',
  };
};

export const getHitFlashStrength = (attackType: AttackType): number => HIT_FLASH[attackType];

export const getCombatPopup = (attackType: AttackType, combo: number, isPlayer: boolean): string => {
  const fallback = COMBAT_MESSAGES[attackType][Math.floor(Math.random() * COMBAT_MESSAGES[attackType].length)];
  return combo >= 2
    ? `Combo ${combo}x! ${fallback}`
    : `${isPlayer ? 'Você' : 'Oponente'} ${fallback}`;
};

export const prepareTurnEnd = (fighter: FighterState): FighterState => {
  const energyBonus = fighter.action === 'block' ? 14 : 8;
  return reduceCooldown(recoverStamina(chargeSpecial(chargeEnergy(fighter, energyBonus), 8), 6));
};
