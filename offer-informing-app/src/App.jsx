import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./HomePage/Footer";
import Header from "./HomePage/Header";
import Homepage from "./HomePage/Homepage";
import {BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
  <Routes>
  <Route path="/" element={<Homepage />} />
  <Route path="/register/:userType" element={<Register />} />
  <Route path="/login" element={<Login/>}/>
   </Routes>
    <Footer/>
    </BrowserRouter>
    
   
    </>
  );
}

export default App;
