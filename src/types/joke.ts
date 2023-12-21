export interface IJoke {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

export interface IFavoriteJoke extends IJoke {
  isLiked: boolean;
  isDisliked: boolean;
}
