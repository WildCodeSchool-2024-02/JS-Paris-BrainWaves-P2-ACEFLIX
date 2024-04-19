import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import BlackScreen from "./components/BlackScreen/BlackScreen";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Header setIsOpen={setIsOpen} />
      <Nav setIsOpen={setIsOpen} isOpen={isOpen} />
      {isOpen && <BlackScreen setIsOpen={setIsOpen} />}
      <Outlet />
    </>
  );
}
