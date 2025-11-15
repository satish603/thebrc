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
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Data
import Solutions from "Data/About/Solution.data";

// Styles
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

// Child item component: keeps hooks at top-level (fixes rules-of-hooks errors)
function SolutionItem({ solution, index, onOpen }) {
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
      transition: { duration: 0.6, ease: "easeOut", delay: index * 0.1 },
    },
  };

  return (
    <Grid item md={3} sm={6} xs={12}>
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
          onClick={() => onOpen(solution)}
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
}

const Solution = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // main modal (either direct description or category selector)
  const [selectedSolution, setSelectedSolution] = useState(null);

  // NEW: for when a solution (like Web & App) exposes internal sub-cards
  const [selectedSubItem, setSelectedSubItem] = useState(null); // object: { key, title, popupDescription, subServices, ... }
  const [subDescOpen, setSubDescOpen] = useState(false); // description modal for the chosen sub-item

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedSubService, setSelectedSubService] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedSubService) {
      setMessage(`I need info related to ${selectedSubService}`);
    }
  }, [selectedSubService]);

  const handleOpen = (solution) => {
    setSelectedSolution(solution);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSolution(null);
    // reset any sub-item selection
    setSelectedSubItem(null);
    setSubDescOpen(false);
  };

  // When a sub-card (like Web or App inside the merged modal) is clicked
  const handleOpenSubItem = (subItem) => {
    setSelectedSubItem(subItem);
    setSubDescOpen(true);
  };

  const handleCloseSubDesc = () => {
    setSelectedSubItem(null);
    setSubDescOpen(false);
  };

  const handleFormModalOpen = () => {
    // if subDescOpen and selectedSubItem set, pre-select service list from that sub-item
    setFormModalOpen(true);
  };

  const handleFormModalClose = () => {
    setFormModalOpen(false);
    setSelectedSubService("");
    setName("");
    setMobile("");
    setEmail("");
    setMessage("");
    setErrors({});
    setLoading(false);
  };

  const validateForm = () => {
    let formErrors = {};

    if (!name.trim()) formErrors.name = "Name is required";
    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = "Invalid email address";
    }
    if (!mobile.trim()) {
      formErrors.mobile = "Please enter your mobile number.";
    } else if (!/^\d{10,}$/.test(mobile.trim())) {
      formErrors.mobile = "Mobile number must be at least 10 digits.";
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

    const payload = {
      name: name,
      email: email,
      mobile: mobile,
      message: message,
      brand: "brchub",
    };

    try {
      const response = await fetch(
        "https://mail-porter.vercel.app/api/email/send-email/gmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "SuperSecretApiKey123!@#",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setFormModalOpen(false);
        setConfirmationOpen(true);
        setTimeout(() => setConfirmationOpen(false), 3000);

        setName("");
        setMobile("");
        setEmail("");
        setSelectedSubService("");
        setMessage("");
        setErrors({});
      } else {
        console.error("API Error:", await response.text());
      }
    } catch (err) {
      console.error("Network Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // helper to get subServices array for the form dropdown
  const getCurrentSubServices = () => {
    if (selectedSubItem && selectedSubItem.subServices) return selectedSubItem.subServices;
    if (selectedSolution?.subServices) return selectedSolution.subServices;
    return [];
  };

  return (
    <Box sx={{ mt: "4em" }}>
      <Grid container spacing={2}>
        {Solutions.map((solution, i) => (
          <SolutionItem key={i} solution={solution} index={i} onOpen={handleOpen} />
        ))}
      </Grid>

      {/* Main Modal — cleaner UI */}
      <Modal open={open} onClose={handleClose}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: { xs: 3, md: 5 },
            width: { xs: "92%", sm: 720 },
            bgcolor: "#fff",
            borderRadius: "18px",
            boxShadow: "0 20px 60px rgba(17, 63, 155, 0.45)",
            color: "#0f172a",
            outline: "none",
          }}
        >
          {/* Close */}
          <IconButton
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: "rgba(15,23,42,0.6)",
              background: "transparent",
              "&:hover": { background: "rgba(15,23,42,0.04)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              textAlign: "center",
              color: "#111827",
              mb: 1,
              fontSize: { xs: "1.25rem", md: "1.6rem" },
            }}
          >
            {selectedSolution?.title}
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              textAlign: "center",
              color: "rgba(15,23,42,0.7)",
              fontSize: "0.95rem",
              maxWidth: 900,
              margin: "0 auto",
              mb: 3,
              lineHeight: 1.5,
            }}
          >
            {selectedSolution?.popupDescription}
          </Typography>

          {/* If subCategories present -> show two nice cards */}
          {selectedSolution?.subCategories ? (
            <Grid
              container
              spacing={3}
              sx={{
                alignItems: "stretch",
                justifyContent: "center",
                px: { xs: 1, md: 2 },
              }}
            >
              {selectedSolution.subCategories.map((sub) => (
                <Grid item xs={12} sm={6} key={sub.key} sx={{ display: "flex" }}>
                  <Paper
                    onClick={() => handleOpenSubItem(sub)}
                    elevation={0}
                    sx={{
                      cursor: "pointer",
                      p: { xs: 3, md: 4 },
                      borderRadius: 12,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      border: "1px solid rgba(15,23,42,0.06)",
                      background: "linear-gradient(180deg, #ffffff, #fbfbfd)",
                      transition: "transform 200ms ease, box-shadow 200ms ease",
                      boxShadow: "0 6px 20px rgba(2,6,23,0.06)",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 14px 40px rgba(2,6,23,0.08)",
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: "1rem", md: "1.05rem" },
                          color: "#0f172a",
                          mb: 1,
                        }}
                      >
                        {sub.title}
                      </Typography>
                      <Typography sx={{ color: "rgba(15,23,42,0.65)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                        {sub.popupDescription}
                      </Typography>
                    </Box>

                    {/* Accent / badge at bottom */}
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                      <Box
                        sx={{
                          px: 3,
                          py: "8px",
                          borderRadius: "999px",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          background: "linear-gradient(90deg,#7b2cbf,#4c1d95)",
                          color: "#fff",
                          boxShadow: "0 6px 18px rgba(123,44,191,0.18)",
                          textAlign: "center",
                          transition: "transform 0.2s ease, box-shadow 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: "0 10px 25px rgba(123,44,191,0.25)",
                          },
                        }}
                      >
                        Explore
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            /* fallback: original single-solution layout (unchanged content) */
            <>
              <Typography sx={{ mb: 2, color: "rgba(15,23,42,0.8)", fontWeight: 400 }}>
                {selectedSolution?.popupDescription}
              </Typography>

              <Typography sx={{ mb: 2, color: "rgba(15,23,42,0.9)", fontWeight: 700 }}>
                {selectedSolution?.popupaboutservices}
              </Typography>

              <List dense sx={{ mb: 2 }}>
                {selectedSolution?.subServices?.map((sub, idx) => (
                  <ListItem key={idx} disablePadding sx={{ mb: 1 }}>
                    <ListItemText
                      primary={<Typography sx={{ color: "#0f172a", fontSize: "0.95rem" }}>✔️ {sub}</Typography>}
                    />
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Box
                  onClick={() => {
                    if (selectedSolution.subServices && selectedSolution.subServices[0]) {
                      setSelectedSubService(selectedSolution.subServices[0]);
                    }
                    handleFormModalOpen();
                  }}
                  sx={{
                    px: 4,
                    py: "10px",
                    borderRadius: "10px",
                    display: "inline-block",
                    background: "linear-gradient(90deg,#7b2cbf,#4c1d95)",
                    color: "#fff",
                    fontWeight: 700,
                    letterSpacing: 0.2,
                    cursor: "pointer",
                    boxShadow: "0 8px 30px rgba(92,56,154,0.12)",
                    transition: "transform 160ms ease",
                    "&:hover": { transform: "translateY(-3px)" },
                  }}
                >
                  Get Started
                </Box>
              </Box>
            </>
          )}
        </Paper>
      </Modal>

      {/* Sub-item Description Modal (for subCategories like Web / App when the main card had multiple choices) */}
      <Modal open={subDescOpen} onClose={handleCloseSubDesc}>
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
          <IconButton onClick={handleCloseSubDesc} sx={{ position: "absolute", top: 8, right: 8, color: "#888" }}>
            <CloseIcon />
          </IconButton>

          {selectedSubItem && (
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
                {selectedSubItem.title}
              </Typography>

              <Typography sx={{ mb: 2, color: "black", fontWeight: 300 }}>{selectedSubItem.popupDescription}</Typography>

              <Typography sx={{ mb: 2, color: "black", fontWeight: 700 }}>
                {selectedSubItem.popupaboutservices || "Our services include:"}
              </Typography>

              <List>
                {selectedSubItem.subServices.map((sub, index) => (
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

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Box
                  onClick={() => {
                    // preselect first subservice (helpful UX)
                    if (selectedSubItem.subServices && selectedSubItem.subServices[0]) {
                      setSelectedSubService(selectedSubItem.subServices[0]);
                    }
                    handleFormModalOpen();
                  }}
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
          <IconButton onClick={handleFormModalClose} sx={{ position: "absolute", top: 8, left: 8, color: "#888" }}>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, textAlign: "center" }}>
            Request More Info
          </Typography>

          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <input
              placeholder="Name"
              style={{ ...inputStyle, background: loading ? "#f5f5f5" : undefined }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            {errors.name && <div style={errorTextStyle}>{errors.name}</div>}

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setMobile(value);
                }
              }}
              style={{ ...inputStyle, background: loading ? "#f5f5f5" : undefined }}
              disabled={loading}
            />
            {errors.mobile && <div style={errorTextStyle}>{errors.mobile}</div>}

            <input
              type="email"
              placeholder="Email"
              style={{ ...inputStyle, background: loading ? "#f5f5f5" : undefined }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            {errors.email && <div style={errorTextStyle}>{errors.email}</div>}

            <select
              value={selectedSubService}
              onChange={(e) => setSelectedSubService(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer", background: loading ? "#f5f5f5" : undefined }}
              disabled={loading}
            >
              <option value="">Select Service</option>
              {getCurrentSubServices().map((sub, i) => (
                <option key={i} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
            {errors.service && <div style={errorTextStyle}>{errors.service}</div>}

            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              style={{ ...inputStyle, resize: "none", background: loading ? "#f5f5f5" : undefined }}
              disabled={loading}
            />

            <Box
              onClick={() => {
                if (!loading) handleFormSubmit();
              }}
              role="button"
              aria-disabled={loading}
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
                cursor: loading ? "default" : "pointer",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "center",
                pointerEvents: loading ? "none" : "auto",
                opacity: loading ? 0.85 : 1,
                "&:hover": {
                  boxShadow: loading ? "none" : "0 0 15px rgba(121, 40, 202, 0.7)",
                  transform: loading ? "none" : "scale(1.03)",
                },
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={18} thickness={5} sx={{ color: "white" }} />
                  <Typography sx={{ fontSize: "0.95rem", fontWeight: 700 }}>Submitting...</Typography>
                </>
              ) : (
                <Typography sx={{ fontSize: "0.95rem", fontWeight: 700 }}>Submit</Typography>
              )}
            </Box>
          </Box>
        </Paper>
      </Modal>

      {/* Success Modal */}
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
            Query Submitted!
          </Typography>
          <Typography sx={{ fontSize: "0.95rem", color: "gray" }}>We&apos;ll get back to you soon!</Typography>
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
