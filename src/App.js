import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Views from "./Views";

function App() {
  return (
    <BrowserRouter>
      <Views />
    </BrowserRouter>
  );
}

export default App;
