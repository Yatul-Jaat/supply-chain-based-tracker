import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import ConnectWallet from "./ConnectWallet";

const Navbar = () => {
  const [hambur, setHambur] = useState(false);

  return (
    <div className="flex justify-between items-center h-20 px-8 w-full text-lg text-black border-b-1">
      <p className="font-bold text-3xl cursor-pointer">
        <NavLink to="/">अन्नSEVA</NavLink>
      </p>

      {/* Desktop Menu */}
      <ul className="gap-10 hidden lg:flex uppercase *:hover:cursor-pointer *:hover:underline duration-300">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/listedproduct">Listed Products</NavLink>
        </li>
        <li>
          <NavLink to="/form">Add Listing</NavLink>
        </li>
        <li>
          <NavLink to="/roles">Roles</NavLink>
        </li>
      </ul>

      {/* Join Button */}
      <ConnectWallet />

      {/* Mobile Menu */}
      <div className="lg:hidden relative">
        <GiHamburgerMenu
          className="text-3xl cursor-pointer"
          onClick={() => setHambur(!hambur)}
        />
        {hambur && (
          <ul className="gap-2 flex flex-col uppercase *:hover:cursor-pointer absolute right-0 top-10 px-4 py-4 rounded-2xl bg-gray-600">
            <li>
              <NavLink to="/" onClick={() => setHambur(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/listedproduct" onClick={() => setHambur(false)}>
                Listed Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/form" onClick={() => setHambur(false)}>
                Add Listing
              </NavLink>
            </li>
            <li>
              <NavLink to="/roles" onClick={() => setHambur(false)}>
                Roles
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
