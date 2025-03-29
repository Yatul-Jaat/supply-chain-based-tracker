import React from "react";
import DistributorRegistration from "../components/register/DistributorRegistration";
import FarmerRegistration from "../components/register/FarmerRegistration";
import ProcessorRegistration from "../components/register/ProcessorRegistered";
import RetailerRegistration from "../components/register/RetailerRegistered";
import Navbar from "../components/Navbar";
import DistributorDisplay from "../components/display/DistributorDisplay";
import FarmerDisplay from "../components/display/FarmerDisplay";
import ProcessorDisplay from "../components/display/ProcessorDisplay";
import RetailerDisplay from "../components/display/RetailerDisplay";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Roles = () => {

  const [Farmer,setFarmer] = React.useState(false);
  const [Processor,setProcessor] = React.useState(false);
  const [Retailer,setRetailer] = React.useState(false);
  const [Distributor,setDistributor] = React.useState(false);

  return (
    <div>

      <Navbar />
      <ul className="flex justify-center gap-12 my-5 text-xl font-semibold *:bg-gray-200 *:px-4 *:py-2 *:rounded-xl *:cursor-pointer">
        <li onClick={()=>{setFarmer(!Farmer)}}>Farmer</li>
        <li onClick={()=>{setProcessor(!Processor)}}>Processor</li>
        <li onClick={()=>{setRetailer(!Retailer)}}>Retailer</li>
        <li onClick={()=>{setDistributor(!Distributor)}}>Distributor</li>
      </ul>
      
      {Farmer && <FarmerRegistration />}
      {Farmer && <FarmerDisplay />}
      {Processor && <ProcessorRegistration />}
      {Processor && <ProcessorDisplay />}
      {Retailer && <RetailerRegistration />}
      {Retailer && <RetailerDisplay />}
      {Distributor && <DistributorRegistration />}
      {Distributor && <DistributorDisplay />}

    </div>
  );
};

export default Roles;
