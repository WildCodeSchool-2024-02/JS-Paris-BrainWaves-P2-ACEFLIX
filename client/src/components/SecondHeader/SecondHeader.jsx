import "./secondHeader.css";

export default function SecondHeader() {
  return (
    <div id="SecondHeader">
      <div className="SecondHeader-btn">
        <button type="button" value="movie">
          Movies
        </button>
        <button type="button">All</button>
        <button type="button" value="tv_serie">
          Series
        </button>
      </div>
    </div>
  );
}
