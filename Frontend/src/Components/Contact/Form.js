import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Grid,
  InputBase,
  InputAdornment,
  ButtonBase,
  Typography,
  CircularProgress
} from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import styles from "Styles/Contact/Form.styles";

const services = [
  "E-commerce Website",
  "Portfolio Website",
  "Business Website",
  "Personal Blog Website",
  "Landing Page",
  "Web Application (Custom)",
  "Mobile Application (Custom)",
  "UI/UX Design",
  "Logo Design",
  "Business Card Design",
  "Poster / Brochure Design",
  "Motion Graphics",
  "Video Editing",
  "2D Animation",
  "3D Animation",
  "Social Media Management",
  "Content Creation",
  "Digital Marketing",
  "SEO Optimization",
  "Website Maintenance",
  "Hosting & Domain Setup",
  "Payment Gateway Integration",
  "Chatbot Integration",
  "Website Speed Optimization",
  "Custom API Integration",
  "Other"
];

const API_URL = "https://mail-porter.vercel.app/api/email/send-email/privateemail";
const API_KEY = "SuperSecretApiKey123!@#";
const BRAND   = "brchub";

const Form = () => {
  const [loading, setLoading]               = useState(false);
  const [message, setMessage]               = useState('');
  const [success, setSuccess]               = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [isCustomMessage, setIsCustomMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  useEffect(() => {
    if (selectedService === "Other") {
      setIsCustomMessage(true);
      setValue('message', '');
    } else if (!selectedService) {
      setIsCustomMessage(false);
      setValue('message', 'Please add a message or select a service.');
    } else {
      setIsCustomMessage(false);
      setValue('message', `I need info related to ${selectedService} service.`);
    }
  }, [selectedService, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');
    setSuccess(false);

    const payload = {
      name: data.name,
      email: data.email,
      mobile: `${data.countryCode}${data.phone}`,
      message: data.message,
      brand: BRAND
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSuccess(true);
        setMessage("Email received! We will contact you soon.");
        reset();
        setSelectedService("");
        setIsCustomMessage(false);
      } else {
        console.error("API error:", await response.text());
        setSuccess(false);
        setMessage("Something went wrong. Try again!");
      }
    } catch (err) {
      console.error("Network error:", err);
      setSuccess(false);
      setMessage("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ mt: "3em" }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        {/* Full Name */}
        <Grid item md={6} xs={12}>
          <InputBase
            placeholder="Your Full Name"
            endAdornment={
              <InputAdornment position="end">
                <PersonOutlineOutlinedIcon />
              </InputAdornment>
            }
            sx={styles.InputField}
            {...register('name', { required: true })}
          />
          {errors.name && (
            <Typography sx={styles.ErrorMessage}>
              <ErrorIcon /> Please enter your name!
            </Typography>
          )}
        </Grid>

        {/* Phone Number */}
        <Grid item md={6} xs={12}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <InputBase
              placeholder="+91"
              sx={{ ...styles.InputField, width: "100px" }}
              {...register('countryCode', {
                required: 'Enter country code!',
                pattern: {
                  value: /^\+\d{1,4}$/,
                  message: 'Enter a valid code like +91 or +1',
                },
              })}
            />
            <InputBase
              placeholder="Phone Number"
              endAdornment={
                <InputAdornment position="end">
                  <PhoneIphoneIcon />
                </InputAdornment>
              }
              sx={{ ...styles.InputField, flexGrow: 1 }}
              {...register('phone', {
                required: 'Enter your phone number!',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Enter a valid 10-digit number!',
                },
              })}
            />
          </Box>
          {(errors.countryCode || errors.phone) && (
            <Typography sx={styles.ErrorMessage}>
              <ErrorIcon /> {errors.countryCode?.message || errors.phone?.message}
            </Typography>
          )}
        </Grid>

        {/* Email */}
        <Grid item md={6} xs={12}>
          <InputBase
            placeholder="Email Address"
            endAdornment={
              <InputAdornment position="end">
                <MailOutlineIcon />
              </InputAdornment>
            }
            sx={styles.InputField}
            {...register('email', {
              required: 'Please enter an email address!',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'The email you entered is invalid!',
              }
            })}
          />
          {errors.email && (
            <Typography sx={styles.ErrorMessage}>
              <ErrorIcon /> {errors.email.message}
            </Typography>
          )}
        </Grid>

        {/* Service Dropdown */}
        <Grid item md={6} xs={12}>
          <select
            style={{
              ...styles.InputField,
              width: '100%',
              padding: '0.8em',
              borderRadius: '5px',
              fontSize: '1rem',
            }}
            {...register('service', { required: 'Please select a service!' })}
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">-- Select a Service --</option>
            {services.map((svc, i) => (
              <option key={i} value={svc}>{svc}</option>
            ))}
          </select>
          {errors.service && (
            <Typography sx={styles.ErrorMessage}>
              <ErrorIcon /> {errors.service.message}
            </Typography>
          )}
        </Grid>

        {/* Message */}
        <Grid item md={6} xs={12}>
          <InputBase
            placeholder="Please add a message or select a service"
            multiline
            minRows={2}
            maxRows={5}
            sx={styles.MessageFiled}
            {...register('message', {
              required: 'Please add a message or select a service',
              minLength: { value: 25, message: 'Message should be at least 25 characters!' },
              maxLength: { value: 1000, message: 'Message should not exceed 1000 characters!' }
            })}
            disabled={!isCustomMessage && selectedService !== "Other"}
          />
          {errors.message && (
            <Typography sx={styles.ErrorMessage}>
              <ErrorIcon /> {errors.message.message}
            </Typography>
          )}
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Box textAlign="center">
            <ButtonBase
              type="submit"
              sx={{
                ...styles.SubmitButton,
                backgroundColor: success ? "primary.success" : "primary.main"
              }}
            >
              {!loading && !message && (
                <>Send Message <ArrowForwardTwoToneIcon /></>
              )}
              {loading && (
                <CircularProgress size={22} sx={{ color: "background.default" }} />
              )}
              {message && !loading && (
                success
                  ? <DoneIcon sx={{ fontSize: 35 }} />
                  : <CloseIcon sx={{ fontSize: 35 }} />
              )}
            </ButtonBase>
            <Typography
              variant="body1"
              component="p"
              sx={{
                ...styles.SendText,
                color: success ? "primary.success" : "primary.main"
              }}
            >
              {message}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
