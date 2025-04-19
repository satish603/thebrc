import { Box, Stack, ButtonBase, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

//Icons
import { MapIcon, EmailIcon, PhoneIcon, FacebookIcon, TwitterIcon, BehaceIcon , YoutubeIcon} from "Utilis/Icons";
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';


//Logo
import Logo from "Assets/header/logoBlack.png";

//Styles
import styles from "Styles/Footer/FooterOne.styles";

const FooterOne = () => {
    return (
        <Box>
            <Box>
                <Typography variant="h6" component="h6" sx={styles.Title}>
                    Contact Info
                </Typography>
            </Box>
            {/* <Box sx={{ mb: "1px" }}>
                <Image src={Logo} width={287} height={44} alt="Logo" />
            </Box> */}
            <Stack direction="row" sx={styles.Address}>
                <Box>
                    <MapIcon />
                </Box>
                <Box>
                    <Typography variant="body1" component="p">
                        Toranagallu, Ballari (dist.), Karnataka, India 583123
                    </Typography>
                </Box>
            </Stack>
            <Stack direction="row" sx={styles.Address}>
                <Box>
                    <EmailIcon />
                </Box>
                <Box>
                    <Link href="mailto:connect.brchubllp@gmail.cpm.com">
                        <a>
                            <Typography variant="body1" component="p">
                                connect.brchubllp@gmail.com
                            </Typography>
                        </a>
                    </Link>
                </Box>
            </Stack>
            <Stack direction="row" sx={styles.Address}>
                <Box>
                    <PhoneIcon />
                </Box>
                <Box>
                    <Link href="tel:+91 xxxx xxxxxx">
                        <a>
                            <Typography variant="body1" component="p">
                                +91 xxxx xxxxxx
                            </Typography>
                        </a>
                    </Link>
                </Box>
            </Stack>
            <Stack direction="row" sx={styles.Social}>
                <Link href="https://instagram.com/thebrchub">
                    <a target="_blank">
                        <ButtonBase>
                            <InstagramIcon />
                        </ButtonBase>
                    </a>
                </Link>
                {/* <Link href="https://github.com/thebrchub">
                    <a target="_blank">
                        <ButtonBase>
                            <GitHubIcon />
                        </ButtonBase>
                    </a> */}
                {/* </Link> */}
                <Link href="https://www.facebook.com/thebrchub">
                    <a target="_blank">
                        <ButtonBase>
                            <FacebookIcon />
                        </ButtonBase>
                    </a>
                </Link>
                <Link href="https://twitter.com/thebrchub">
                    <a target="_blank">
                        <ButtonBase>
                            <TwitterIcon />
                        </ButtonBase>
                    </a>
                </Link>
                <Link href="https://youtube.com/@TheBRCHub">
                    <a target="_blank">
                        <ButtonBase>
                            <YoutubeIcon />
                        </ButtonBase>
                    </a>
                </Link>
            </Stack>
        </Box>
    );
};
export default FooterOne;