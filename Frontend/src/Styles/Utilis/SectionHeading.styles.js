import { AlignHorizontalCenter } from "@mui/icons-material";

const styles = {
    Heading: {
        width: "max-content",
        fontWeight: 1000,
        textAlign: "center", 
        letterSpacing: "1px",
        fontSize: {
            xxs: "1rem",   // Very small devices (custom, if your theme supports it)
            xs:  "1.5rem",     // Phones
            sm:  "2.5rem",   // Tablets
            md:  "2rem",     // Small laptops
            lg:  "2.3rem",   // Desktops
            xl:  "2.7rem",   // Large screens
          },
          
        margin: "0 auto", // Centers the whole element in the parent container
        display: "block", // Ensure it behaves like a block-level element
    },
    Divider: {
        mx: "24%",
        borderWidth: "2px",
        borderColor: "primary.main",
        mt: "5px"
    }
};

export default styles;