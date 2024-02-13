import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Filter from "./Filter";
import Header from "./Header";
import Detials1 from "./Detials1";

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/detail" element={<Detials1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
