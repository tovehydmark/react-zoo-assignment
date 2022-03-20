import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Animal } from "./components/Animal";
import { Animals } from "./components/Animals";
import { IAnimal } from "./models/IAnimal";

function App() {
  // let animalFromApp:IAnimal = {}
  return (
    <div className="App">
      <Animals></Animals>
    </div>
  );
}

export default App;
