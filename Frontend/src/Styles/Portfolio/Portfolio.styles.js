const styles = {
    Container: {
        overflow: "hidden",
        py: "5em",
        position: "relative",
        textAlign: "center", // ✅ This centers inline content like text and heading
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // ✅ Ensures all children like SectionHeading are centered
        "&:after": {
            content: '""',
            // background: theme => theme.palette.primary.WorkGradient,
            background: theme => theme.palette.primary.WorkGradient,
            width: "100%",
            height: "50em",
            padding: " ",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "-2"
        }
    },
    Particle: {
        position: "absolute",
        top: "5%",
        width: "90%",
        height: "40em",
        zIndex: "-1"
    },
    ButtonGroup: {
        "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
            button: {
                color: "text.primary",
                m: "0 2px",
                height: 0,
                minHeight: 0,
                mb: {
                    lsm: "0px",
                    xxs: "10px"
                },
                maxHeight: 0,
                minWidth: 0,
                p: "20px 18px",
                fontSize: "17px",
                fontWeight: 700,
                textTransform: "capitalize",
                "&.Mui-selected": {
                    color: "white",
                    backgroundColor: "#162144",
                    borderRadius: "5px"
                }
            }
        }
    },
    // Container: {
    //     minHeight: "100vh", // Full screen height
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "center", // vertical center
    //     alignItems: "center",     // horizontal center
    //     position: "relative",
    //     paddingTop: "2rem", // optional spacing from top
    //     paddingBottom: "2rem"
    //   },
};

export default styles;