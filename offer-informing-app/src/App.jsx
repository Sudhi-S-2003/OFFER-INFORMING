import { useState,useEffect } from "react";
import Business from "./Business/Business";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Customers from "./Customers/Customers";
import Footer from "./HomePage/Footer";
import Header from "./HomePage/Header";
import Homepage from "./HomePage/Homepage";
import {  Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const navigate = useNavigate();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserType(localStorage.getItem("userType"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setToken(null);
    setUserType(null);
    navigate('/');
  };
  return (
    <>
      
      <Header token={token} userType={userType} onLogout={handleLogout} />
      <Routes>
          <Route path="/" element={<Homepage />} />
          {token ? (
            <>
              {userType === 'business' && (
              <Route path="/Auth/Business/*" element={<Business />} />
            )}
            {userType === 'customer' && (
              <Route path="/Auth/Customers" element={<Customers />} />
            )}
             
              
            </>
          ) : (
            <>
              <Route path="/register/:userType" element={<Register />} />
              <Route path="/login" element={<Login setToken={setToken} setUserType={setUserType}/>} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      
    </>
  );
}

export default App;
