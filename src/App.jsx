import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./pages/navbar";
import HomePage from "./pages/home";
import AboutUsContent from "./pages/about";
import Contact from "./pages/contact";

import SignIn from "./pages/signup";
import Register from "./pages/register";
import Booking from "./pages/booking";
import Footer from "./pages/footer";
import ForgotPassword from "./components/ForgotPassword";
import ProfilePage from "./pages/ProfilePage";
import VehicleCatalog from "./pages/VehicleCatalog";
import VehicleDetails from "./pages/VehicleDetails";
import LocationDetails from "./pages/LocationDetails";
import LocationGrid from "./pages/LocationGrid";
function App()
{
    return (
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/locations" element={<LocationGrid />} />
            <Route path="/location/:locationName" element={<LocationDetails />} />
            <Route path="/book/:roomId" element={<Booking roomId={1} />} />
            <Route path="/about" element={<AboutUsContent />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vehicles" element={<VehicleCatalog />} />
            <Route path="/vehicles/:id" element={<VehicleDetails />} />
            <Route path="/signup" element={<SignIn />} />
           <Route path="/register" element={<Register />} />
           <Route path="/profilepage" element={<ProfilePage/>}/>
           <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
          <Footer />
        </Router>
      );
}
export default App