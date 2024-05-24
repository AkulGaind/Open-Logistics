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
import PageLoader from "./components/common/PageLoader";
import AdminDashboard from "./views/AdminDashboard";

function App() {
  const { appRole, loggedIn, loading } = useSelector(
    (state: RootState) => state.appState
  );

  return (
    <>
      <BrowserRouter>
        <Navbar />
        {loading ? (
          <PageLoader />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            {(loggedIn && appRole === "Carrier") && (
            <>
              <Route path="/bidportal" element={<BidPortalPage />} />
              <Route path="/carrierdash" element={<CarrierDashboard />} />
            </>
          )}
          {(loggedIn && appRole === "Shipper") && (
            <>
              <Route path="/loadposting" element={<LoadPostingPage />} />
              <Route path="/shipperdash" element={<ShipperDashboard />} />
            </>
           )} 
          </Routes>
        )}
      </BrowserRouter>
      {!loading && <Footer />}
    </>
  );
}

export default App;
