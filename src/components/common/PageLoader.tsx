import Lottie from "lottie-react";
import truckAnimation from "../ui/truckAnimation.json";

const PageLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Lottie
        animationData={truckAnimation}
        style={{ width: "50%", height: "50%" }}
      />
    </div>
  );
};

export default PageLoader;
