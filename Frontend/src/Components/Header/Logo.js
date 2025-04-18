import { Box } from "@mui/material";
import Image from "next/image";
import { Link } from "react-scroll";

// Logos
import LogoWhite from "Assets/header/logoWhite.png";
import LogoBlack from "Assets/header/logoBlack.png";

const Logo = ({ isSticky }) => {
    return (
        <Box sx={{ mt: "5px", a: { cursor: "pointer" } }}>
            <Link
                to="home"
                spy={true}
                smooth={true}
                duration={500}
            >
                <Image
                    src={isSticky ? LogoBlack : LogoWhite}
                    width={600}
                    height={100}
                    alt="Logo"
                />
            </Link>
        </Box>
    );
};

export default Logo;
