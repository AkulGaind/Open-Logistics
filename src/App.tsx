import { Alert, AlertColor } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CustomSnackBar from "./components/common/Snackbar";
import Footer from "./components/layout/footer";
import Navbar from "./components/layout/navbar";
import {
  setAppRole,
  setLoggedIn,
  setUserId,
} from "./redux/slices/appStateSlice";
import { RootState } from "./redux/store/store";
import AdminDashboard from "./views/AdminDashboard";
import BidPortalPage from "./views/BidPortalPage";
import CarrierDashboard from "./views/CarrierDashboard";
import HomePage from "./views/HomePage";
import LoadPostingPage from "./views/LoadPostingPage";
import LoginPage from "./views/LoginPage";
import ShipperDashboard from "./views/ShipperDashboard";
import SignupPage from "./views/SignupPage";

const App = () => {
  const { appRole, loggedIn } = useSelector(
    (state: RootState) => state.appState
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [snackOpen, setSnackOpen] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<AlertColor>("success");
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    const onBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.onbeforeunload = onBeforeUnload;
    return () => {
      window.onbeforeunload = null;
    };
  }, [location.pathname]);
  const noFooterPaths = ["/login", "/signup"];

  const handleSnackClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const setCredentials = () => {
    const id = localStorage.getItem("jwt");
    dispatch(setUserId(id!));
    dispatch(setLoggedIn(true));
    dispatch(setAppRole("Carrier"));
  };

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("/success")) {
      setCredentials();
      setSnackOpen(true);
      setText("Payment Done Successfully!");
      setStatus("success");
      navigate("/carrierdash");
    } else if (url.includes("/cancel")) {
      setCredentials();
      setSnackOpen(true);
      setText("Payment Cancelled Midway!");
      setStatus("info");
      navigate("/carrierdash");
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {loggedIn && appRole === "Admin" && (
          <Route path="/admindash" element={<AdminDashboard />} />
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
      <CustomSnackBar
        open={snackOpen}
        text={text}
        status={status}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose}></Alert>
      </CustomSnackBar>
    </>
  );
};

const RootApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RootApp;
