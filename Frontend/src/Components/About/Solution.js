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
  import { useState, useEffect, useRef } from "react";
  import CloseIcon from "@mui/icons-material/Close";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import { motion, useAnimation } from "framer-motion";
  import { useInView } from "react-intersection-observer";
  
  // Data
  import Solutions from "Data/About/Solution.data";
  
  // Styles
  import styles from "Styles/About/Solution.styles";

    // const YourComponent = () => {
    // const nameRef = useRef(null);
    // const emailRef = useRef(null);
    // const mobileRef = useRef(null);
    // const serviceRef = useRef(null); // if service dropdown/select
    
    
  
  const inputStyle = {
    padding: "10px 15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "0.95rem",
    outline: "none",
    width: "100%",
  };
  
  const errorTextStyle = {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
  };
  
  const Solution = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedSolution, setSelectedSolution] = useState(null);
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [selectedSubService, setSelectedSubService] = useState("");
    const [confirmationOpen, setConfirmationOpen] = useState(false);
  
    // Form states
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
  
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
      setName("");
      setMobile("");
      setEmail("");
      setErrors({});
    };
  
    const validateForm = () => {
        let formErrors = {};
    
        if (!name.trim()) formErrors.name = "Name is required";
        if (!email.trim()) {
          formErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          formErrors.email = "Invalid email address";
        }
        if (mobile && !/^\d{10}$/.test(mobile)) {
          formErrors.mobile = "Phone number must be exactly 10 digits";
        }
        if (!selectedSubService) {
          formErrors.service = "Please select a service.";
        }
    
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
      };
      
  
      const handleFormSubmit = async () => {
        if (!validateForm()) return;
      
        setLoading(true);
      
        // Build payload for Mail-Porter
        const payload = {
          name: name,
          email: email,
          mobile: mobile,
          message: `I need info related to ${selectedSubService}`,
          brand: "brchub"
        };
      
        try {
          const response = await fetch(
            "https://mail-porter.vercel.app/api/email/send-email/gmail",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": "SuperSecretApiKey123!@#"
              },
              body: JSON.stringify(payload)
            }
          );
      
          if (response.ok) {
            // close form, show confirmation
            setFormModalOpen(false);
            setConfirmationOpen(true);
            // auto-hide confirmation after 3s
            setTimeout(() => setConfirmationOpen(false), 3000);
      
            // reset fields
            setName("");
            setMobile("");
            setEmail("");
            setSelectedSubService("");
            setErrors({});
          } else {
            console.error("API Error:", await response.text());
            // you might show an error toast here
          }
        } catch (err) {
          console.error("Network Error:", err);
          // you might show an error toast here
        } finally {
          setLoading(false);
        }
      };
      
      
  
    return (
      <Box sx={{ mt: "4em" }}>
        <Grid container spacing={2}>
          {Solutions.map((solution, i) => {
            const controls = useAnimation();
            const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });
  
            useEffect(() => {
              if (inView) {
                controls.start("visible");
              } else {
                controls.start("hidden");
              }
            }, [controls, inView]);
  
            const cardVariants = {
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut", delay: i * 0.1 },
              },
            };
  
            return (
              <Grid item md={3} sm={6} xs={12} key={i}>
                <motion.div ref={ref} initial="hidden" animate={controls} variants={cardVariants}>
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
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
  
        {/* --- Main Modal --- */}
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
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", top: 8, right: 8, color: "#888" }}
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
                  {selectedSolution.subServices.map((sub, index) => (
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
  
        {/* --- Form Modal --- */}
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
            <IconButton
              onClick={handleFormModalClose}
              sx={{ position: "absolute", top: 8, left: 8, color: "#888" }}
            >
              <ArrowBackIcon />
            </IconButton>
  
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, textAlign: "center" }}>
              Request More Info
            </Typography>
  
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <input
                placeholder="Name"
                style={inputStyle}
                //   ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div style={errorTextStyle}>{errors.name}</div>}

  
              <input
                    type="text"
                    placeholder="Mobile Number (Optional)"
                    value={mobile}
                    // ref={mobileRef}
                    maxLength={10} // LIMIT input to max 10 digits
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) { // only allow digits
                        setMobile(value);
                        }
                    }}
                 style={inputStyle}
                />
                {errors.mobile && <div style={errorTextStyle}>{errors.mobile}</div>}

  
              <input
                type="email"
                placeholder="Email"
                style={inputStyle}
                value={email}
                // ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div style={errorTextStyle}>{errors.email}</div>}
  
              <select
                value={selectedSubService}
                // ref={serviceRef}
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
              {errors.service && <div style={errorTextStyle}>{errors.service}</div>}
  
              <textarea
                rows={3}
                readOnly
                value={selectedSubService ? `I need info related to ${selectedSubService}` : ""}
                placeholder="Message"
                style={{ ...inputStyle, resize: "none" }}
              />
  
              <Box
                onClick={handleFormSubmit}
                sx={{
                  mt: 1,
                  textAlign: "center",
                  width: "fit-content",
                  maxWidth: "300px",
                  paddingInline: "24px",
                  marginInline: "auto",
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
  
        {/* --- Success Modal --- */}
        <Modal open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              p: 3,
              width: { xs: "80%", md: 400 },
              bgcolor: "#fff",
              borderRadius: "20px",
              boxShadow: "0 0 30px rgba(121, 40, 202, 0.5)",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              🎉 Query Submitted!
            </Typography>
            <Typography sx={{ fontSize: "0.95rem", color: "gray" }}>
              We'll get back to you soon!
            </Typography>
          </Paper>
        </Modal>
  
        {/* Keyframes */}
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
  