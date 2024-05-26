import typography from "./typography";

const components = {
  MuiButton: {
    defaultProps: {
      disableRipple: true, // Disable ripple effect for all buttons
    },
    styleOverrides: {
      root: {
        fontSize: typography.h6?.fontSize,
        fontWeight: typography.h6?.fontWeight,
        lineHeight: typography.h6?.lineHeight,
        letterSpacing: typography.h6?.letterSpacing,
        color: "white", // Default text color
        width: "120px", // Fixed width
        padding: "10px",
        "&:hover": {
          color: "white", // Text color on hover
        },
        textTransform: "none",
      },
      contained: {
        backgroundColor: "black", // Background color for contained button
        color: "white", // Text color for contained button
        "&:hover": {
          backgroundColor: "#333", // Slightly lighter black for hover state
          color: "white", // Text color on hover
        },
      },
      text: {
        "&.MuiButton-textPrimary": {
          color: "black", // Text color for text primary button
          "&:hover": {
            color: "black",
          },
        },
      },
    },
  },
};

export default components;
