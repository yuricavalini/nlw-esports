export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number
  }
}

export type GameOption = Omit<Game, 'bannerUrl' | '_count'>;
