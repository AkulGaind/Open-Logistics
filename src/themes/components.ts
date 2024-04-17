const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        color: "white", // Default text color
        "&:hover": {
          
          color: "white", // Text color on hover
        },
      },
      outlined: {
        border: "2px solid white", // Border for the outlined variant
        "&.MuiButton-outlinedPrimary": {
          color: "white", // Text color for outlined primary button
          borderColor: "white", // Border color for outlined primary button
          "&:hover": {
            color: "#FFCD29",
          },
        },
      },
    },
  },
};

export default components;
