import { Box, Typography, ButtonBase } from "@mui/material";
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

//Data
import Experiences from "Data/Skill/Experience.data";

//Styles
import styles from "Styles/Skill/Experience.styles";

const Experience = () => {
    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Box sx={{ mb: { md: "0px", xxs: "20px" } }}>
            <Typography variant="h4" component="h4" sx={styles.Title}>
                {Experiences.title1}<br />
                {Experiences.title2}
            </Typography>
            <Typography variant="body1" component="p" sx={styles.Description}>
                {Experiences.description}
            </Typography>
            <Box sx={styles.ButtonContainer}>
                <ButtonBase sx={styles.Button} onClick={scrollToContact}>
                    {Experiences.btnText}
                    <ArrowForwardTwoToneIcon />
                </ButtonBase>
            </Box>
        </Box>
    );
};

export default Experience;
