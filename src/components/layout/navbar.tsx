import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/store";

const Navbar = () => {
  const navigate = useNavigate();
  const { appRole, loggedIn } = useSelector(
    (state: RootState) => state.appState
  );

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
            <Button variant="contained" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="contained" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              onClick={
                appRole === "Admin"
                  ? () => navigate("/")
                  : appRole === "Shipper"
                  ? () => navigate("/loadposting")
                  : () => navigate("/bidportal")
              }
            >
              Home
            </Button>
            {appRole === "Shipper" && (
              <Button
                variant="contained"
                onClick={() => navigate("/shipperdash")}
              >
                Dashboard
              </Button>
            )}
            <Button variant="contained" onClick={() => navigate("/")}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
