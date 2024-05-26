import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import {
  setAppRole,
  setLoggedIn,
  setUserId,
} from "../../redux/slices/appStateSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { appRole, loggedIn } = useSelector(
    (state: RootState) => state.appState
  );

  const handleLogout = async () => {
    dispatch(setLoggedIn(false));
    dispatch(setUserId(""));
    dispatch(setAppRole(""));
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ pl: 1, pr: 1 }}
    >
      <Toolbar>
        <a href="/" style={{ height: 80 }}>
          <img
            src={"src/assets/images/logo.png"}
            alt="Logo"
            width="200px"
            style={{ position: "absolute", top: 17, left: 50 }}
          ></img>
        </a>
        <Box sx={{ flexGrow: 1 }} />
        {!loggedIn ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{ pr: 0 }}
            >
              Login
            </Button>
            <Button variant="contained" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Box>
        ) : (
          <>
            {location.pathname === "/" && (
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            )}
            {appRole === "Shipper" &&
              (location.pathname === "/loadposting" ||
                location.pathname === "/shipperdash") && (
                <>
                  <Button
                    variant="text"
                    onClick={() => navigate("/loadposting")}
                  >
                    Home
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => navigate("/shipperdash")}
                    sx={{ pr: 6 }}
                  >
                    Dashboard
                  </Button>
                  <Button variant="contained" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            {appRole === "Carrier" &&
              (location.pathname === "/bidportal" ||
                location.pathname === "/carrierdash") && (
                <>
                  <Button variant="text" onClick={() => navigate("/")}>
                    Home
                  </Button>
                  <Button variant="contained" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
