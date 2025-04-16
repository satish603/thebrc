import { Box, Stack, ButtonBase, Typography } from "@mui/material";
import { Link } from "react-scroll";

//Icons
import DoneIcon from '@mui/icons-material/Done';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

//Images
import AboutImage from "Assets/about/about.png";

//Styles
import styles from "Styles/About/Myselft.styles";

const Myself = () => {
    return (
        <Box sx={styles.Container}>
            <Box sx={{ width: { md: "35%", xxs: "100%" } }}>
                <Typography variant="h4" component="h4" sx={styles.Title}>
                Rooted in Passion,  <br />
                Growing with Purpose
                </Typography>
                <Typography variant="body1" component="p" className="sdjh" sx={styles.Description}>
                We’re a passionate team of coders and creatives, building sleek, high-performing digital experiences that make ideas come alive. From websites and interfaces to stunning animations and VFX, we turn imagination into impact. Design meets purpose — that’s our mantra.
                </Typography>
                <Box sx={{ my: "28px" }}>
                    <Stack direction="row" sx={styles.Features}>
                        <DoneIcon />
                        <Typography variant="body1" component="p">
                        Built with passion, powered by purpose
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={styles.Features}>
                        <DoneIcon />
                        <Typography variant="body1" component="p">
                        Pixel-perfect quality, every single time
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={styles.Features}>
                        <DoneIcon />
                        <Typography variant="body1" component="p">
                        Support that actually supports — even after launch
                        </Typography>
                    </Stack>
                </Box>
                <Link
                    to="contact"
                    spy={true}
                    smooth={true}
                    duration={500}
                >
                    <ButtonBase sx={styles.Button}>
                        Contact Us
                        <ArrowForwardTwoToneIcon />
                    </ButtonBase>
                </Link>
            </Box>
            <Box component="img" src={AboutImage} alt="About" sx={styles.Image} />
        </Box>
    );
};
export default Myself;