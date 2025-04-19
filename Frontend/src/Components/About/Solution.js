import {
    Box,
    Grid,
    Typography,
    Modal,
    Paper,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//Data
import Solutions from "Data/About/Solution.data";

//Styles
import styles from "Styles/About/Solution.styles";

const inputStyle = {
    padding: "10px 15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "0.95rem",
    outline: "none",
    width: "100%",
};

const Solution = () => {
    const [open, setOpen] = useState(false);
    const [selectedSolution, setSelectedSolution] = useState(null);
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [selectedSubService, setSelectedSubService] = useState("");

    const handleOpen = (solution) => {
        setSelectedSolution(solution);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedSolution(null);
    };

    const handleFormModalOpen = () => {
        setFormModalOpen(true);
    };

    const handleFormModalClose = () => {
        setFormModalOpen(false);
        setSelectedSubService("");
    };

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
                                        boxShadow: "0 0 20px rgba(121, 40, 202, 0.4)",
                                        transform: "scale(1.03)",
                                        background: "rgba(255, 255, 255, 0.05)",
                                    },
                                }}
                                onClick={() => handleOpen(solution)}
                            >
                                <Box sx={styles.Image} component="img" src={solution.icon} />
                                <Typography variant="h6" sx={styles.Title}>
                                    {solution.title}
                                </Typography>
                                <Typography variant="body1" sx={styles.Description}>
                                    {solution.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
            </Grid>

            {/* Main Modal */}
            <Modal open={open} onClose={handleClose}>
                <Paper
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        p: 4,
                        width: { xs: "90%", md: 500 },
                        bgcolor: "#fff",
                        borderRadius: "20px",
                        boxShadow: "0 0 30px rgba(121, 40, 202, 0.5)",
                        color: "#000",
                        outline: "none",
                        animation: "fadeIn 0.3s ease-in-out",
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            color: "#888",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

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
                                    textAlign: "center",
                                }}
                            >
                                {selectedSolution.title}
                            </Typography>

                            <Typography sx={{ mb: 2, color: "black", fontWeight: 300 }}>
                                {selectedSolution.popupDescription}
                            </Typography>

                            <Typography sx={{ mb: 2, color: "black", fontWeight: 700 }}>
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

                            {/* CTA Button */}
                            <Box sx={{ mt: 3, textAlign: "center" }}>
                                <Box
                                    onClick={handleFormModalOpen}
                                    sx={{
                                        px: 3,
                                        py: 1.2,
                                        borderRadius: "10px",
                                        background: "linear-gradient(135deg, #7b2cbf, #4c1d95)",
                                        color: "#fff",
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        display: "inline-block",
                                        boxShadow: "0 0 10px rgba(121, 40, 202, 0.5)",
                                        transition: "0.3s",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                            boxShadow: "0 0 20px rgba(121, 40, 202, 0.7)",
                                        },
                                    }}
                                >
                                    Get Started
                                </Box>
                            </Box>
                        </>
                    )}
                </Paper>
            </Modal>

            {/* Form Modal */}
            <Modal open={formModalOpen} onClose={handleFormModalClose}>
                <Paper
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        p: 4,
                        width: { xs: "90%", md: 500 },
                        bgcolor: "#fff",
                        borderRadius: "20px",
                        boxShadow: "0 0 30px rgba(121, 40, 202, 0.5)",
                        color: "#000",
                        outline: "none",
                    }}
                >
                    {/* Back Arrow */}
                    <IconButton
                        onClick={handleFormModalClose}
                        sx={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            color: "#888",
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, textAlign: "center" }}>
                        Request More Info
                    </Typography>

                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <input placeholder="Name" style={inputStyle} />
                        <input placeholder="Mobile Number" style={inputStyle} />
                        <input type="email" placeholder="Email" style={inputStyle} />

                        <select
                            value={selectedSubService}
                            onChange={(e) => setSelectedSubService(e.target.value)}
                            style={{ ...inputStyle, cursor: "pointer" }}
                        >
                            <option value="">Select Service</option>
                            {selectedSolution?.subServices.map((sub, i) => (
                                <option key={i} value={sub}>
                                    {sub}
                                </option>
                            ))}
                        </select>

                        <textarea
                            rows={3}
                            readOnly
                            value={
                                selectedSubService
                                    ? `I need info related to ${selectedSubService}`
                                    : ""
                            }
                            placeholder="Message"
                            style={{ ...inputStyle, resize: "none" }}
                        />

                        <Box
                            sx={{
                                mt: 1,
                                textAlign: "center",
                                width: "fit-content", 
                                maxWidth: "300px",     
                                paddingInline: "24px",    // Horizontal padding
                                marginInline: "auto",     // Center horizontally
                                background: "linear-gradient(135deg, #7b2cbf, #4c1d95)",
                                color: "white",
                                py: 1,
                                borderRadius: "10px",
                                cursor: "pointer",
                                fontWeight: 600,
                                "&:hover": {
                                    boxShadow: "0 0 15px rgba(121, 40, 202, 0.7)",
                                    transform: "scale(1.03)",
                                },
                            }}
                        >
                            Submit
                        </Box>
                    </Box>
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
