import { Box, Typography, ButtonBase } from "@mui/material";
import { Link } from "react-scroll";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import styles from "Styles/Hero/HeroContent.styles";
import CursorGlow from "components/cursorglow.js"; // or adjust the path as per your folder structure

const HeroContent = () => {
  return (
    <Box sx={styles.Container}>
      <Typography variant="h2" component="h2" sx={styles.Title}>
        We are  <br />Blazing Render Creation Hub
      </Typography>

      <Typography variant="h6" component="h6" sx={styles.Slogan}>
      Fueling Businesses with Smart Tech
      </Typography>

      <Typography variant="body1" component="p" sx={styles.Description}>
        Where an idea turns into a project. Help your startups, business, and
        ideas to grow more and solve the problem with the power of code.
      </Typography>

      <Link to="portfolio" spy={true} smooth={true} duration={500}>
        <ButtonBase sx={styles.Button}>
          Our Digital Builds
          <ArrowForwardTwoToneIcon />
        </ButtonBase>
      </Link>
      <cursorglow /> {/* 👈 Add it here */}
    </Box>
  );
};

export default HeroContent;
