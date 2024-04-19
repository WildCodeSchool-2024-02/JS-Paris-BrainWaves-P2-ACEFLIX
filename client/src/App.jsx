import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import BlackScreen from "./components/BlackScreen/BlackScreen";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div id="app">
      <Nav setIsOpen={setIsOpen} isOpen={isOpen} />
      {isOpen && <BlackScreen setIsOpen={setIsOpen} />}
      <Outlet />
    </div>
  );
}

export default App;
