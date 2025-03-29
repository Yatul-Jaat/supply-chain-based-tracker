import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Maindata from "../components/Maindata";
import Listedproduct from "../components/Listedproduct";
import { div } from "motion/react-client";


const Home = () => {
  return (
    <div>
      <Navbar />
      <Maindata />
    </div>
  );
};

export default Home;
