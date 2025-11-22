import { Box, Stack, Typography, ButtonBase } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Link as Scroll } from "react-scroll";

//Icons
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { MapIcon, EmailIcon, PhoneIcon, FacebookIcon, TwitterIcon, BehaceIcon, YoutubeIcon } from "Utilis/Icons";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

//Logo
import Logo from "Assets/header/logoBlack.png";

//Data
import Navs from "Data/Header/Navs.data";

//Styles
import styles from "Styles/Header/Dialogs.styles";

const Drawers = ({ toggleDrawer }) => {
    return (
        <Box>
            <Stack direction="row" sx={{ alignItems: "center" }}>
                {/* <Box sx={{ flex: 1, mt: "5px" }}>
                    <Image src={Logo} width={200} height={30} alt="Logo" />
                </Box> */}
                <ButtonBase onClick={toggleDrawer(false)} sx={styles.CrossButton}>
                    <CloseRoundedIcon />
                </ButtonBase>
            </Stack>
            <Typography variant="body1" component="p" sx={styles.Description}>
            At Blazing Render Creation Hub, we’re not just coders — we’re builders of digital possibilities. We’re a tight-knit crew that loves solving real-world problems through smart, scalable tech. With over 4 years of hands-on experience across diverse industries and clients, we turn ideas into digital experiences that work and wow. From startups to scaleups, we’re here to fuel your vision — one line of code at a time.
            </Typography>
            <Box sx={styles.Navs}>
                {Navs &&
                    Navs.map((nav, i) => (
                        <Scroll
                            key={i}
                            activeClass='active'
                            to={nav.Id}
                            spy={true}
                            smooth={true}
                            duration={500}
                            onClick={toggleDrawer(false)}
                        >
                            <ButtonBase sx={styles.Buttons}>
                                {nav.name}
                            </ButtonBase>
                        </Scroll>
                    ))
                }
            </Box>
            <Stack direction="row" sx={styles.Address}>
                <Box>
                    <MapIcon />
                </Box>
                <Box>
                    <Typography variant="body1" component="p">
                        Toranagallu RS, Ballari (dist.), Karnataka, India 583123
                    </Typography>
                </Box>
            </Stack>
            <Stack direction="row" sx={styles.Address}>
                <Box>
                    <EmailIcon />
                </Box>
                <Box>
                    <Link href="mailto:info@thebrchub.tech">
                        <a>
                            <Typography variant="body1" component="p">
                                info@thebrchub.tech
                            </Typography>
                        </a>
                    </Link>
                </Box>
            </Stack>
            <Stack direction="row" sx={styles.Address}>
                {/* <Box>
                    <PhoneIcon />
                </Box>
                <Box>
                    <Link href="tel:+91 xxxxxxxxxx">
                        <a>
                            <Typography variant="body1" component="p">
                            +91 xxxx xxxxxx
                            </Typography>
                        </a>
                    </Link>
                </Box> */}
            </Stack>
            <Stack direction="row" sx={styles.Social} spacing={1}>
                <Link href="https://instagram.com/thebrchub">
                    <a target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <ButtonBase><InstagramIcon /></ButtonBase>
                    </a>
                </Link>

                <Link href="https://www.facebook.com/thebrchub">
                    <a target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <ButtonBase><FacebookIcon /></ButtonBase>
                    </a>
                </Link>

                <Link href="https://twitter.com/thebrchub">
                    <a target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <ButtonBase><TwitterIcon /></ButtonBase>
                    </a>
                </Link>

                <Link href="https://www.linkedin.com/company/the-brc-hub/" >
                    <a target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <ButtonBase><LinkedInIcon /></ButtonBase>
                    </a>
                </Link>

                {/* <Link href="https://www.youtube.com/@TheBRCHub">
                    <a target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <ButtonBase><YoutubeIcon /></ButtonBase>
                    </a>
                </Link> */}

                {/* optional: GitHub */}
                {/* <Link href="https://github.com/codestation21">
                    <a target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <ButtonBase><GitHubIcon /></ButtonBase>
                    </a>
                </Link> */}
                </Stack>

        </Box >
    );
};
export default Drawers;