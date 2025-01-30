import { Link, Outlet } from "react-router-dom";

export default function BuyerHome(){
    return (
        
         <div>   
            <nav>
                 <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="Buyproduct">BuyProduct</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="Searchproduct">Searchproduct</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="AddtoCart">AddToCart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/logout">Logout</Link>
                        </li>
                        
                    </ul>
            </nav>
            <p> Welcome Buyer</p>
            <Outlet />
        </div>

        
    )
}