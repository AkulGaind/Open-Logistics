import { Box, Stack, Typography } from "@mui/material";
const currentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <Box style={{ backgroundColor: "#B3B3B3" }} p={"2% 3% 3%"}>
      <Stack direction={"row"} justifyContent={"space-between"} mb={10}>
        <Box>
          <img
            src={"src/assets/images/logo.png"}
            alt="Logo"
            width="200px"
          ></img>
        </Box>
        <Stack direction={"row"} spacing={5}>
          <Stack spacing={2}>
            <Typography variant="h3" fontSize={"24px"}>
              About
            </Typography>
            <Typography variant="body1">Open Logistics</Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h3" fontSize={"24px"}>
              Legal
            </Typography>
            <Typography variant="body1">Privacy Policy</Typography>
            <Typography variant="body1">Terms & Conditions</Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h3" fontSize={"24px"}>
              Follow Us
            </Typography>
            <Typography variant="body1">Github</Typography>
            <Typography variant="body1">Discord</Typography>
          </Stack>
        </Stack>
      </Stack>
      <hr
        style={{
          color: "black",
          height: 2,
          backgroundColor: "black",
        }}
      />
      <Stack direction={"row"} justifyContent={"space-between"} paddingTop={2}>
        <Typography variant="h6" alignContent={"center"}>
          &copy; {currentYear} OPEN LOGISTICS &trade;
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <a href="https://www.facebook.com" target="_blank">
            <img
              src={"src/assets/images/facebook.png"}
              alt="Facebook"
              width={36}
              height={36}
            />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <img
              src={"src/assets/images/instagram.png"}
              alt="Instagram"
              width={36}
              height={36}
            />
          </a>
          <a href="https://twitter.com/" target="_blank">
            <img
              src={"src/assets/images/x.png"}
              alt="Example"
              width={36}
              height={36}
            />
          </a>
          <a href="https://www.github.com" target="_blank">
            <img
              src={"src/assets/images/github.png"}
              alt="GitHub"
              width={36}
              height={36}
            />
          </a>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
