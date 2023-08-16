import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    search: [],
    searchPage: 0,
    moviesPage: 0,
  },
  reducers: {
    addMovies(state, action) {
      const type = action.payload.type; //could be search or could be movie list
      const append = action.payload.append;
      const page = action.payload.page;

      if (!append && type === "movieList") {
        state.movies = [];
      } else if (!append && type === "search") {
        state.search = [];
      }

      for (let x = 0; x < action.payload.movies.length; x++) {
        const id = action.payload.movies[x].id;
        const title = action.payload.movies[x].title;
        const description = action.payload.movies[x].overview;
        const rating = action.payload.movies[x].vote_average;
        const image = action.payload.movies[x].poster_path
          ? "http://image.tmdb.org/t/p/w342" +
            action.payload.movies[x].poster_path
          : "https://dummyimage.com/200x300/000/fff";

        if (type === "movieList") {
          state.movies.push({ id, title, description, rating, image });
          state.moviesPage = page;
        } else if (type === "search") {
          state.searchPage = page;
          state.search.push({ id, title, description, rating, image });
        }
      }
    },
  },
});

export const movieActions = moviesSlice.actions;

export default moviesSlice;
