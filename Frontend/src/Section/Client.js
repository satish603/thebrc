import { Box, Typography } from "@mui/material";

//SectionHeading
import SectionHeading from "Utilis/SectionHeading";

//Component
import Slider from "Components/Client/Slider";


//Styles
import styles from "Styles/Client/Client.styles";

const Client = () => {
    return (
        <Box component="section" sx={styles.Container} id="client">
            <SectionHeading
                value1="Feedback that Fuels Us !"
                // value2="Beyond Delivery. We Leave an Impact."
                border={true}
            />
            <Slider />
        </Box>
    );
};
export default Client;