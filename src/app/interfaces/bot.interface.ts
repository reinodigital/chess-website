export interface IBotCountAndList {
  total: number;
  currentPage: number;
  bots: IBot[];
}

export interface IBot {
  id: number;
  name: string;
  gender: string;
  difficulty: string;
  description?: string;
  isActive: boolean;
  elo: number;
}

export interface IBotDataCreate {
  difficulty: string;
  name: string;
  gender: string;
  elo: number;
  description: string;
}
