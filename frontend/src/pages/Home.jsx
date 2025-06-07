import React from "react";
import Maindata from "../components/Maindata";


const Home = ({setNavColor}) => {
  setNavColor("home")
  return (
    <div>
      <Maindata />
    </div>
  );
};

export default Home;
