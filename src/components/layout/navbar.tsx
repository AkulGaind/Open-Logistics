import { AppBar, Toolbar } from "@mui/material";
const Navbar = () => {
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <a href="/" style={{ width: "20%", height: 70 }}>
          <div style={{padding: "6px", height: 60 }}>
            <img
              src={"src/assets/images/logo.png"}
              width={"80%"}
              height={"88%"}
              alt="Logo"
            ></img>
          </div>
        </a>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
