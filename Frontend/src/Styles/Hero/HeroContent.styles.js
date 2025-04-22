const styles = {
  Container: {
    zIndex: 2,
    mb: {
      xxl: 0,  // was 25em
      xl: 0,   // was 20em
      lg: 3,   // was 15em
      md: 3,   // was 10em (keep same)
      smd: 0,
      lsm: 0,
      msm: 0,
      sm: 0,
      xs: 0,
      xxs: 0
    },
    maxWidth: {
      xs: "100%",
      md: "50%",
    },
    px: { xs: 1, sm: 4 },
    textAlign: {
      xs: "center",
      md: "left",
    },
  },

  Title: {
    fontWeight: 800,
    fontSize: {
      xs: "2rem",
      sm: "3rem",
      md: "2.8rem",
      lg: "4rem",
    },
    mb: 3,
    color: "#162144"
  },

  Slogan: {
    fontWeight: 600,
    // color: "text.secondary",
    color: "black",
    mb: 2,
  },

  Description: {
    fontSize: {
      xs: "1rem",
      sm: "1.1rem",
      md: "1.5", 
    },
    color: "text.primary",
    maxWidth: "600px",
    mx: {
      xs: "auto",
      md: 0,
    },
    mb: 4,
    borderLeft: {
      xs: "none",
      sm: "4px solid orange",
    },
    pl: {
      xs: 0,
      sm: 2,
    },
    textAlign: {
      xs: "center",
      md: "left",
    },
  },

  Button: {
    display: "inline-flex",
    alignItems: "center",
    gap: 1,
    backgroundColor: "white",
    color: "black", // default text color
    px: 3,
    py: 1.5,
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "1rem",
    boxShadow: 2,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#162144", // dark purple shade
      color: "white", // text color on hover
    },
  }
  
};

export default styles;
