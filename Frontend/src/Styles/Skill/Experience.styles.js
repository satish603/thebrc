const styles = {
    Title: {
        fontWeight: 700,
        fontSize: {
            sm: "2rem",
            xs: "1.6rem",
            xxs: "1.5rem"
        },
        mb: "15px"
    },
    Description: {
        mb: "12px",
        fontSize: "15px"
    },
    ButtonContainer: {
        a: {
            textDecoration: "none",
            color: "text.primary",

        }
    },
    Button: {
        backgroundColor: "white",
        boxShadow: 2,
        p: "14px 25px",
        mt: "15px",
        borderRadius: "5px",
        fontSize: "1rem",
        fontWeight: "bold",
        svg: {
            color: "black",
            fontSize: "20px",
            ml: "10px",
            mb: "-3px"
        },
        transition: "0.3s ease",
        "&:hover": {
            backgroundColor: "#162144",
            color: "background.default",
            svg: {
                color: "white"} 
        }
    }
};

export default styles;