const styles = {
    Embla: {
        overflow: "hidden",
        pl: {
            md: "3%",
            sm: "3%",
            xxs: "2%"
        },
        pr: {
            md: "2%",
            sm: "1%",
            xxs: "1%"
        },
        pt: "5em",
    },
    EmblaContainer: {
        display: "flex",
        gap: "1rem", // or your desired spacing
        padding: 0, // remove extra space
        marginLeft: "0%"
    },
    EmblaSlide: {
        position: "relative",
            flex: "0 0 auto",
            minWidth: "300px", 
        flex: {
            lg: "0 0 31%",
            md: "0 0 55%",
            smd: "0 0 70%",
            lsm: "0 0 80%",
            msm: "0 0 90%",
            xs: "0 0 98%",
            xxs: "0 0 100%"
        },
        backgroundColor: "background.default",
        boxShadow: theme => `3px 4px 3px ${theme.palette.primary.box_shadow_client}`,
        mx: "15px",
        px: "2em",
        textAlign: "center",
        borderRadius: "35px",
        mt: "10px",
    },
    Avatar: {
        width: 120,
        height: 120,
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: theme => `15px solid ${theme.palette.background.default}`,
        boxShadow: theme => `3px 4px 3px ${theme.palette.primary.box_shadow_client}`,
    },
    Title: {
        textTransform: "uppercase",
        mb: "6px",
        fontWeight: 600,
        fontSize: "20px"
    },
    Description: {
        fontSize: "15px",
        mt: "12px"
    },
    Name: {
        position: "absolute",
        bottom: "0",
        left: "50%",
        transform: "translate(-50%, 50%)",
        backgroundColor: "#162144",
        color: "white",
        fontSize: "16px",
        fontWeight: 700,
        p: "12px 20px",
        borderRadius: "15px"
    },
    Navigation: {
        display: "flex",               // Enable flexbox
        justifyContent: "center",     // Center the buttons horizontally
        alignItems: "center",         // (Optional) Vertically center if needed
        mt: "5em",
        mb: "10px",
        gap: "1rem",                  // Add spacing between buttons
    
        button: {
            backgroundColor: "background.default",
            boxShadow: theme => `3px 4px 3px ${theme.palette.primary.box_shadow_client}`,
            p: "8px",
            borderRadius: "4px",
            border: "none",            // Optional cleanup
            cursor: "pointer",
    
            svg: {
                fontSize: "30px"
            }
        }
    }
    
}

export default styles;