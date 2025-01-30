import { Link, Outlet } from "react-router-dom";

export default function SellerHome(){
    return (
        
         <div>   
            <nav>
                 <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="publishproduct">Publish Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="updateproduct">Update Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="deleteproduct">Delete Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/logout">Logout</Link>
                        </li>
                        
                    </ul>
            </nav>
            <p> Welcome Seller</p>
            <Outlet />
        </div>

        
    )
}