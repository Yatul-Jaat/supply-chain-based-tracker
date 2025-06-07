import { useState } from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Listedproduct from "./pages/Listedproduct";
import Roles from "./pages/Roles";
import Inputdata from "./pages/Inputdata";
import Navbar from "./components/Navbar";
import CropList from "./pages/CropList";
import FarmingState from "./components/stage/FarmingStage";
import ProcessingState from "./components/stage/ProcessingStage";
import RetailState from "./components/stage/RetailStage";
import DistributorState from "./components/stage/DistributorStage";
import FarmerRegistration from "./components/register/FarmerRegistration";
import ProcessorRegistration from "./components/register/ProcessorRegistered";
import RetailerRegistration from "./components/register/RetailerRegistered";
import DistributorRegistration from "./components/register/DistributorRegistration";
import Rolechange from "./components/Rolechange";
import Statechange from "./components/Statechange"



function Layout(){
  const[navColor,setNavColor]=useState("");
  return(
    <div className="h-full">
      <Navbar navColor={navColor} setNavColor={setNavColor} />
      <Routes>
        <Route path="/" element={<Home setNavColor={setNavColor}  />} />
        <Route path="listedproduct" element={<Listedproduct setNavColor={setNavColor} />}>
          <Route index element={<Statechange/>}/>
          <Route path="farming" element={<FarmingState />} />
          <Route path="processing" element={<ProcessingState />} />
          <Route path="distributing" element={<DistributorState />} />
          <Route path="retailing" element={<RetailState />} />
        </Route>
        <Route path="roles" element={<Roles setNavColor={setNavColor} />}>
        <Route index element={<Rolechange />} />
        <Route path="farmer" element={<FarmerRegistration />} />
        <Route path="processor" element={<ProcessorRegistration />} />
        <Route path="distributor" element={<DistributorRegistration />} />
        <Route path="retailer" element={<RetailerRegistration />} />

        </Route>
        <Route path="crops" element={<CropList setNavColor={setNavColor} />} />
        <Route path="form" element={<Inputdata setNavColor={setNavColor} />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
    <Layout />
  </Router>
    
  );
}

export default App;
