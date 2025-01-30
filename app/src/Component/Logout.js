// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "./slice";
// export default function Logout()
// {
//     const navigate=useNavigate();
//     const dispatch=useDispatch();
//     localStorage.clear();
//     dispatch(logout())
//     navigate("/")
// }

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./slice";

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Clear local storage and dispatch logout
    localStorage.clear();
    dispatch(logout());

    // Navigate to the home page or login page
    navigate("/");

    return null; // Optionally return null since no UI is needed
}
