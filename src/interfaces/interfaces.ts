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

export interface ISearchMovies {
  url: string;
  token: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (a: any) => void;

  page: number;
  query: string;
  lastSearchQuery: string;
}

export interface IFetchMovieDetails {
  url: string;
  token: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (a: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setLoading: (a: any) => void;
}

export interface IMovieDetails {
  title: string;
  description: string;
  rating: number;
  image: string;
  id: number;
  cast: { cast: { name: string }[]; crew: { name: string; job: string }[] };
  year: string;
  length: string;
}
export interface IStore {
  movies: {
    movies: IMovieCard[];
    search: IMovieCard[];
    movie_details: IMovieDetails[];
    searchPage: number;
    moviesPage: number;
    lastSearchQuery: string;
  };
}
