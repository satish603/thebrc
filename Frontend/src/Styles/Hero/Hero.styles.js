const styles = {
    Container: {

            minHeight: {xl:"100vh",xs:"100h"},
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column", // Stack on small screens
              md: "row",     // Side-by-side on medium and up
              sm: "column"
            },
            px: { xs: 2, sm: 7, md: 10 },
            position: "relative",
            background: theme => theme.palette.primary.HeroGradient,
            overflow: "hidden",
        pt: {
            xxl: "25em",
            xl: "20em",
            lg: "15em",
            md: "10em",
            smd: "12em",
            lsm: "10em",
            msm: "9em",
            sm: "8em",
            xs: "7em",
            xxs: "6em"
        },
        pt: {
            xxl: "18em",  // was 25em
            xl: "5rem",   // was 20em
            lg: "12em",   // was 15em
            md: "10em",   // was 10em (keep same)
            smd: "10em",
            lsm: "10em",
            msm: "9em",
            sm: "9em",
            xs: "9em",
            xxs: "9em"
        },
        position: "relative",
        background: theme => theme.palette.primary.HeroGradient
        
    },
    HeroImage: {
        position: {
          xs: "relative",
          md: "absolute",
        },
        right: {
          lg: "1%",
          xxs: "0%"
        },
        bottom: {
          xs: "unset",
          md: "0",
        },
        width: {
          lg: "58%",
          md: "70%",
          smd: "65%",
          sm: "100%",
          xs: "100%", // ⬅️ Reduced from 100% to 80% for better fit
          xxs: "85%" // ⬅️ Same idea here
        },
        maxHeight: {
          xs: "300px",  // ⬅️ Controls the height on small devices
          md: "none",
         
        },
        objectFit: "contain", // ⬅️ Ensures the image scales nicely
        display: {
          xs: "block",
          xxs: "block",
          
        },
        mt: {
          xs: 4,
          md: 0,
        },
        mx: {
          xs: "auto",
          md: "unset"
        },
        zIndex: 1,
      },
      
      
    Paticle: {
        position: "absolute",
        left: "0",
        bottom: "2%",
        width: {
            smd: "35%",
            xxs: "90%"
        },
        height: "80%",
        zIndex: 0,
        opacity: 0.2
    }
};

export default styles;