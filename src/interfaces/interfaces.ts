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
  page: number;
}
export interface IStore {
  movies: {
    movies: IMovieCard[];
    search: IMovieCard[];
    searchPage: number;
    moviesPage: number;
    lastSearchQuery: string;
  };
}

export interface ISearchMovies {
  url: string;
  token: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (a: any) => void;
  page: number;
  query: string;
  lastSearchQuery: string;
}
