import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

/**
 * Work - 3D Rotating Carousel with Stack Effect
 * Cards fan out in perspective with smooth auto-rotation
 */
const Work = ({ works = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying || works.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % works.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, works.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % works.length);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX || e.touches?.[0]?.clientX;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX;
    const diff = dragStartX.current - currentX;
    
    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Calculate card position and styling
  const getCardTransform = (index) => {
    let offset = index - currentIndex;
    
    // Handle wrap-around
    if (offset > works.length / 2) offset -= works.length;
    if (offset < -works.length / 2) offset += works.length;
    
    const isActive = offset === 0;
    const absOffset = Math.abs(offset);
    
    // Position calculations
    const translateX = offset * 65; // Horizontal spread
    const translateY = absOffset * 15; // Vertical lift
    const rotateY = offset * -15; // Perspective rotation
    const rotateZ = offset * -3; // Slight tilt
    const scale = isActive ? 1 : Math.max(0.75, 1 - absOffset * 0.12);
    
    return {
      transform: `
        translateX(${translateX}%) 
        translateY(${translateY}px) 
        rotateY(${rotateY}deg) 
        rotateZ(${rotateZ}deg) 
        scale(${scale})
      `,
      zIndex: 100 - absOffset * 10,
      opacity: Math.max(0.3, 1 - absOffset * 0.25),
      filter: isActive ? 'brightness(1) blur(0px)' : `brightness(0.7) blur(${Math.min(absOffset * 1.5, 3)}px)`,
      pointerEvents: isActive ? 'auto' : 'none',
    };
  };

  if (!works || works.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: 'center', color: '#fff' }}>
        <Typography>No work items to display</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        px: 0,
        position: "relative",
        overflow: "visible",
        minHeight: { xs: "700px", md: "850px" },
      }}
    >

      {/* Carousel Container */}
      <Box
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "500px", md: "600px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "2000px",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "280px", sm: "320px", md: "380px", lg: "420px" },
            height: { xs: "370px", sm: "420px", md: "500px", lg: "550px" },
            transformStyle: "preserve-3d",
          }}
        >
          {works.map((work, idx) => {
            const style = getCardTransform(idx);
            const isActive = (idx === currentIndex);

            return (
              <Box
                key={idx}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: isDragging 
                    ? "none" 
                    : "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                  ...style,
                }}
              >
                <Link href={work.url} passHref>
                  <Box
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                      overflow: "hidden",
                      textDecoration: "none",
                      color: "inherit",
                      background: "#fff",
                      boxShadow: isActive
                        ? "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)"
                        : "0 15px 40px rgba(0,0,0,0.3)",
                      position: "relative",
                    }}
                  >
                    {/* Card Image */}
                    <Box
                      component="img"
                      src={work.image}
                      alt={work.name}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* Overlay - Only on active card */}
                    {isActive && (
                      <Box
                        className="card-overlay"
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.85) 100%)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          p: { xs: 2.5, md: 3.5 },
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          "&:hover": {
                            opacity: 1,
                          },
                        }}
                      >
                        {/* Category Badge */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: { xs: 16, md: 24 },
                            left: { xs: 16, md: 24 },
                            px: 2,
                            py: 0.75,
                            borderRadius: "100px",
                            background: "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.2)",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              color: "#fff",
                              textTransform: "uppercase",
                              letterSpacing: "1.2px",
                            }}
                          >
                            {work.filter}
                          </Typography>
                        </Box>

                        {/* Title & CTA */}
                        <Typography
                          sx={{
                            fontSize: { xs: "1.3rem", md: "1.6rem" },
                            fontWeight: 700,
                            color: "#fff",
                            mb: 1,
                            lineHeight: 1.3,
                          }}
                        >
                          {work.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography
                            sx={{
                              fontSize: "0.95rem",
                              color: "rgba(255,255,255,0.95)",
                              fontWeight: 600,
                            }}
                          >
                            View Project
                          </Typography>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Navigation Controls */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 20, md: 40 },
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          zIndex: 10,
        }}
      >
        {/* Previous Button */}
        <Box
          onClick={handlePrev}
          sx={{
            width: { xs: 50, md: 56 },
            height: { xs: 50, md: 56 },
            borderRadius: "50%",
            background: "rgba(3, 42, 121, 0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "rgba(13, 129, 202, 0.8)",
              transform: "scale(1.1)",
            },
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Box>

        {/* Dot Indicators */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {works.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsAutoPlaying(false);
              }}
              sx={{
                width: currentIndex === idx ? 32 : 8,
                height: 8,
                borderRadius: "100px",
                background: currentIndex === idx
                  ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                  : "rgba(25, 29, 242, 0.3)",
                cursor: "pointer",
                transition: "all 0.4s ease",
                "&:hover": {
                  background: currentIndex === idx
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : "rgba(255,255,255,0.5)",
                },
              }}
            />
          ))}
        </Box>

        {/* Next Button */}
        <Box
          onClick={handleNext}
          sx={{
            width: { xs: 50, md: 56 },
            height: { xs: 50, md: 56 },
            borderRadius: "50%",
            background: "rgba(3, 42, 121, 0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "rgba(13, 129, 202, 0.8)",
              transform: "scale(1.1)",
            },
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Box>
      </Box>

      {/* Play/Pause Toggle */}
      <Box
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        sx={{
          position: "absolute",
          top: { xs: 20, md: 30 },
          right: { xs: 20, md: 40 },
          px: 2.5,
          py: 1,
          borderRadius: "100px",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
          cursor: "pointer",
          transition: "all 0.3s ease",
          zIndex: 10,
          "&:hover": {
            background: "rgba(0,0,0,0.75)",
            transform: "scale(1.05)",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {isAutoPlaying ? "⏸ Pause" : "▶ Play"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Work;