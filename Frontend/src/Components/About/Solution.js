import { Box, Grid, Typography, Modal, Paper, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react"; // Make sure this is at the top!

//Data
import Solutions from "Data/About/Solution.data";

//Styles
import styles from "Styles/About/Solution.styles";

const Solution = () => {
    const [open, setOpen] = useState(false);
    const [selectedSolution, setSelectedSolution] = useState(null);

    const handleOpen = (solution) => {
        setSelectedSolution(solution);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedSolution(null);
    };
    useEffect(() => {
        if (open) {
            document.body.style.overflowY = 'scroll';
        } else {
            document.body.style.overflowY = 'auto';
        }
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, [open])

    return (
        <Box sx={{ mt: "4em" }}>
            <Grid container spacing={2}>
                {Solutions &&
                    Solutions.map((solution, i) => (
                        <Grid item md={3} sm={6} xxs={12} key={i}>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    cursor: "pointer",
                                    transition: "0.3s ease",
                                    p: 2,
                                    borderRadius: "20px",
                                    "&:hover": {
                                        boxShadow: "0 0 20px rgba(121, 40, 202, 0.4)", // bluish-purple glow
                                        transform: "scale(1.03)",
                                        background: "rgba(255, 255, 255, 0.05)",
                                    }
                                }}
                                onClick={() => handleOpen(solution)}
                            >
                                <Box sx={styles.Image} component="img" src={solution.icon} />
                                <Typography variant="h6" component="h6" sx={styles.Title}>
                                    {solution.title}
                                </Typography>
                                <Typography variant="body1" component="p" sx={styles.Description}>
                                    {solution.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
            

            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
                <Paper
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        p: 4,
                        width: { xs: "90%",xxs: "90%", md: 500, },
                        bgcolor: "#fff",
                        borderRadius: "20px",
                        boxShadow: "0 0 30px rgba(121, 40, 202, 0.5)",
                        color: "#fff",
                        outline: "none",
                        animation: "fadeIn 0.3s ease-in-out"
                    }}
                >
                    
                    {selectedSolution && (
                        <>
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 2,
                                    fontWeight: 800,
                                    background: "linear-gradient(90deg, #22264b, #22264b)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    textAlign:"center",
                                }}
                            >
                                {selectedSolution.title}
                            </Typography>

                            {/* <Typography sx={{ mb: 2, color: "black", textAlign: "center" }}>
                                {selectedSolution.description}
                            </Typography> */}

                            <Typography sx={{ mb: 2, color: "black", fontWeight:300 }}>
                                {selectedSolution.popupDescription}
                            </Typography>

                            <Typography sx={{ mb: 2, color: "black", fontWeight:700 }}>
                                {selectedSolution.popupaboutservices}
                            </Typography>



                            <List>
                                {selectedSolution.subServices?.map((sub, index) => (
                                    <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                                        <ListItemText
                                            primary={
                                                <Typography sx={{ color: "black", fontSize: "0.95rem" }}>
                                                    ✔️ {sub}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    )}
                </Paper>
            </Modal>

            {/* Animation Keyframes */}
            <style jsx="true">{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -60%);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%);
                    }
                }
            `}</style>
        </Box>
    );
};

export default Solution;
