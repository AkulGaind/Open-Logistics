import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./views/HomePage";
import Navbar from "./components/layout/navbar";
import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";
import Dashboard from "./views/Dashboard";
import Footer from "./components/layout/footer";
import LoadPostingPage from "./views/LoadPostingPage";
import Lottie from "lottie-react";
import truckAnimation from "./components/ui/truckAnimation.json";
import BidPortalPage from "./views/BidPortalPage";
import ShipperDashboard from "./views/ShipperDashboard";

function App() {
  return (
    <>
      <Navbar />
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Lottie animationData={truckAnimation} style={{ width: '50%', height: '50%' }} />
       </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/loadposting" element={<LoadPostingPage />} />
          <Route path="/bidportal" element={<BidPortalPage />} />
          <Route path="/shipperdash" element={<ShipperDashboard />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
