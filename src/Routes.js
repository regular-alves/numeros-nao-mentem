import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import BasicFoodBasket from "./Pages/BasicFoodBasket";
import President from "./Pages/President";
import Deflorestation from "./Pages/Deflorestation";
import NotFound from "./Pages/NotFound";
import Compare from "./Pages/Compare";
import FoodInsecurity from "./Pages/FoodInsecurity";

const AppRoutes = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/cesta-basica" element={<BasicFoodBasket />} />
        <Route path="/cesta-basica/:from" element={<BasicFoodBasket />} />
        <Route path="/cesta-basica/:from/:to" element={<BasicFoodBasket />} />

        <Route path="/desmatamento" element={<Deflorestation />} />
        <Route path="/desmatamento/:from" element={<Deflorestation />} />
        <Route path="/desmatamento/:from/:to" element={<Deflorestation />} />

        <Route path="/comparacao/" element={<Compare />} />
        <Route path="/comparacao/:slug1" element={<Compare />} />
        <Route path="/comparacao/:slug1/:slug2" element={<Compare />} />
        <Route path="/comparacao/:slug1/:slug2/:slug3" element={<Compare />} />

        <Route path="/inseguranca-alimentar" element={<FoodInsecurity />} />
        <Route path="/inseguranca-alimentar/:from" element={<FoodInsecurity />} />
        <Route path="/inseguranca-alimentar/:from/:to" element={<FoodInsecurity />} />

        <Route path="/presidentes/:presidentSlug" element={<President />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}


export default AppRoutes;