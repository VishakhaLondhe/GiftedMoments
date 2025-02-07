import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

function AdminLayout() {
  //  -   const user = useSelector((state) => state.user.userInfo);
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //- if (user?.role.roleId !== 2) {
    //   Swal.fire(
    //     "Error",
    //     "Unauthorize Access!",
    //     "error"
    //   ).then(async () => {
    //     navigate("/login");
    //     dispatch(logout());
    //     console.log(user);
    //   });
    //   return;
    // }
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <> Loading...</>
  ) : (
    <div className="d-flex">
      {/* Sidebar */}
      <nav
        className={`sidebar bg-dark text-light `}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <h3 className="text-center py-3">
          <Link to="/admin" className="text-light text-decoration-none">
            <i className="bi bi-person-circle"></i>
            <div className="mt-3">Admin Dashboard</div>
          </Link>
        </h3>{" "}
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="products" className="nav-link text-light">
              <i className="bi bi-box me-2"></i> Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="sellers" className="nav-link text-light">
              <i className="bi bi-person-lines-fill me-2"></i> Seller
            </Link>
          </li>
          <li className="nav-item">
            <Link to="brands" className="nav-link text-light">
              <i className="bi bi-tag-fill me-2"></i> Brands
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content flex-grow-1 bg-light">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout