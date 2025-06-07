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
import { NavLink, Outlet } from "react-router-dom";
import Rolechange from "../components/Rolechange";

const Roles = ({setNavColor}) => {
  setNavColor("role")
  return (
    <>
      <Outlet />
    </>
  );
};

export default Roles;
