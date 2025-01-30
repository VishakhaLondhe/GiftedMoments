import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary text-white py-3 fixed-top">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="mb-0">GIFTINGMOMENTS</h1>
        <div>
          <Link to="/login" className="btn btn-outline-light me-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-outline-light">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
