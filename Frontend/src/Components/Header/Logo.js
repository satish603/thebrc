import { Box } from "@mui/material";
import Image from "next/image";
import { Link } from "react-scroll";

//Logos
import Logos from "Assets/header/logo.png";

const Logo = () => {
    return (
        <Box sx={{ mt: "5px", a: { cursor: "pointer" } }}>
            <Link
                to="home"
                spy={true}
                smooth={true}
                duration={500}
            >
                <Image src={Logos} width={600} height={100} alt="Logo" />
            </Link>
        </Box>
    );
};
export default Logo;