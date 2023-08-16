export const getDiscoverURL = (page: number) => {
  return `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=primary_release_date.desc`;
};
