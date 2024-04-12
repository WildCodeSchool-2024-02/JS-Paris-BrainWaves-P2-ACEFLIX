import "./App.css";
import { useEffect } from "react";

function App() {

  const moviesFetch = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3'
  const seriesFetch = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3'

  useEffect(() => {
      fetch(seriesFetch)
          .then(response => response.json())
          .then(response => console.info(response.results.splice(0, 5)))
          .catch(err => console.error(err));
      fetch(moviesFetch)
          .then(response => response.json())
          .then(response => console.info(response.results.splice(0, 5)))
          .catch(err => console.error(err));
  }, [])

  return (
    <h1>Bonjour</h1>
  )
}

export default App;
