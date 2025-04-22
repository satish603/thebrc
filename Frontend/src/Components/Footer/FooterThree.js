import { Box, Typography, Avatar, Stack } from "@mui/material";

//Styles
import styles from "Styles/Footer/FooterThree.styles"

const FooterThree = () => {
    return (
        <Box>
            {/* --- Founders' Note Section --- */}
            <Box>
  <Typography
    variant="h6"
    component="h6"
    sx={{
      fontFamily: `'Orbitron', sans-serif`,
      fontSize: '1.3rem',
      fontWeight: 600,
      letterSpacing: '1px',
      background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      mb: 1.5,
      mt: {lg: 5.5, xs: 0},
      textAlign:  'center',
    }}
  >
    Code like artists. Design like engineers.
  </Typography>
  <Typography
    variant="body2"
    component="p"
    sx={{
      fontStyle: 'italic',
      fontWeight: 700,
      color: '#555',
      textAlign: 'center',
    }}
  >
    That’s how we roll at BRC Hub 🚀
  </Typography>
</Box>


            {/* Mini Avatars (optional for personality & aesthetic) */}
            {/* <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Avatar alt="Founder 1" src="/images/founder1.jpg" />
                <Avatar alt="Founder 2" src="/images/founder2.jpg" />
                <Avatar alt="Founder 3" src="/images/founder3.jpg" />
            </Stack> */}

            {/* --- Old Newsletter Section (Preserved as-is for future) --- */}
            {/*
            <Typography variant="h6" component="h6" sx={styles.Title}>
                Newsletters
            </Typography>
            <Typography variant="body1" component="p" sx={styles.Description}>
                Let&apos;s be friends and get interesting news about us
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <InputBase
                    placeholder="Write Email"
                    sx={styles.InputField}
                    {...register(
                        'email',
                        {
                            required: 'Please enter an email address!',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'The email you entered is invalid!',
                            },
                        },
                        { required: true }
                    )}
                />
                {errors.email && (
                    <Typography variant='body1' component='p' sx={styles.ErrorMessage}>
                        <ErrorIcon />{errors.email.message}
                    </Typography>
                )}
                <ButtonBase
                    type="submit"
                    sx={{
                        ...styles.SubmitButton,
                        backgroundColor: `${success ? "primary.success" : "primary.main"}`
                    }}
                >
                    {!loading && !message &&
                        <>
                            Subscribe
                            <ArrowForwardTwoToneIcon />
                        </>
                    }
                    {loading &&
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress sx={{ color: "background.default" }} size={22} />
                        </Box>
                    }
                    {message && !loading &&
                        <>
                            {success &&
                                <Box>
                                    <DoneIcon sx={{ fontSize: "35px" }} />
                                </Box>
                            }
                            {!success &&
                                <Box>
                                    <CloseIcon sx={{ fontSize: "35px" }} />
                                </Box>
                            }
                        </>
                    }
                </ButtonBase>
            </Box>
            */}
        </Box>
    );
};

export default FooterThree;
