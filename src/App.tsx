import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/layout/footer";
import Navbar from "./components/layout/navbar";
import { RootState } from "./redux/store/store";
import AdminDashboard from "./views/AdminDashboard";
import BidPortalPage from "./views/BidPortalPage";
import CarrierDashboard from "./views/CarrierDashboard";
import HomePage from "./views/HomePage";
import LoadPostingPage from "./views/LoadPostingPage";
import LoginPage from "./views/LoginPage";
import ShipperDashboard from "./views/ShipperDashboard";
import SignupPage from "./views/SignupPage";
import { useEffect } from "react";

const App = () => {
  const { appRole, loggedIn } = useSelector(
    (state: RootState) => state.appState
  );
  const location = useLocation();
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    // Scroll to the top before unloading the page (refreshing)
    const onBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    // Attach the event listener
    window.onbeforeunload = onBeforeUnload;

    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.onbeforeunload = null;
    };
  }, [location.pathname]);
  const noFooterPaths = ["/login", "/signup"];

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {loggedIn && appRole === "Admin" && (
          <Route path="/dashboard" element={<AdminDashboard />} />
        )}
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
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

const RootApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RootApp;
