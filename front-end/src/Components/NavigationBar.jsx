import React from "react";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav className="bg-[#0089BA] p-4">
      <div className="logo text-2xl font-semibold text-white">
        <Link to="/">Evol Services</Link>
      </div>
      <ul className="nav-links flex space-x-4 text-white mt-2">
        <li>
          <Link to="/">Lista de Clientes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
