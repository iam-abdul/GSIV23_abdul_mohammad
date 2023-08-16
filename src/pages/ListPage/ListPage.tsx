import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import classes from "./listPage.module.css";
import { IMovieCard, IFetchMovies, IStore } from "../../interfaces/interfaces";
import axios from "axios";
import { getDiscoverURL } from "../../URL/URL";
import { RotateSpinner } from "react-spinners-kit";
import { movieActions } from "../../store/movies-slice";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
// import.meta.env.VITE_BACKEND_URL

const fetchMovies: (e: IFetchMovies) => void = async ({
  url,
  token,
  setLoading,
  dispatch,
}) => {
  try {
    // setLoading(true);
    let movies = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });

    movies = movies.data.results;
    console.log("movies received ", movies);

    dispatch(
      movieActions.addMovies({
        movies: movies,
        append: true,
        type: "movieList",
      })
    );
    setLoading(false);
  } catch (err) {
    setLoading(false);
    console.log("Error in fetching movies");
  }
};

const ListMovies: React.FunctionComponent = () => {
  const token = import.meta.env.VITE_MOVIEDB;
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
  const moviesList: IMovieCard[] = useSelector(
    (state: IStore) => state.movies.movies
  );

  useEffect(() => {
    fetchMovies({
      url: getDiscoverURL(page),
      token: token,
      setLoading,
      dispatch,
    });
  }, [page]);

  console.log("the movies list ", moviesList);

  const loader = (
    <div className={classes.loader}>
      <RotateSpinner color={"#4d4d4d"} />
    </div>
  );

  if (loading) {
    return loader;
  }

  return (
    <InfiniteScroll
      dataLength={moviesList.length}
      next={() => {
        setPage((p) => p + 1);
      }}
      hasMore={true}
      loader={loader}
      style={{ overflow: "visible" }}
    >
      <div className={classes.parent}>
        {moviesList.map((el) => (
          <MovieCard key={el.id} {...el} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ListMovies;
