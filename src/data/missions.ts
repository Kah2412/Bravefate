export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  target: string;
}

export const missions: Mission[] = [
  {
    id: 'first-battle',
    title: 'Primeira Vitória',
    description: 'Ganhe sua primeira batalha na Arena',
    reward: 50,
    target: 'win-first-battle'
  },
  {
    id: 'shield-sage',
    title: 'Escudo em Pé',
    description: 'Use bloqueio em duas batalhas diferentes',
    reward: 30,
    target: 'block-twice'
  },
  {
    id: 'legendary-fighter',
    title: 'Guerreira Lendária',
    description: 'Desbloqueie seu terceiro personagem',
    reward: 100,
    target: 'unlock-third-character'
  }
];