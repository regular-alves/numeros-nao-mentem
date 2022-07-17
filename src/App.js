import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import BasicFoodBasket from "./Pages/BasicFoodBasket";
import President from "./Pages/President";
import Deflorestation from "./Pages/Deflorestation";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/cesta-basica" element={<BasicFoodBasket />} />
        <Route path="/desmatamento" element={<Deflorestation />} />
        <Route path="/presidentes/:presidentSlug" element={<President />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;