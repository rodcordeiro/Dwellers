export type Dweller = {
  id?: string;
  name: string;
  lvl: number;
  gender: string;
  father?: string;
  mother?: string;
  Strength: number;
  Perception: number;
  Endurance: number;
  Charisma: number;
  Intelligence: number;
  Agility: number;
  Luck: number;
  born: Date;
  updatedAt: Date;
  job?: string;
};
