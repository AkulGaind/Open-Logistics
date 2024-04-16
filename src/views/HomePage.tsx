import { Typography } from "@mui/material";
import Typewriter from "typewriter-effect";
import backgroundImage from "../assets/images/truck.png";
import CardSection from "../components/CardSection";
import myColors from "../themes/colors";

const HomePage = () => {

  return (
    <>
      <div
        className="imageContainer"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: "100vh",
          display: "flex",
          position: "relative",
          objectFit: "contain",
          bottom: 10,
        }}
      >
        <div style={{ position: "absolute", top: 120, left: 50 }}>
          <Typography
            sx={{
              color: myColors.textBlack,
              maxWidth: "580px",
            }}
            variant="h2"
            fontSize={"45px"}
            fontWeight={600}
          >
            <Typewriter
              onInit={(typewriter: any) => {
                typewriter
                .changeDelay(50)
                .typeString("Bridge the gap between shippers and carriers with connectivity")
                .pauseFor(1200)
                .changeDeleteSpeed(30)
                .deleteChars(12)
                .typeString("seamless connectivity")
                .start();
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
