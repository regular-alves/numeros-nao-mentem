import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import BasicFoodBasket from "./Pages/BasicFoodBasket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cesta-basica" element={<BasicFoodBasket />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
