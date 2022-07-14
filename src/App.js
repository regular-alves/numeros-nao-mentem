import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTracking from './Components/PageTracking';

import Home from "./Pages/Home";
import BasicFoodBasket from "./Pages/BasicFoodBasket";
import President from "./Pages/President";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <PageTracking />
      <Routes>
        <Route path="/cesta-basica" element={<BasicFoodBasket />} />
        <Route path="/presidentes/:presidentSlug" element={<President />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
