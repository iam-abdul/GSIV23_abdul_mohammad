import classes from "./movieCard.module.css";
import { IMovieCard } from "../../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
const MovieCard = (props: IMovieCard) => {
  const navigate = useNavigate();

  return (
    <div
      className={classes.parent}
      onClick={() => {
        navigate("/details?id=" + props.id);
      }}
    >
      <img src={props.image} alt="" />
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <div className={classes.rating}>
            <div
              style={{
                background: `conic-gradient(#21D07A ${
                  (props.rating / 100) * 360
                }deg, red 0deg)`,
              }}
              className={classes.circle}
            >
              <div className={classes.mask}>{props.rating}</div>
            </div>
          </div>
          <div className={classes.info}>
            <div className={classes.title}>
              <h3>{props.title}</h3>
            </div>
            <div className={classes.description}>{props.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
