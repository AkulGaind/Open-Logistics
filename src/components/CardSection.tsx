import { Stack } from "@mui/material";
import { StyledCard } from "./common/styled";

const CardSection = () => {
  return (
    <Stack direction="row" mt={2} mb={2} justifyContent="center" spacing={2}>
      <StyledCard title="Shipper" buttonText="Login" />
      <StyledCard title="Container" buttonText="Login" />
      <StyledCard title="Admin" buttonText="Login" />
    </Stack>
  );
};

export default CardSection;
