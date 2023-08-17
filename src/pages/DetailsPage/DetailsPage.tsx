import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./details.module.css";
import { getMovieDetailsURL } from "../../URL/URL";
import {
  IFetchMovieDetails,
  IMovieDetails,
  IStore,
} from "../../interfaces/interfaces";
import { movieActions } from "../../store/movies-slice";
import { useDispatch, useSelector } from "react-redux";
import { RotateSpinner } from "react-spinners-kit";

const fetchMovieDetails: (e: IFetchMovieDetails) => void = async ({
  url,
  token,
  dispatch,
  setLoading,
}) => {
  try {
    setLoading(true);
    let details = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });

    details = details.data;

    console.log("details ", details);
    dispatch(movieActions.addMovieDetails({ details: details }));

    setLoading(false);
  } catch (err) {
    setLoading(false);
    console.log("err fetching movie details ", err);
  }
};

import { useSearchParams } from "react-router-dom";
const DetailsPage: React.FunctionComponent = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const token = import.meta.env.VITE_MOVIEDB;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const movieDetailsList: IMovieDetails[] = useSelector(
    (state: IStore) => state.movies.movie_details
  );

  const thisMovie = movieDetailsList.filter((el) => el.id === Number(id))[0];

  //   console.log(movieDetailsList);

  useEffect(() => {
    if (id && !thisMovie) {
      fetchMovieDetails({
        url: getMovieDetailsURL(id),
        token,
        setLoading,
        dispatch,
      });
    }
  }, [id]);

  if (loading || !thisMovie) {
    return (
      <div className={classes.loader}>
        <RotateSpinner color={"#4d4d4d"} />
      </div>
    );
  }

  const director = thisMovie.cast.crew.filter((el) => el.job === "Director")[0];

  return (
    <div className={classes.parent}>
      <div>
        <img height={"300"} width={"200"} src={thisMovie.image} alt="" />
      </div>
      <div className={classes.content}>
        <div className={classes.title_section}>
          <h2>{thisMovie.title}</h2>
          <span>(rating: {thisMovie.rating})</span>
        </div>
        <div>
          <div className={classes.year_and_run}>
            <span>{new Date(thisMovie.year).getFullYear()}</span> {" | "}
            <span>{thisMovie.length}</span>
            {director ? " | " : ""}
            {director ? <span>{director.name}</span> : ""}
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Cast</span>:{" "}
            {thisMovie.cast.cast.map((el, i) => (
              <span key={el.name}>
                {i === thisMovie.cast.cast.length - 1
                  ? el.name
                  : el.name + ", "}
              </span>
            ))}
          </div>
        </div>

        <p>
          <span style={{ fontWeight: "bold" }}>Description</span>
          {thisMovie.description}
        </p>
      </div>
    </div>
  );
};

export default DetailsPage;
