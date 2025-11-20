import { useState, useEffect, useCallback } from "react";
import { Box, ButtonBase, Avatar, Typography, Rating } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";

//Data
import Clients from "Data/Client/Client.data";

//Styles
import styles from "Styles/Client/Slider.styles";

const Sliders = () => {
  // enable loop: true so embla clones slides for wrap-around
  const [viewportRef, embla] = useEmblaCarousel({
    dragFree: true,
    loop: true,
    containScroll: false,
    // align: "start", // optional if you want left alignment
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  // ---------------------------
  // Continuous auto-scroll (optional)
  // ---------------------------
  // This uses requestAnimationFrame to nudge embla each frame.
  // Tweak speedPxPerSec to increase/decrease scrolling speed.
  useEffect(() => {
    if (!embla) return;

    let raf = null;
    let lastTime = null;
    const speedPxPerSec = 30; // pixels per second. Tweak this to your preference.

    const step = (time) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      // Pause on hover
      if (!isHovered) {
        // embla.scrollBy takes pixels — small values create smooth motion.
        // Use a positive number to scroll forward; negative to go backward.
        const pxToScroll = (speedPxPerSec * delta) / 1000; // px for this frame
        // embla.scrollBy exists; use it for smooth, continuous scrolling.
        embla.scrollBy(pxToScroll, { skipSnaps: true });
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [embla, isHovered]);

  return (
    <Box sx={{ mt: "2em" }}>
      <Box
        className="embla"
        sx={{ ...styles.Embla, position: "relative" }}
        // attach hover handlers to pause/resume autoplay
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box className="embla__viewport" ref={viewportRef}>
          <Box className="embla__container" sx={styles.EmblaContainer}>
            {Clients &&
              Clients.map((client, i) => (
                <Box className="embla__slide" sx={styles.EmblaSlide} key={i}>
                  <Avatar alt={client.name} src={client.avatar} sx={styles.Avatar} />
                  <Box sx={{ mt: "4.5em", mb: "3em" }}>
                    <Typography variant="h6" component="h6" sx={styles.Title}>
                      {client.title}
                    </Typography>
                    <Rating name="half-rating-read" value={client.star} precision={0.5} readOnly />
                    <Typography variant="body1" component="p" sx={styles.Description}>
                      {client.review}
                    </Typography>
                  </Box>
                  <ButtonBase sx={styles.Name}>{client.name}</ButtonBase>
                </Box>
              ))}
          </Box>
        </Box>

        <Box sx={styles.Navigation}>
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </Box>
      </Box>
    </Box>
  );
};
export default Sliders;

/* PrevButton & NextButton unchanged */
const PrevButton = ({ enabled, onClick }) => (
  <Box
    onClick={enabled ? onClick : undefined}
    sx={{
      width: { xs: 50, md: 56 },
      height: { xs: 50, md: 56 },
      borderRadius: "50%",
      background: enabled ? "rgba(3, 42, 121, 0.6)" : "rgba(3, 42, 121, 0.3)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.15)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: enabled ? "pointer" : "not-allowed",
      transition: "all 0.3s ease",
      opacity: enabled ? 1 : 0.5,
      "&:hover": enabled
        ? {
            background: "rgba(13, 129, 202, 0.8)",
            transform: "scale(1.1)"
          }
        : {}
    }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </Box>
);

const NextButton = ({ enabled, onClick }) => (
  <Box
    onClick={enabled ? onClick : undefined}
    sx={{
      width: { xs: 50, md: 56 },
      height: { xs: 50, md: 56 },
      borderRadius: "50%",
      background: enabled ? "rgba(3, 42, 121, 0.6)" : "rgba(3, 42, 121, 0.3)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.15)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: enabled ? "pointer" : "not-allowed",
      transition: "all 0.3s ease",
      opacity: enabled ? 1 : 0.5,
      "&:hover": enabled
        ? {
            background: "rgba(13, 129, 202, 0.8)",
            transform: "scale(1.1)"
          }
        : {}
    }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </Box>
);
