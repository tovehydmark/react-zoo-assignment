import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Animal } from "./components/Animal";
import { Animals } from "./components/Animals";

function App() {
  return (
    <div className="App">
      <Animals></Animals>
      <Animal></Animal>
    </div>
  );
}

export default App;
