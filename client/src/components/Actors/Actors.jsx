import { useEffect, useState } from "react";
import "./actors.css";

function Actors() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const actorsFetchURL =
    "https://api.themoviedb.org/3/movie/1363/credits?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";

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
    <div className="container">
      {data.length > 0 ? (
        data.map((actor) => (
          <div className="actor-containt" key={actor.name}>
            <img className="actor-img"
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.name}
            />
            <p className="actor-name">{actor.name}</p>
            <p className="character-name">{actor.character}</p>
          </div>
        ))
      ) : (
        <div>No actors found</div>
      )}
    </div>
  );
}

export default Actors;
