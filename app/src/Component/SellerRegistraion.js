// import React, { useReducer } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Define the initial state
// const initialState = {
//   uname: "",
//   email: "",
//   password: "",
//   contact: "",
//   address: "",
//   role: 2, // Set the default role to 2
//   gstNo: "",
//   regNo: "",
//   shopname: "",
//   message: "",
// };

// // Define the reducer function
// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_FIELD":
//       return {
//         ...state,
//         [action.field]: action.value,
//       };
//     case "SET_MESSAGE":
//       return {
//         ...state,
//         message: action.message,
//       };
//     default:
//       return state;
//   }
// };

// const SellerForm = () => {
//   const [state, dispatch] = useReducer(formReducer, initialState);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     dispatch({ type: "SET_FIELD", field: name, value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const sellerData = {
//       uname: state.uname,
//       email: state.email,
//       password: state.password,
//       contact: state.contact,
//       address: state.address,
      
//       role: state.role, // This will always be 2
//       gstNo: state.gstNo,
//       regNo: state.regNo,
//       shopname: state.shopname,
//     };
//     console.log(sellerData);

//     try {
//       const response = await fetch("http://localhost:8080/sellers/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(sellerData),
//       });

//       if (response.ok) {
//         const successMessage = await response.text();
//         dispatch({ type: "SET_MESSAGE", message: successMessage });
//       } else {
//         const errorMessage = await response.text();
//         dispatch({
//           type: "SET_MESSAGE",
//           message: `Registration failed: ${errorMessage}`,
//         });
//       }
//     } catch (error) {
//       dispatch({
//         type: "SET_MESSAGE",
//         message: `An error occurred: ${error.message}`,
//       });
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center  bg-light">
//       <div className="card shadow-lg p-4" style={{ width: "600px" }}>
//         <h2 className="text-center mb-4">Create Seller</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="uname" className="form-label">
//               Username
//             </label>
//             <input
//               type="text"
//               id="uname"
//               name="uname"
//               className="form-control"
//               value={state.uname}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="form-control"
//               value={state.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="form-control"
//               value={state.password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="contact" className="form-label">
//               Contact
//             </label>
//             <input
//               type="text"
//               id="contact"
//               name="contact"
//               className="form-control"
//               value={state.contact}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="address" className="form-label">
//               Address
//             </label>
//             <input
//               type="text"
//               id="address"
//               name="address"
//               className="form-control"
//               value={state.address}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="gstNo" className="form-label">
//               GST Number
//             </label>
//             <input
//               type="text"
//               id="gstNo"
//               name="gstNo"
//               className="form-control"
//               value={state.gstNo}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="regNo" className="form-label">
//               Registration Number
//             </label>
//             <input
//               type="text"
//               id="regNo"
//               name="regNo"
//               className="form-control"
//               value={state.regNo}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="shopname" className="form-label">
//               Shop Name
//             </label>
//             <input
//               type="text"
//               id="shopname"
//               name="shopname"
//               className="form-control"
//               value={state.shopname}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100">
//             Create Seller
//           </button>
//         </form>

//         {state.message && (
//           <p
//             className={`mt-3 text-center ${
//               state.message.includes("success")
//                 ? "text-success"
//                 : "text-danger"
//             }`}
//           >
//             {state.message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SellerForm;



import React, { useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Define the initial state
const initialState = {
  uname: "",
  email: "",
  password: "",
  contact: "",
  address: "",
  role: 2, // Set the default role to 2
  gstNo: "",
  regNo: "",
  shopname: "",
  message: "",
  errors: {},
};

// Define the reducer function
const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.message,
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

const SellerForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });

    // Validate input on every change
    validateForm({ [name]: value });
  };

  const validateForm = (updatedField) => {
    let errors = { ...state.errors };

    // Validate Username
    if (updatedField.uname || state.uname) {
      if (!state.uname || state.uname.length < 3) {
        errors.uname = "Username must be at least 3 characters.";
      } else {
        delete errors.uname;
      }
    }

    // Validate Email
    if (updatedField.email || state.email) {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!state.email || !emailRegex.test(state.email)) {
        errors.email = "Please enter a valid email address.";
      } else {
        delete errors.email;
      }
    }

    // Validate Password
    if (updatedField.password || state.password) {
      if (!state.password || state.password.length < 8 || state.password.length > 12) {
        errors.password = "Password must be between 8 and 12 characters.";
      } else {
        delete errors.password;
      }
    }

    // Validate Contact Number (must be 10 digits)
    // if (updatedField.contact || state.contact) {
    //   const contactRegex = /^\d{10}$/;
    //   if (!state.contact || !contactRegex.test(state.contact)) {
    //     errors.contact = "Contact number must be 10 digits.";
    //   } else {
    //     delete errors.contact;
    //   }
    // }


    // Validate Contact Number
if (updatedField.contact || state.contact) {
  const contactRegex = /^\d{10}$/; // Only 10 digits allowed
  if (!state.contact || !contactRegex.test(state.contact)) {
    errors.contact = "Contact number must be exactly 10 digits.";
  } else {
    delete errors.contact; // Remove error if the contact is valid
  }
}




      

      // Validate GST Number
if (updatedField.gstNo || state.gstNo) {
  // Remove leading and trailing spaces if any
  const trimmedGstNo = state.gstNo.trim();

  // Assuming GST number format: 15 characters, digits or uppercase letters
  const gstRegex = /^[0-9A-Z]{15}$/; // 15 characters, digits or uppercase letters

  if (!trimmedGstNo || !gstRegex.test(trimmedGstNo)) {
    errors.gstNo = "GST number must be exactly 15 characters long and consist of digits and uppercase letters.";
  } else {
    delete errors.gstNo; // Remove error if valid
  }
}


    // Validate Registration Number
if (updatedField.regNo || state.regNo) {
  const regNoRegex = /^[A-Za-z0-9]{10}$/; // 10 characters, alphanumeric
  if (!state.regNo || !regNoRegex.test(state.regNo)) {
    errors.regNo = "Registration number must be exactly 10 characters long and can contain letters and numbers.";
  } else {
    delete errors.regNo;
  }
}




    // Validate Shop Name
    if (updatedField.shopname || state.shopname) {
      if (!state.shopname) {
        errors.shopname = "Shop name is required.";
      } else {
        delete errors.shopname;
      }
    }

    dispatch({ type: "SET_ERRORS", errors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any errors before submitting
    if (Object.keys(state.errors).length > 0) {
      dispatch({ type: "SET_MESSAGE", message: "Please fix the errors in the form." });
      return;
    }

    const sellerData = {
      uname: state.uname,
      email: state.email,
      password: state.password,
      contact: state.contact,
      address: state.address,
      role: state.role,
      gstNo: state.gstNo,
      regNo: state.regNo,
      shopname: state.shopname,
    };

    try {
      const response = await fetch("http://localhost:8080/sellers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sellerData),
      });

      if (response.ok) {
        const successMessage = await response.text();
        dispatch({ type: "SET_MESSAGE", message: successMessage });
      } else {
        const errorMessage = await response.text();
        dispatch({
          type: "SET_MESSAGE",
          message: `Registration failed: ${errorMessage}`,
        });
      }
    } catch (error) {
      dispatch({
        type: "SET_MESSAGE",
        message: `An error occurred: ${error.message}`,
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg p-4" style={{ width: "600px" }}>
        <h2 className="text-center mb-4">Create Seller</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="uname" className="form-label">Username</label>
            <input
              type="text"
              id="uname"
              name="uname"
              className="form-control"
              value={state.uname}
              onChange={handleInputChange}
              required
            />
            {state.errors.uname && <small className="text-danger">{state.errors.uname}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={state.email}
              onChange={handleInputChange}
              required
            />
            {state.errors.email && <small className="text-danger">{state.errors.email}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={state.password}
              onChange={handleInputChange}
              required
            />
            {state.errors.password && <small className="text-danger">{state.errors.password}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="contact" className="form-label">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              className="form-control"
              value={state.contact}
              onChange={handleInputChange}
              required
            />
            {state.errors.contact && <small className="text-danger">{state.errors.contact}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={state.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="gstNo" className="form-label">GST Number</label>
            <input
              type="text"
              id="gstNo"
              name="gstNo"
              className="form-control"
              value={state.gstNo}
              onChange={handleInputChange}
              required
            />
            {state.errors.gstNo && <small className="text-danger">{state.errors.gstNo}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="regNo" className="form-label">Registration Number</label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              className="form-control"
              value={state.regNo}
              onChange={handleInputChange}
              required
            />
            {state.errors.regNo && <small className="text-danger">{state.errors.regNo}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="shopname" className="form-label">Shop Name</label>
            <input
              type="text"
              id="shopname"
              name="shopname"
              className="form-control"
              value={state.shopname}
              onChange={handleInputChange}
              required
            />
            {state.errors.shopname && <small className="text-danger">{state.errors.shopname}</small>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Create Seller</button>
        </form>

        {state.message && (
          <p
            className={`mt-3 text-center ${
              state.message.includes("success") ? "text-success" : "text-danger"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SellerForm;









