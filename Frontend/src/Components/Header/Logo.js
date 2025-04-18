import { Box } from "@mui/material";
import Image from "next/image";
import { Link } from "react-scroll";

// Logos
import LogoWhite from "Assets/header/logoWhite.png";
import LogoBlack from "Assets/header/logoBlack.png";

const Logo = ({ isSticky }) => {
    return (
        <Box
            sx={{
                mt: "3px",
                width: "350px",
                height: "70px", // control logo size
                position: "relative",
                ml:{xxl:"-100px",lg:"-100px",xxs:"-120px", sm:"-100px"},
                a: { cursor: "pointer" }
            }}
        >
            <Link to="home" spy={true} smooth={true} duration={400}>
                <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                    {/* White Logo */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            opacity: isSticky ? 0 : 1,
                            transition: "opacity 0.5s ease-in-out"
                        }}
                    >
                        <Image src={LogoWhite} alt="Logo White" layout="fill" objectFit="contain" />
                    </Box>

                    {/* Black Logo */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            opacity: isSticky ? 1 : 0,
                            transition: "opacity 0.5s ease-in-out"
                        }}
                    >
                        <Image src={LogoBlack} alt="Logo Black" layout="fill" objectFit="contain" />
                    </Box>
                </Box>
            </Link>
        </Box>
    );
};

export default Logo;
