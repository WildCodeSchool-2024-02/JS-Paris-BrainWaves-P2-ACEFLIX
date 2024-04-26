import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./suggest.css";

export default function Suggest({ id, type }) {
  const [suggest, setSuggest] = useState(null);
  const navigate = useNavigate();
  const theApiKey = import.meta.env.API_KEY;
  const urlSuggest = `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=1&api_key=${theApiKey}`;

  useEffect(() => {
    fetch(urlSuggest)
      .then((response) => response.json())
      .then((response) => setSuggest(response.results));
  });

  return (
    <div className="suggest-content">
      <h1 className="suggest-title">RECOMMENDED</h1>
      <div className="container-suggest">
        {suggest?.map(
          (content) =>
            content.backdrop_path && (
              <div
                key={content.id}
                className="card-suggest"
                onClick={() => navigate(`/final/${type}/${content.id}`)}
                role="presentation"
              >
                <img
                  className="img-suggest"
                  src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
                  alt="bannière"
                />
                <div className="bloc-text-container">
                  <div className="content-display">
                    <h2 className="title-context">
                      {type === "movie" ? content.original_title : content.name}
                    </h2>
                    <div className="bloc-container-all">
                      <div className="description-suggest">
                        <p className=" recommandation-suggest">
                          Average rating {Math.floor(content.vote_average * 10)}{" "}
                          %
                        </p>
                        <p className="language-suggest">
                          {content.original_language.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bloc-poster-container">
                    <img
                      className="img-poster-suggest"
                      src={`https://image.tmdb.org/t/p/original${content.poster_path}`}
                      alt="bannière"
                    />
                  </div>
                </div>
              </div>
            )
        )}
      </div> 
    </div>
  );
}

Suggest.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
