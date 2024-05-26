import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./views/HomePage";
import Navbar from "./components/layout/navbar";
import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";
import Footer from "./components/layout/footer";
import LoadPostingPage from "./views/LoadPostingPage";
import BidPortalPage from "./views/BidPortalPage";
import ShipperDashboard from "./views/ShipperDashboard";
import CarrierDashboard from "./views/CarrierDashboard";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";
import AdminDashboard from "./views/AdminDashboard";

function App() {
  const { appRole, loggedIn } = useSelector(
    (state: RootState) => state.appState
  );

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          {loggedIn && appRole === "Carrier" && (
            <>
              <Route path="/bidportal" element={<BidPortalPage />} />
              <Route path="/carrierdash" element={<CarrierDashboard />} />
            </>
          )}
          {loggedIn && appRole === "Shipper" && (
            <>
              <Route path="/loadposting" element={<LoadPostingPage />} />
              <Route path="/shipperdash" element={<ShipperDashboard />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
      {!loggedIn && !appRole && <Footer />}
    </>
  );
}

export default App;
