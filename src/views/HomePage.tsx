import { Typography } from "@mui/material";
import Typewriter from "typewriter-effect";
import backgroundImage from "../assets/images/truck-white-orange.jpg";
import CardSection from "../components/CardSection";
import myColors from "../themes/colors";

const HomePage = () => {
  const typeOutString = `Bridge the gap between shippers and carriers with seamless connectivity.`;

  return (
    <>
      <div
        className="imageContainer"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 100, left: 150 }}>
          <Typography
            sx={{
              color: myColors.textBlue,
              maxWidth: "500px",
            }}
            variant="h2"
            fontSize={"36px"}
            fontWeight={400}
          >
            <Typewriter
              onInit={(typewriter: any) => {
                typewriter.changeDelay(50).typeString(typeOutString).start();
              }}
            />
          </Typography>
        </div>
      </div>
      <CardSection />
    </>
  );
};

export default HomePage;
