import './App.css';
import LoginForm from './Component/LoginCheck';
import SignUp from './Component/SignUp';
import SellerForm from './Component/SellerRegistraion';
import BuyerRegistration from './Component/BuyerRegistration';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Component/GiftHome';
import Header from './Component/Header';
import AdminHome from './Component/AdminDashboard';
import BuyerHome from './Component/BuyerDashboard';
import SellerHome from './Component/SellerDashboard';
import { useSelector } from 'react-redux';
import WebsiteHome from './Component/WebsiteHome';
import AdminReport from './Component/AdminReport';
import ViewAccount from './Component/ViewAccount';
import BuyProduct from './Component/Buyproduct';
import Searchproduct from './Component/Serchproduct';
import AddToCart from './Component/AddToCart';
import Logout from './Component/Logout';
import Publishproduct from './Component/Publishproduct';
import Updateproduct from './Component/Updateproduct';
import Deleteproduct from './Component/DeleteProduct';


function App() {

  //initial State of logged
  const mystate = useSelector((state) => state.logged);
   console.log(mystate.loggedIn)
  // return (
  //      <div className="min-vh-100 bg-light">
  //       <Header />
  //       <main>
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path="/login" element={<LoginForm />} />
  //           <Route path="/signup" element={<SignUp />} />
  //           <Route path="/signup/buyer" element={<BuyerRegistration />} />
  //           <Route path="/signup/seller" element={<SellerForm />} />
  //            <Route path="admin_home" element={<AdminHome/>}></Route>
  //           <Route path="buyer_home" element={<BuyerHome/>}></Route>
  //           <Route path="seller_home" element={<SellerHome/>}></Route> 
  //         </Routes>
  //       </main>
  //     </div>
   
  // );

  //style={{display:mystate.loggedIn?"none":"block"}}
return (
  <div className="App">
    
      <div style={{display: mystate.loggedIn?"none":"block"}} >
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
           {/* <div className="container-fluid">
                <Link className="navbar-brand" href="#">Gifted Moments</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="#">Home</Link>
                        </li>
                       
                        
                    </ul>
                    </div> */}
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/login-form">Login Form</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/seller-form">Seller Form</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/buyer-registration-form">Buyer Registration</Link>
                        </li>
                       
                        
                    </ul>
                
            
        </nav> 

      </div>
      <Routes>
            
             <Route path="/login-form" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />
             <Route path="/buyer-registration-form" element={<BuyerRegistration />} />
            <Route path="/seller-form" element={<SellerForm/>} />
            <Route path="logout" element={<Logout/>}/>

             <Route path="/admin_home" element={<AdminHome/>}>
                <Route path="report" element={ <AdminReport />} />
                <Route path="view" element={ <ViewAccount />} />
                
             </Route> 
            <Route path="buyer_home" element={<BuyerHome/>}>
                 <Route path="Buyproduct" element={ <BuyProduct/>} />
                 <Route path="Searchproduct" element={ <Searchproduct/>} />
                 <Route path="AddtoCart" element={<AddToCart/>} />
            </Route>
            <Route path="seller_home" element={<SellerHome/>}>
            <Route path="publishproduct" element={<Publishproduct/>}/>
            <Route path="updateproduct" element={<Updateproduct/>}/>
            <Route path="deleteproduct" element={<Deleteproduct/>}/>
            </Route> 
            <Route path="/" element={ <WebsiteHome />} />
            
          </Routes>
       
  </div>
)
}

export default App;
