import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <p>Select your registration type:</p>
        <div className="d-grid gap-2">
          <Link to="/signup/seller" className="btn btn-primary">Register as Seller</Link>
          <Link to="/signup/buyer" className="btn btn-secondary">Register as Buyer</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
