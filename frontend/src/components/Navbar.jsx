import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import ConnectWallet from "./ConnectWallet";

const Navbar = ({navColor,setNavColor}) => {
  const [hambur, setHambur] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center h-20 px-8 w-full text-lg text-black border-b-1">
        <p className="font-bold text-3xl cursor-pointer">
          <NavLink to="/">अन्नSEVA</NavLink>
        </p>

        {/* Desktop Menu */}
        <ul className="gap-10 hidden lg:flex uppercase *:hover:cursor-pointer underline-offset-3 *:hover:text-gray-600 duration-300 ">
          <li onClick={()=>{setNavColor("home")}} className={navColor==="home"?"underline text-xl":""} >
            <NavLink to="/">Home</NavLink>
          </li>
          <li onClick={()=>{setNavColor("listedproduct")}} className={navColor==="listedproduct"?"underline":""}>
            <NavLink to="/listedproduct">Listed Products</NavLink>
          </li>
          <li onClick={()=>{setNavColor("crops")}} className={navColor==="crops"?"underline":""}>
            <NavLink to="/crops">Total Crops</NavLink>
          </li>
          <li onClick={()=>{setNavColor("form")}} className={navColor==="form"?"underline":""}>
            <NavLink to="/form">Add Listing</NavLink>
          </li>
          <li onClick={()=>{setNavColor("role")}} className={navColor==="role"?"underline":""}>
            <NavLink to="/roles">Roles</NavLink>
          </li>
        </ul>

        {/* Join Button */}
        <div className="hidden lg:flex"><ConnectWallet/></div>  

        {/* Mobile Menu */}
        <div className="lg:hidden relative">
          <GiHamburgerMenu
            className="text-3xl cursor-pointer"
            onClick={() => setHambur(!hambur)}
          />
          {hambur && (
            <ul className=" z-100 gap-2 w-2xs flex flex-col uppercase *:hover:cursor-pointer absolute right-0 top-10 px-4 py-4 rounded-2xl bg-white border-1 ">
                <NavLink className="hover:bg-gray-200 px-4 py-2 rounded-lg" to="/" onClick={() => setHambur(false)}>
                  Home
                </NavLink>
                <NavLink className="hover:bg-gray-200 px-4 py-2 rounded-lg" to="/listedproduct" onClick={() => setHambur(false)}>
                  Listed Products
                </NavLink>

                <NavLink className="hover:bg-gray-200 px-4 py-2 rounded-lg" to="/crops" onClick={() => setHambur(false)}>Total Crops</NavLink>

                <NavLink className="hover:bg-gray-200 px-4 py-2 rounded-lg" to="/form" onClick={() => setHambur(false)}>
                  Add Listing
                </NavLink>

                <NavLink className="hover:bg-gray-200 px-4 py-2 rounded-lg" to="/roles" onClick={() => setHambur(false)}>
                  Roles
                </NavLink>
                <li  className="flex items-center justify-center hover:bg-white">
                <ConnectWallet/>
                </li>
            </ul>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
