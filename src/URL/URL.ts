export const getDiscoverURL = (page: number) => {
  return `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=primary_release_date.desc`;
};

export const getSearchURL = (query: string, page: number) => {
  return `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
};

export const getMovieDetailsURL = (id: string) => {
  return `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=en-US`;
};
