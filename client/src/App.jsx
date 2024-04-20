import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import BlackScreen from "./components/BlackScreen/BlackScreen";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [homeActive, setHomeActive] = useState(true);
  const [movieActive, setMovieActive] = useState(false);
  const [serieActive, setSerieActive] = useState(false);
  return (
    <>
      <Header
        setIsOpen={setIsOpen}
        setHomeActive={setHomeActive}
        setMovieActive={setMovieActive}
        setSerieActive={setSerieActive}
      />
      <Nav
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setHomeActive={setHomeActive}
        homeActive={homeActive}
        setSerieActive={setSerieActive}
        serieActive={serieActive}
        setMovieActive={setMovieActive}
        movieActive={movieActive}
      />
      {isOpen && <BlackScreen setIsOpen={setIsOpen} />}
      <Outlet />
    </>
  );
}
