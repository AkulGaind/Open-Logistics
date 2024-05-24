const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        color: "white", // Default text color
        width: "100px", // Fixed width
        "&:hover": {
          color: "white", // Text color on hover
        },
      },
      contained: {
        backgroundColor: "black", // Background color for contained button
        color: "white", // Text color for contained button
        "&:hover": {
          backgroundColor: "#333", // Slightly lighter black for hover state
          color: "white", // Text color on hover
        },
      },
      outlined: {
        border: "2px solid black", // Border for the outlined variant
        "&.MuiButton-containedPrimary": {
          color: "white", // Text color for outlined primary button
          borderColor: "black", // Border color for outlined primary button
          "&:hover": {
            color: "white",
          },
        },
      },
    },
  },
};

export default components;
