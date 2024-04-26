import PropTypes from "prop-types";
import "./actors.css";

function Actors({ data, loading, error }) {
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
        {data?.map((actor) =>
          actor.profile_path ? (
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
          ) : (
            <div key={actor.name} className="actor-name-container">
              <p className="actor-name">{actor.name}</p>
              <p className="character-name">{actor.character}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

Actors.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      profile_path: PropTypes.string,
    }).isRequired
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

Actors.defaultProps = {
  error: null,
};

export default Actors;
