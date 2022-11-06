import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';

import SingleGif from "./single";
import MakeGrid from "./makegrid";

import './App.css';

function App() {

  return (
    <div className="App">
      <Navbar bg="black" className="mb-3 justify-content-center" expand="lg">
        <Link to="/"><img src="/logo.png" height="30" alt="Powered by GIPHY" /></Link>
      </Navbar>
      <Routes>
        <Route path="/" element={<MakeGrid />} />
        <Route path="gif/:id" element={<SingleGif />} />
      </Routes>
    </div>
  );
}

export default App;
