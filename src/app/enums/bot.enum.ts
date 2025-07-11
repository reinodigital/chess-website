export enum BotDifficulty {
  BEGINNER = 'beginner', // (For new players learning the basics)
  CASUAL = 'casual', // (For players with some experience but still improving)
  INTERMEDIATE = 'intermediate', // (For those with a solid grasp of strategy and tactics)
  ADVANCED = 'advanced', // (For strong players who compete regularly)
  MASTER = 'master', // (For high-level players, including experts and titled players)
  GRANDMASTER = 'grandmaster', // (for elite players at the highest level)
}

export const ELO_RANGE: Record<BotDifficulty, { min: number; max: number }> = {
  [BotDifficulty.BEGINNER]: { min: 50, max: 500 },
  [BotDifficulty.CASUAL]: { min: 501, max: 1000 },
  [BotDifficulty.INTERMEDIATE]: { min: 1001, max: 1600 },
  [BotDifficulty.ADVANCED]: { min: 1601, max: 2200 },
  [BotDifficulty.MASTER]: { min: 2201, max: 2800 },
  [BotDifficulty.GRANDMASTER]: { min: 2801, max: 3300 },
};

export enum BotUserGameResult {
  GAME_WON = 'game_won',
  GAME_LOST = 'game_lost',
  GAME_TIED = 'game_tied',
}

export enum GameResult {
  WHITE_WINS = '1-0',
  BLACK_WINS = '0-1',
  DRAW = '1/2-1/2',
  UNFINISHED = '*',
}
