export type GameMoveType = 'light' | 'heavy' | 'special';

export interface GameMove {
  name: string;
  power: number;
  type: GameMoveType;
}

export interface Character {
  name: string;
  profession: string;
  description: string;
  category: string;
  era: string;
  gameClass?: string;
  gameSkill?: string;
  power?: number;
}

export interface GameEventBuff {
  personagem: string;
  multiplierATK?: number;
  multiplierDEF?: number;
  unlockSpecialMove?: string;
  message: string;
}
