import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./actors.css";

function Actors({ type, id }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const actorsFetchURL = `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3`;

  useEffect(() => {
    fetch(actorsFetchURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((response) => {
        setData(response.cast);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [actorsFetchURL]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="credits-components">
      <h1 className="credits-title">CREDITS</h1>
      <div className="container">
        {data?.map(
          (actor) =>
            actor.profile_path && (
              <div className="actor-containt" key={actor.name}>
                <img
                  className="actor-img"
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={actor.name}
                />
                <div className="actor-name-container">
                  <p className="actor-name">{actor.name}</p>
                  <p className="character-name">{actor.character}</p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

Actors.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Actors;
