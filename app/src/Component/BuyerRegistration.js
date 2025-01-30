// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const BuyerRegistration = () => {
//   const [formData, setFormData] = useState({
//     uname: "",
//     email: "",
//     password: "",
//     role: 3, // Assuming 3 is the fixed role ID for buyers
//     contact: "",
//     address: "",
//   });

//   const [message, setMessage] = useState("");
//   const [isSuccess, setIsSuccess] = useState(false);

//   // useEffect to clear the message after a timeout
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         setMessage("");
//       }, 3000);
//       return () => clearTimeout(timer); // Cleanup the timer
//     }
//   }, [message]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/users/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setIsSuccess(true);
//         setMessage("Buyer registered successfully!");
//         setFormData({
//           uname: "",
//           email: "",
//           password: "",
//           role: 3,
//           contact: "",
//           address: "",
//         });
//       } else {
//         const errorData = await response.json();
//         setIsSuccess(false);
//         setMessage(errorData.message || "Registration failed.");
//       }
//     } catch (error) {
//       setIsSuccess(false);
//       setMessage("An error occurred while registering the buyer.");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card shadow-lg p-4" style={{ width: "400px" }}>
//         <h2 className="text-center mb-4">Buyer Registration</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="uname" className="form-label">
//               Username:
//             </label>
//             <input
//               type="text"
//               id="uname"
//               name="uname"
//               className="form-control"
//               value={formData.uname}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="form-control"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password:
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="form-control"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="contact" className="form-label">
//               Contact:
//             </label>
//             <input
//               type="text"
//               id="contact"
//               name="contact"
//               className="form-control"
//               value={formData.contact}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="address" className="form-label">
//               Address:
//             </label>
//             <input
//               type="text"
//               id="address"
//               name="address"
//               className="form-control"
//               value={formData.address}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100">
//             Register
//           </button>
//         </form>

//         {message && (
//           <p
//             className={`mt-3 text-center ${
//               isSuccess ? "text-success" : "text-danger"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BuyerRegistration;



import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BuyerRegistration = () => {
  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    password: "",
    role: 3, // Assuming 3 is the fixed role ID for buyers
    contact: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // useEffect to clear the message after a timeout
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [message]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Call validation immediately after updating the form data
    validateForm({ [name]: value });
  };

  // Simple validation function
  const validateForm = (updatedField) => {
    const errors = { ...formErrors };

    // Validate Username
    if (updatedField.uname || formData.uname) {
      if (!formData.uname || formData.uname.length < 2) {
        errors.uname = "Username must be at least 2 characters long.";
      } else {
        delete errors.uname;
      }
    }

    // Validate Email
    if (updatedField.email || formData.email) {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email address.";
      } else {
        delete errors.email;
      }
    }

    // Validate Password
    if (updatedField.password || formData.password) {
      if (!formData.password || formData.password.length < 8 || formData.password.length > 12) {
        errors.password = "Password must be between 8 and 12 characters.";
      } else {
        delete errors.password;
      }
    }

    // Validate Contact Number (must be 10 digits)
    // if (updatedField.contact || formData.contact) {
    //   const contactRegex = /^\d{10}$/;
    //   if (!formData.contact || !contactRegex.test(formData.contact)) {
    //     errors.contact = "Contact number must be 10 digits.";
    //   } else {
    //     delete errors.contact;
    //   }
    // }

    if (updatedField.contact || formData.contact) {
      const contactRegex = /^\d{10}$/;
      if (!formData.contact || !contactRegex.test(formData.contact)) {
        errors.contact = "Contact number must be 10 digits.";
      } else {
        delete errors.contact;
      }
    }

    // Validate Address
    if (updatedField.address || formData.address) {
      if (!formData.address) {
        errors.address = "Address is required.";
      } else {
        delete errors.address;
      }
    }

    setFormErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submitting
    if (Object.keys(formErrors).length > 0) {
      setMessage("Please fix the errors in the form.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Buyer registered successfully!");
        setFormData({
          uname: "",
          email: "",
          password: "",
          role: 3,
          contact: "",
          address: "",
        });
      } else {
        const errorData = await response.json();
        setIsSuccess(false);
        setMessage(errorData.message || "Registration failed.");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("An error occurred while registering the buyer.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Buyer Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="uname" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="uname"
              name="uname"
              className="form-control"
              value={formData.uname}
              onChange={handleInputChange}
              required
            />
            {formErrors.uname && (
              <small className="text-danger">{formErrors.uname}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {formErrors.email && (
              <small className="text-danger">{formErrors.email}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {formErrors.password && (
              <small className="text-danger">{formErrors.password}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="contact" className="form-label">
              Contact:
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              className="form-control"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
            {formErrors.contact && (
              <small className="text-danger">{formErrors.contact}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            {formErrors.address && (
              <small className="text-danger">{formErrors.address}</small>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        {message && (
          <p
            className={`mt-3 text-center ${
              isSuccess ? "text-success" : "text-danger"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BuyerRegistration;
