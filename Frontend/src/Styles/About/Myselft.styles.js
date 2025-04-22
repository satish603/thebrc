
const styles = {
    Container: {
        mt: {
            msm: "12em",
            sm: "7em",
            xxs: "6em"
        },
        pb: "5rem",
        position: "relative"
    },
    Title: {
        fontWeight: 700,
        color: "#162144", 
        mb: "25px",
        pl: "15px",
        fontSize: {
            lg: "2.125rem",
            md: "2rem",
            lsm: "2.125rem",
            msm: "2rem",
            sm: "1.9rem",
            xs: "1.8rem",
            xxs: "1.5rem"
        }
    },
    Description: {
        mb: "15px",
        pl: "15px",
        position: "relative",
        "&:after": {
            content: '""',
            width: "3px",
            top: "7px",
            bottom: "5px",
            backgroundColor: "#976ecc",
            position: "absolute",
            left: "0"
        }
    },
    Features: {
        mb: "15px",
        alignItems: "center",
        svg: {
            backgroundColor: "#976ecc",
            width: "20px",
            height: "20px",
            color: "background.default",
            borderRadius: "50%",
            p: "3px",
            mr: "8px"
        },
        "& p": {
            fontSize: "15px",
            fontWeight: 500
        }
    },
    Button: {
        backgroundColor: "white",
        boxShadow: 2,
        p: "14px 25px",
        mt: "5px",
        borderRadius: "5px",
        fontSize: "1rem",
        fontWeight: "bold",
        transition: "0.3s ease",
        svg: {
            color: "black",
            fontSize: "20px",
            ml: "10px",
            mb: "-1px"
        },
        "&:hover": {
            backgroundColor: "#162144",
            color: "background.default",
           svg:{ color: "white",},
        }
    },
    Image: {
        position: "absolute",
        right: {
            lg: "-4%",
            xxs: "0%",
            md: "-5%"

        },
        bottom: "0",
        width: {
            xxl: "52%",
            md: "65%",
            xxs: "0%"
        },
        display: {
            md: "unset",
            xxs: "none"
        }
    }
};

export default styles;