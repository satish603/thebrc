import { Container, Box } from "@mui/material";
import { motion } from "framer-motion";


//Components
import HeroContent from "Components/Hero/HeroContent";

// Images
import HeroPng from "Assets/hero/hero.png";
import Particle from "Assets/hero/particle.png";

//Styles
import styles from "Styles/Hero/Hero.styles";

const Hero = () => {
    return (
        <Container maxWidth={false} disableGutters sx={styles.Container} as="section" id="home">
            <HeroContent />
            {/* <Box component="img" src={HeroPng} alt="Hero Svg" sx={styles.HeroImage} />
            <Box component="img" src={Particle} alt="Hero Svg" sx={styles.Paticle} /> */}
              <Box
                component={motion.img}
                src={HeroPng}
                alt="Hero"
                sx={styles.HeroImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            />
        </Container>
    );
};
export default Hero;