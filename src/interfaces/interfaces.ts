export interface IMovieCard {
  title: string;
  description: string;
  rating: number;
  image: string;
  id: number;
}

export interface IFetchMovies {
  url: string;
  token: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (a: any) => void;
  setLoading: (e: boolean) => void;
}
export interface IStore {
  movies: { movies: IMovieCard[]; search: IMovieCard[] };
}
