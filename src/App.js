import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import Taxis from "./pages/Taxis/Taxis";
import './index.css'
import Photograpers from "./pages/PhotoGrapher/Photograpers";
import Package from "./pages/Package/Package";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/taxis" element={<Taxis/>}/>
        <Route path="/photograph" element={<Photograpers/>}/>
        <Route path="/package" element={<Package/>}/>
        <Route path="/hotels" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
