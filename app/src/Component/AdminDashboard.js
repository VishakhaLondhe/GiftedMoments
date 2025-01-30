import { Link, Outlet } from "react-router-dom";

export default function AdminHome(){
    return (
        
         <div>   
            <nav>
                 <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="report">Generate Report</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="view">View Account</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/logout">Logout</Link>
                        </li>
                       
                        
                    </ul>
            </nav>
            <p> Welcome Admin</p>
            <Outlet />
        </div>

        
    )
}