import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div>
      <Navbar />

      <main
        className=" overflow-scroll bg-warning-subtle main-container"
        id="container"
      >
        <Outlet />
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-top border-secondary pb-3 mb-3">
            <li className="nav-item">
              <Link tp="/" className="nav-link px-2 text-body-secondary">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link tp="/" className="nav-link px-2 text-body-secondary">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link tp="/" className="nav-link px-2 text-body-secondary">
                About Us
              </Link>
            </li>
          </ul>
          <p className="text-center text-body-secondary">
            &copy; 2025 Gifted Moments. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default Layout;
