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
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Solutions from "Data/About/Solution.data";
import styles from "Styles/About/Solution.styles";

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

const API_URL = "https://mail-porter.vercel.app/api/email/send-email/hostinger";
const API_KEY = "SuperSecretApiKey123!@#";
const BRAND   = "brchub";

const Solution = () => {
  const [open, setOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedSubService, setSelectedSubService] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [name, setName]     = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail]   = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleOpen = (solution) => {
    setSelectedSolution(solution);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedSolution(null);
  };
  const handleFormModalOpen = () => setFormModalOpen(true);
  const handleFormModalClose = () => {
    setFormModalOpen(false);
    setSelectedSubService("");
    setName("");
    setMobile("");
    setEmail("");
    setErrors({});
  };

  const validateForm = () => {
    const formErrors = {};
    if (!name.trim()) formErrors.name = "Name is required";
    if (!email.trim()) formErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      formErrors.email = "Invalid email address";
    if (mobile && !/^\d{10}$/.test(mobile))
      formErrors.mobile = "Phone number must be exactly 10 digits";
    if (!selectedSubService) formErrors.service = "Please select a service.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const payload = {
      name,
      email,
      mobile,
      message: `I need info related to ${selectedSubService}`,
      brand: BRAND,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setConfirmationOpen(true);
        setFormModalOpen(false);
        setTimeout(() => setConfirmationOpen(false), 3000);
        setName("");
        setMobile("");
        setEmail("");
        setSelectedSubService("");
        setErrors({});
      } else {
        console.error("API error:", await res.text());
      }
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: "4em" }}>
      <Grid container spacing={2}>
        {Solutions.map((solution, i) => {
          const controls = useAnimation();
          const [ref, inView] = useInView({ threshold: 0.2 });
          useEffect(() => {
            controls.start(inView ? "visible" : "hidden");
          }, [controls, inView]);

          const variants = {
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: i * 0.1 },
            },
          };

          return (
            <Grid item md={3} sm={6} xs={12} key={i}>
              <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={variants}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    p: 2,
                    borderRadius: "20px",
                    transition: "0.3s ease",
                    "&:hover": {
                      boxShadow: "0 0 20px rgba(121,40,202,0.4)",
                      transform: "scale(1.03)",
                    },
                  }}
                  onClick={() => handleOpen(solution)}
                >
                  <Box
                    component="img"
                    src={solution.icon}
                    sx={styles.Image}
                  />
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

      {/* Main Modal */}
      <Modal open={open} onClose={handleClose}>
        <Paper sx={styles.MainModal}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8, color: "#888" }}
          >
            <CloseIcon />
          </IconButton>
          {selectedSolution && (
            <>
              <Typography variant="h5" sx={styles.ModalTitle}>
                {selectedSolution.title}
              </Typography>
              <Typography sx={styles.ModalText}>
                {selectedSolution.popupDescription}
              </Typography>
              <Typography sx={styles.ModalSubheader}>
                {selectedSolution.popupaboutservices}
              </Typography>
              <List>
                {selectedSolution.subServices.map((sub, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemText primary={`✔️ ${sub}`} />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Box sx={styles.GetStartedBtn} onClick={handleFormModalOpen}>
                  Get Started
                </Box>
              </Box>
            </>
          )}
        </Paper>
      </Modal>

      {/* Form Modal */}
      <Modal open={formModalOpen} onClose={handleFormModalClose}>
        <Paper sx={styles.FormModal}>
          <IconButton
            onClick={handleFormModalClose}
            sx={{ position: "absolute", top: 8, left: 8, color: "#888" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={styles.FormHeader}>
            Request More Info
          </Typography>
          <Box sx={styles.FormBody}>
            <input
              placeholder="Name"
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div style={errorTextStyle}>{errors.name}</div>}

            <input
              placeholder="Mobile Number"
              maxLength={10}
              style={inputStyle}
              value={mobile}
              onChange={(e) => {
                const v = e.target.value;
                if (/^\d*$/.test(v)) setMobile(v);
              }}
            />
            {errors.mobile && <div style={errorTextStyle}>{errors.mobile}</div>}

            <input
              type="email"
              placeholder="Email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div style={errorTextStyle}>{errors.email}</div>}

            <select
              style={{ ...inputStyle, cursor: "pointer" }}
              value={selectedSubService}
              onChange={(e) => setSelectedSubService(e.target.value)}
            >
              <option value="">Select Service</option>
              {selectedSolution?.subServices.map((sub, idx) => (
                <option key={idx} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
            {errors.service && <div style={errorTextStyle}>{errors.service}</div>}

            <textarea
              rows={3}
              readOnly
              placeholder="Message"
              style={{ ...inputStyle, resize: "none" }}
              value={selectedSubService ? `I need info related to ${selectedSubService}` : ""}
            />

            <Box sx={styles.SubmitFormBtn} onClick={handleFormSubmit}>
              {loading ? "Sending..." : "Submit"}
            </Box>
          </Box>
        </Paper>
      </Modal>

      {/* Confirmation Modal */}
      <Modal open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <Paper sx={styles.ConfirmationModal}>
          <Typography variant="h6" sx={styles.ConfirmationTitle}>
            🎉 Query Submitted!
          </Typography>
          <Typography sx={styles.ConfirmationText}>
            We'll get back to you soon!
          </Typography>
        </Paper>
      </Modal>
    </Box>
  );
};

export default Solution;
