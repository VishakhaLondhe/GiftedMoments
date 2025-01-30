import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./slice";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const navigate = useNavigate();
  const reduxAction=useDispatch();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        const roleName = user.role.rolename;
        const usr=user;
        console.log(usr);
        console.log(roleName);



























        setMessage(`Login successful! `);
        //setIsLoginSuccessful(true);
        setIsLoginSuccessful(user);

        reduxAction(login())

        if (roleName === "Seller") {
          navigate("/seller_home")
        }
         else if (roleName === "Admin") {
          navigate("/admin_home")
        }
         else if (roleName === "Buyer") {
          navigate("/buyer_home")
        }
      } else {
        setMessage("Invalid email or password");
        setIsLoginSuccessful(false);
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
      setIsLoginSuccessful(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {

        setMessage("Registration successful");
        setIsLoginSuccessful(true);

      } else 
      {
        
        const errorMessage = await response.text();
        setMessage(`Registration failed: ${errorMessage}`);
        setIsLoginSuccessful(false);
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
      setIsLoginSuccessful(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">
          {isLoginSuccessful ? "Welcome back!" : "LOGIN"}
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
            <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
          </div>
        </form>
        {message && (
          <p
            className={`mt-3 text-center ${
              isLoginSuccessful ? "text-success" : "text-danger"
            }`}
          >
            {message}
          </p>
        
        )}
      </div>
    </div>
  );
};

export default LoginForm;



