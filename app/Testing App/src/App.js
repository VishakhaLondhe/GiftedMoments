import './App.css';
import LoginForm from './Component/LoginCheck';
import SignUp from './Component/SignUp';
import SellerForm from './Component/SellerRegistraion';
import BuyerRegistration from './Component/BuyerRegistration';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/GiftHome';
import Header from './Component/Header';

function App() {
  return (

      <div className="min-vh-100 bg-light">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup/buyer" element={<BuyerRegistration />} />
            <Route path="/signup/seller" element={<SellerForm />} />
          </Routes>
        </main>
      </div>
   
  );
}

export default App;
