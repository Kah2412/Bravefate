export type FighterAction = 'idle' | 'light' | 'heavy' | 'block' | 'hit' | 'special' | 'victory' | 'defeat';

export interface FighterState {
  name: string;
  gameClass: string;
  power: number;
  atk: number;
  def: number;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  action: FighterAction;
  position: number;
  combo: number;
  specialMeter: number;
  cooldown: number;
  stamina: number;
  specialMoveName: string;
}

export type AttackType = 'light' | 'heavy' | 'special';

export const ATTACKS: Record<AttackType, {
  multiplier: number;
  energyCost: number;
  meterGain: number;
  staminaCost: number;
  label: string;
}> = {
  light: { multiplier: 1.0, energyCost: 0, meterGain: 20, staminaCost: 8, label: 'Golpe leve' },
  heavy: { multiplier: 1.45, energyCost: 12, meterGain: 30, staminaCost: 24, label: 'Golpe pesado' },
  special: { multiplier: 2.6, energyCost: 40, meterGain: 0, staminaCost: 18, label: 'Golpe especial' }
};

const HEALTH_BASE = 130;
const BASE_DEFENSE_FACTOR = 0.22;

export const createFighter = (
  character: { name: string; gameClass?: string; power?: number; gameSkill?: string },
  position: number
): FighterState => ({
  name: character.name,
  gameClass: character.gameClass || 'Gladiadora',
  power: character.power || 92,
  atk: Math.max(18, Math.round((character.power || 92) * 1.1)),
  def: Math.max(12, Math.round((character.power || 92) * 0.2)),
  health: HEALTH_BASE,
  maxHealth: HEALTH_BASE,
  energy: 90,
  maxEnergy: 100,
  action: 'idle',
  position,
  combo: 0,
  specialMeter: 30,
  cooldown: 0,
  stamina: 100,
  specialMoveName: character.gameSkill || 'Impacto Supremo'
});

export const getAttackConfig = (type: AttackType) => ATTACKS[type];

export const computeDamage = (
  attacker: FighterState,
  defender: FighterState,
  attackType: AttackType
) => {
  const config = getAttackConfig(attackType);
  const baseDamage = attacker.atk * config.multiplier + attacker.combo * 4;
  const variance = 0.88 + Math.random() * 0.2;
  let damage = Math.round(baseDamage * variance);
  const effectiveDefense = Math.round(defender.def * BASE_DEFENSE_FACTOR);
  const blockMultiplier = defender.action === 'block' ? 0.28 : 1;
  damage = Math.max(8, Math.round((damage - effectiveDefense) * blockMultiplier));

  if (attackType === 'special') {
    damage += Math.round(attacker.combo * 3 + 14);
  }

  if (attacker.combo >= 2) {
    damage += Math.round(attacker.combo * 2.5);
  }

  return damage;
};

export const applyDamage = (defender: FighterState, damage: number) => {
  const nextHealth = Math.max(0, defender.health - damage);
  return { ...defender, health: nextHealth, action: 'hit' };
};

export const chargeEnergy = (fighter: FighterState, amount: number) => ({
  ...fighter,
  energy: Math.min(fighter.maxEnergy, fighter.energy + amount)
});

export const chargeSpecial = (fighter: FighterState, amount: number) => ({
  ...fighter,
  specialMeter: Math.min(100, fighter.specialMeter + amount)
});

export const recoverStamina = (fighter: FighterState, amount: number) => ({
  ...fighter,
  stamina: Math.min(100, fighter.stamina + amount)
});

export const applyBlock = (fighter: FighterState) => ({
  ...fighter,
  action: 'block',
  energy: Math.min(fighter.maxEnergy, fighter.energy + 10),
  specialMeter: Math.min(100, fighter.specialMeter + 16),
  stamina: Math.min(100, fighter.stamina + 8)
});

export const useSpecialMove = (fighter: FighterState) => ({
  ...fighter,
  energy: Math.max(0, fighter.energy - ATTACKS.special.energyCost),
  specialMeter: 0,
  cooldown: 4,
  action: 'special',
  stamina: Math.max(0, fighter.stamina - ATTACKS.special.staminaCost)
});

export const reduceCooldown = (fighter: FighterState) => ({
  ...fighter,
  cooldown: Math.max(0, fighter.cooldown - 1)
});

export const canUseSpecial = (fighter: FighterState) =>
  fighter.specialMeter >= 100 && fighter.energy >= ATTACKS.special.energyCost && fighter.cooldown === 0;

export const canUseHeavy = (fighter: FighterState) =>
  fighter.energy >= ATTACKS.heavy.energyCost && fighter.stamina >= ATTACKS.heavy.staminaCost;

export const getBattleOutcome = (fighter1: FighterState, fighter2: FighterState) => {
  if (fighter1.health <= 0) return fighter2;
  if (fighter2.health <= 0) return fighter1;
  return null;
};

export const isAlive = (fighter: FighterState) => fighter.health > 0;
