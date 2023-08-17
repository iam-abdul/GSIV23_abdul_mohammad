import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import classes from "./listPage.module.css";
import {
  IMovieCard,
  IFetchMovies,
  IStore,
  ISearchMovies,
} from "../../interfaces/interfaces";
import axios from "axios";
import { getDiscoverURL, getSearchURL } from "../../URL/URL";
import { RotateSpinner } from "react-spinners-kit";
import { movieActions } from "../../store/movies-slice";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams, useLocation } from "react-router-dom";

// import.meta.env.VITE_BACKEND_URL

const fetchMovies: (e: IFetchMovies) => void = async ({
  url,
  token,
  setLoading,
  dispatch,
  page,
}) => {
  try {
    // setLoading(true);
    let movies = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });

    movies = movies.data.results;
    // console.log("movies received ", movies);

    dispatch(
      movieActions.addMovies({
        movies: movies,
        append: true,
        type: "movieList",
        page: page,
      })
    );
    setLoading(false);
  } catch (err) {
    setLoading(false);
    console.log("Error in fetching movies");
  }
};

const searchMovies: (e: ISearchMovies) => void = async ({
  url,
  token,
  dispatch,
  page,
  query,
  lastSearchQuery,
}) => {
  try {
    let searchResult = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });
    searchResult = searchResult.data.results;
    console.log("last search query ", lastSearchQuery);
    dispatch(
      movieActions.addMovies({
        movies: searchResult,
        append: page > 1,
        type: "search",
        page: page,
        query: query,
      })
    );
  } catch (err) {
    console.log("err searching movies ", err);
  }
};

const ListMovies: React.FunctionComponent = () => {
  const token = import.meta.env.VITE_MOVIEDB;
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const currentPath = useLocation().pathname;
  const moviesList: IMovieCard[] = useSelector(
    (state: IStore) => state.movies.movies
  );
  const searchMoviesList: IMovieCard[] = useSelector(
    (state: IStore) => state.movies.search
  );
  const moviesPage: number = useSelector(
    (state: IStore) => state.movies.moviesPage
  );
  const searchPage: number = useSelector(
    (state: IStore) => state.movies.searchPage
  );
  const lastSearchQuery: string = useSelector(
    (state: IStore) => state.movies.lastSearchQuery
  );
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    // reset the search store page and search query when user searches for something else
    if (query && query !== lastSearchQuery) {
      setPage(1);
      searchMovies({
        url: getSearchURL(query, 1),
        token: token,
        dispatch: dispatch,
        page: 1,
        query: query,
        lastSearchQuery,
      });
      dispatch(movieActions.newSearchResetStore());
      console.log("page : ", page);
    }
  }, [query]);

  // resetting the page and lastmessage page and search store when query changes

  useEffect(() => {
    if (currentPath === "/") {
      if ((page === 1 && moviesList.length === 0) || page > 1) {
        fetchMovies({
          url: getDiscoverURL(moviesPage + 1),
          token: token,
          setLoading,
          dispatch,
          page: moviesPage + 1,
        });
      }
    } else if (currentPath === "/search" && query) {
      if (page > 1) {
        searchMovies({
          url: getSearchURL(query, searchPage + 1),
          token: token,
          dispatch: dispatch,
          page: searchPage + 1,
          query: query,
          lastSearchQuery,
        });
      } else {
        console.log("the not working case ", page, searchMoviesList);
      }
    }
    console.log(
      `use effect page: ${page} -- search page: ${searchPage} -- query: ${query} -- last search query: ${lastSearchQuery}`
    );
  }, [page, query]);

  // console.log("the movies list ", searchMoviesList);

  const loader = (
    <div data-testid="list-movies-loading" className={classes.loader}>
      <RotateSpinner color={"#4d4d4d"} />
    </div>
  );

  if (loading) {
    return loader;
  }

  return (
    <InfiniteScroll
      dataLength={
        currentPath === "/" ? moviesList.length : searchMoviesList.length
      }
      next={() => {
        setPage((p) => p + 1);
      }}
      hasMore={true}
      loader={loader}
      style={{ overflow: "visible" }}
    >
      <div className={classes.parent}>
        {currentPath === "/search" && lastSearchQuery === query
          ? searchMoviesList.map((el) => <MovieCard key={el.id} {...el} />)
          : ""}

        {currentPath === "/"
          ? moviesList.map((el) => <MovieCard key={el.id} {...el} />)
          : ""}
      </div>
    </InfiniteScroll>
  );
};

export default ListMovies;
