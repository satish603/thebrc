const styles = {
  Container: {
    zIndex: 2,
    maxWidth: {
      xs: "100%",
      md: "50%",
    },
    px: { xs: 2, sm: 4 },
    textAlign: {
      xs: "center",
      md: "left",
    },
  },

  Title: {
    fontWeight: 800,
    fontSize: {
      xs: "2rem",
      sm: "2.5rem",
      md: "3rem",
      lg: "4rem",
    },
    mb: 2,
    color: "#162144"
  },

  Slogan: {
    fontWeight: 500,
    // color: "text.secondary",
    color: "black",
    mb: 2,
  },

  Description: {
    fontSize: {
      xs: "1rem",
      sm: "1.1rem",
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
    }
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
