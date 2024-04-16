import { AppBar, Toolbar } from "@mui/material";
const Navbar = () => {
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <a href="/" style={{ height: 80 }}>
            <img
              src={"src/assets/images/logo.png"}
              alt="Logo"
              width="200px"
              style={{ position: "absolute", top: 17, left: 50 }}
            ></img>
        </a>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
