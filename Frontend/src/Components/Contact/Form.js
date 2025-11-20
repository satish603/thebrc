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

const API_URL = "https://mail-porter.vercel.app/api/email/send-email/gmail";
const API_KEY = "SuperSecretApiKey123!@#";
const BRAND   = "brchub";

const Form = () => {
  // react-hook-form with defaults
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      countryCode: "+91",
      message: "Please add a message or select a service.",
      service: ""
    }
  });

  // form control states
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(''); // shows API success/error only
  const [selectedService, setSelectedService] = useState('');
  const [userMessage, setUserMessage] = useState(watch('message') || 'Please add a message or select a service.');

  // sync react-hook-form message when userMessage changes
  useEffect(() => {
    setValue('message', userMessage);
  }, [userMessage, setValue]);

  // when service changes, prefill userMessage but keep it editable
  useEffect(() => {
    if (selectedService === "Other") {
      setUserMessage(''); // blank for custom message
      setValue('message', '');
    } else if (!selectedService) {
      const defaultMsg = 'Please add a message or select a service.';
      setUserMessage(defaultMsg);
      setValue('message', defaultMsg);
    } else {
      const svcMsg = `I need info related to ${selectedService} service.`;
      setUserMessage(svcMsg);
      setValue('message', svcMsg);
    }
  }, [selectedService, setValue]);

  // AUTO-HIDE: clear statusMessage after a few seconds
  useEffect(() => {
    if (!statusMessage) return;
    const t = setTimeout(() => {
      setStatusMessage('');
    }, 4500); // 4.5 seconds — adjust if you want shorter/longer

    return () => clearTimeout(t);
  }, [statusMessage]);

  const onSubmit = async (data) => {
    setLoading(true);
    setStatusMessage('');
    // Use the form values (countryCode + phone)
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
        setStatusMessage("Email received! We will contact you soon.");
        setLoading(false);
        // reset form but keep default country code and default message
        reset({
          countryCode: "+91",
          message: "Please add a message or select a service.",
          name: "",
          email: "",
          phone: "",
          service: ""
        });
        setSelectedService("");
        setUserMessage("Please add a message or select a service.");
      } else {
        console.error("API error:", await response.text());
        setStatusMessage("Something went wrong. Try again!");
        setLoading(false);
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatusMessage("Something went wrong. Try again!");
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
            {...register('name', { required: 'Please enter your name!' })}
          />
          {errors.name && (
            <Typography sx={styles.ErrorMessage}>
              <ErrorIcon /> {errors.name.message}
            </Typography>
          )}
        </Grid>

        {/* Phone Number */}
        <Grid item md={6} xs={12}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <InputBase
              placeholder="+91"
              defaultValue="+91"
              sx={{ ...styles.InputField, width: "100px", fontWeight: 600 }}
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
                  value: /^[0-9]{7,15}$/,
                  message: 'Enter a valid phone number!',
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
            value={userMessage}
            onChange={(e) => {
              setUserMessage(e.target.value);
              setValue('message', e.target.value);
            }}
            {...register('message', {
              required: 'Please add a message or select a service',
              minLength: { value: 25, message: 'Message should be at least 25 characters!' },
              maxLength: { value: 1000, message: 'Message should not exceed 1000 characters!' }
            })}
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
                backgroundColor: statusMessage.startsWith('Email received') ? "primary.success" : "primary.main"
              }}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: "background.default" }} />
              ) : (
                <>Send Message <ArrowForwardTwoToneIcon /></>
              )}
            </ButtonBase>

            {/* Show only API status (success/error). This prevents the form message from appearing here. */}
            <Typography
              variant="body1"
              component="p"
              sx={{
                ...styles.SendText,
                color: statusMessage.startsWith('Email received') ? "primary.success" : "primary.main",
                marginTop: "0.8rem"
              }}
            >
              {statusMessage}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
