// Daily buff system - grants special bonuses on historical dates
interface DailyBuff {
  name: string;
  effect: string;
  atkMultiplier: number;
  defMultiplier: number;
  speedMultiplier: number;
  date: { month: number; day: number };
}

// Historical dates of famous women scientists (simplified to month/day)
const HISTORICAL_DATES: Record<string, DailyBuff> = {
  'Marie Curie': {
    name: 'Radiação Cósmica',
    effect: 'Marie Curie`s birthday boosts radioactive powers',
    atkMultiplier: 1.5,
    defMultiplier: 1.2,
    speedMultiplier: 1.0,
    date: { month: 11, day: 7 }, // November 7
  },
  'Ada Lovelace': {
    name: 'Algoritmo Ancestral',
    effect: 'Ada`s birthday enhances computational power',
    atkMultiplier: 1.4,
    defMultiplier: 1.1,
    speedMultiplier: 1.3,
    date: { month: 12, day: 10 }, // December 10
  },
  'Rosalind Franklin': {
    name: 'Foto 51 Amplificada',
    effect: 'Rosalind`s discovery day doubles structural analysis',
    atkMultiplier: 1.6,
    defMultiplier: 1.0,
    speedMultiplier: 1.2,
    date: { month: 4, day: 25 }, // April 25 (Photo 51 discovery around this time)
  },
  'Hypatia': {
    name: 'Sabedoria Alexandrina',
    effect: 'Hypatia`s wisdom grants ancient knowledge',
    atkMultiplier: 1.3,
    defMultiplier: 1.4,
    speedMultiplier: 1.1,
    date: { month: 3, day: 15 }, // Around spring equinox
  },
  'Florence Nightingale': {
    name: 'Lâmpada da Salvação',
    effect: 'Florence`s healing power activates',
    atkMultiplier: 1.1,
    defMultiplier: 1.6,
    speedMultiplier: 1.0,
    date: { month: 5, day: 12 }, // May 12 (International Nurses Day)
  },
};

interface FighterStateForBuff {
  name: string;
  atk: number;
  def: number;
  speed: number;
  baseAtk?: number;
  baseDef?: number;
  baseSpeed?: number;
}

export const applyDailyBuff = (fighter: FighterStateForBuff): FighterStateForBuff => {
  const now = new Date();
  const todayMonth = now.getMonth() + 1; // getMonth is 0-indexed
  const todayDay = now.getDate();

  const buff = HISTORICAL_DATES[fighter.name];

  if (buff && buff.date.month === todayMonth && buff.date.day === todayDay) {
    // It's their historical date! Apply multipliers
    return {
      ...fighter,
      atk: Math.floor(fighter.atk * buff.atkMultiplier),
      def: Math.floor(fighter.def * buff.defMultiplier),
      speed: Math.floor(fighter.speed * buff.speedMultiplier),
    };
  }

  // No special buff for today - apply passive based on class
  return applyPassiveBonus(fighter);
};

const applyPassiveBonus = (fighter: FighterStateForBuff): FighterStateForBuff => {
  // More refined passive bonuses based on the gameClass
  const classDefaults: Record<string, { atkBonus: number; defBonus: number; speedBonus: number }> = {
    Caster: { atkBonus: 1.15, defBonus: 0.9, speedBonus: 1.1 },
    Saber: { atkBonus: 1.3, defBonus: 1.1, speedBonus: 1.0 },
    Rider: { atkBonus: 1.0, defBonus: 0.95, speedBonus: 1.35 },
    Shielder: { atkBonus: 0.85, defBonus: 1.5, speedBonus: 0.8 },
    Assassin: { atkBonus: 1.4, defBonus: 0.8, speedBonus: 1.3 },
    Ruler: { atkBonus: 1.2, defBonus: 1.2, speedBonus: 1.0 },
    Archer: { atkBonus: 1.2, defBonus: 1.0, speedBonus: 1.15 },
    Avenger: { atkBonus: 1.45, defBonus: 0.9, speedBonus: 1.05 },
    Berserker: { atkBonus: 1.6, defBonus: 0.7, speedBonus: 1.1 },
  };

  const gameClass = (fighter as any).gameClass || 'Caster';
  const bonuses = classDefaults[gameClass] || classDefaults['Caster'];

  return {
    ...fighter,
    atk: Math.floor(fighter.atk * bonuses.atkBonus),
    def: Math.floor(fighter.def * bonuses.defBonus),
    speed: Math.floor(fighter.speed * bonuses.speedBonus),
  };
};

export const getBuffMessage = (fighter: FighterStateForBuff): string | null => {
  const now = new Date();
  const todayMonth = now.getMonth() + 1;
  const todayDay = now.getDate();

  const buff = HISTORICAL_DATES[fighter.name];
  if (buff && buff.date.month === todayMonth && buff.date.day === todayDay) {
    return `🌟 ${fighter.name} ativa seu poder especial: ${buff.name}!`;
  }

  return null;
};
