import { Container, Box, Grid, Typography } from "@mui/material";

// SectionHeading
import SectionHeading from "Utilis/SectionHeading";

// Component
import Form from "Components/Contact/Form";

// Styles
import styles from "Styles/Contact/Contact.styles";

// 🟢 Import mascot image
import MascotGreen from "Assets/green_mascot.png"; // adjust if needed

const Contact = () => {
    return (
        <Container maxWidth={false} disableGutters as="section" sx={styles.Container} id="contact">
            <SectionHeading
                value1="You Dream It. We Blaze It. "
                value2="Slide Into Our Inbox with Your Ideas."
                border={true}
                color="#162144" 
            />
            <Form />

            {/* Taglines + Mascot - only desktop view */}
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{ display: { xs: "100%", md: "flex" }, mt: 5 }}
            >
                <Grid item md={4}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontStyle: "italic",
                            fontSize: "1.4rem",
                            color:"white",
                            textAlign: "right",
                            pr: 7,
                            fontWeight: 800,
                            pl:- 1,
                            // md: "1.2rem",
                            // fontSize: { xs: "1.4rem", md: "1.2rem" },
    textAlign: { xs: "center", md: "right" },
    pr: { md: 2 },
    whiteSpace: { xs: "normal", md: "nowrap" },
                        }}
                    >
                        “I’m not just coding smarter, I’m growing greener.”
                    </Typography>
                </Grid>

                <Grid item md={4} sx={{ textAlign: "center" }}>
                    <Box
                        component="img"
                        src={MascotGreen}
                        alt="Green Mascot"
                        sx={{
                            height: "520px",
                            width: "auto",
                            zIndex: 2,
                            position: "relative",
                            marginTop: "-50px",  // Pulls it up close to the form
                            marginBottom: "-78px", // Optional: if you want it tight with next section
                            mx: "auto",          // Center horizontally
                            zIndex: 2,
                            position: "relative",
                            
                        }}
                    />
                </Grid>

                <Grid item md={4}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontStyle: "italic",
                            fontSize: "1.4rem",
                            fontWeight: 800,
                            textAlign: "left",
                            color:"white",
                            pl: 1,
                            mb: {
                                lg: 10,
                                xs: 1,
                                sm: -7,},
                                textAlign: {
                                    xs: "center",
                               
                                  },
                            mt: {xs:7}
                        }}
                    >
                        Join the movement — plant a tree, fuel a better future.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Contact;
