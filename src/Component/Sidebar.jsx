import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-white border-r border-r-black fixed top-0 left-0 h-screen w-56  ">
      <div className="flex flex-col gap-3 mt-14">
        <NavLink to="/Dashboard" className="text-center bg-black text-white py-[4px] hover:text-gray-400">Article</NavLink>
        <NavLink to="/DashMaga" className="text-center bg-black text-white py-[4px] hover:text-gray-400">Magasiene</NavLink>
        <NavLink to="/DashboardFourn" className="text-center bg-black text-white py-[4px] hover:text-gray-400">Fournisseur</NavLink>
      </div>
    </div>
  );
}
