/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart, login, logout } from "../redux/store";

function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(login({ dashboardUrl: "" }));

    return () => {};
  }, []);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };
  const handleClear = () => {
    dispatch(clearCart());

    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-md fixed-top bg-warning shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <i className="bi bi-gift d-inline-block align-text-top"></i> Gifted
          Moments
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/products"
              >
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/contacts"
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">
                About Us
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav  justify-content-end me-3">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link">
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary position-relative text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClear();
                      }}
                    >
                      <i className="bi bi-bag me-1 text-bottom"></i> Cart{" "}
                      {cart.length > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cart.length}
                        </span>
                      )}
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="seller">
                    Seller Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-dark px-4" to="login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
