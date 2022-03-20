import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Animal } from "./components/Animal";
import { Animals } from "./components/Animals";

function App() {
  return (
    <div className="App">
      <Animal></Animal>
      <Animals></Animals>
    </div>
  );
}

export default App;
