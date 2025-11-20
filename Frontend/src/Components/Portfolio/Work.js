import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Modal, IconButton } from "@mui/material";
import Link from "next/link";


function MovingMarquee({ images = [], height = 140, gap = 12, speed = 28 }) {
  const [pool, setPool] = useState([]);

  useEffect(() => {
    setPool(images.filter(Boolean));
  }, [images]);

  if (!pool || pool.length === 0) return null;

  const estimatedMinWidth = Math.round(height * 0.95);


  const copies = 10; // Make 10 copies of all 19 images
  
  const topArray = [];
  for (let c = 0; c < copies; c++) {
    pool.forEach(img => topArray.push(img));
  }

  const bottomArray = [];
  const reversedPool = [...pool].reverse();
  for (let c = 0; c < copies; c++) {
    reversedPool.forEach(img => bottomArray.push(img));
  }

  return (
    <Box className="moving-marquee" sx={{ width: "100%", overflow: "hidden", pointerEvents: "none", mb: 2, position: "relative" }}>
      {/* TOP ROW - Moving Left */}
      <Box
        className="marquee-track"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: `${gap}px`,
          mb: { xs: 1, md: 1.5 },
          whiteSpace: "nowrap",
          animation: `marqueeScrollLeft ${speed}s linear infinite`,
        }}
      >
        {topArray.map((src, i) => (
          <Box
            key={`top-${i}`}
            component="img"
            src={src}
            alt={`img-${i}`}
            draggable={false}
            sx={{
              height: height,
              width: `${estimatedMinWidth}px`,
              minWidth: `${estimatedMinWidth}px`,
              flex: "0 0 auto",
              borderRadius: 2,
              objectFit: "cover",
              boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
              background: "#fff",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ))}
        {/* Duplicate the entire array again for seamless loop */}
        {topArray.map((src, i) => (
          <Box
            key={`top-dup-${i}`}
            component="img"
            src={src}
            alt={`img-dup-${i}`}
            draggable={false}
            sx={{
              height: height,
              width: `${estimatedMinWidth}px`,
              minWidth: `${estimatedMinWidth}px`,
              flex: "0 0 auto",
              borderRadius: 2,
              objectFit: "cover",
              boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
              background: "#fff",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ))}
      </Box>

      {/* BOTTOM ROW - Moving Right (Reversed) */}
      <Box
        className="marquee-track"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: `${gap}px`,
          whiteSpace: "nowrap",
          animation: `marqueeScrollRight ${speed * 1.02}s linear infinite`,
        }}
      >
        {bottomArray.map((src, i) => (
          <Box
            key={`bot-${i}`}
            component="img"
            src={src}
            alt={`img-b-${i}`}
            draggable={false}
            sx={{
              height: height,
              width: `${estimatedMinWidth}px`,
              minWidth: `${estimatedMinWidth}px`,
              flex: "0 0 auto",
              borderRadius: 2,
              objectFit: "cover",
              boxShadow: "0 8px 20px rgba(2,6,23,0.06)",
              background: "#fff",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ))}
        {/* Duplicate for seamless loop */}
        {bottomArray.map((src, i) => (
          <Box
            key={`bot-dup-${i}`}
            component="img"
            src={src}
            alt={`img-b-dup-${i}`}
            draggable={false}
            sx={{
              height: height,
              width: `${estimatedMinWidth}px`,
              minWidth: `${estimatedMinWidth}px`,
              flex: "0 0 auto",
              borderRadius: 2,
              objectFit: "cover",
              boxShadow: "0 8px 20px rgba(2,6,23,0.06)",
              background: "#fff",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ))}
      </Box>

      <style jsx="true">{`
        @keyframes marqueeScrollLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeScrollRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .moving-marquee img {
          transition: height 220ms ease;
          will-change: transform;
          -webkit-user-drag: none;
        }

        @media (max-width: 700px) {
          .moving-marquee img {
            height: ${Math.max(96, Math.round(height * 0.75))}px !important;
            width: ${Math.round(estimatedMinWidth * 0.75)}px !important;
            min-width: ${Math.round(estimatedMinWidth * 0.75)}px !important;
          }
        }
        
        @media (max-width: 480px) {
          .moving-marquee img {
            height: ${Math.max(80, Math.round(height * 0.65))}px !important;
            width: ${Math.round(estimatedMinWidth * 0.65)}px !important;
            min-width: ${Math.round(estimatedMinWidth * 0.65)}px !important;
          }
        }
      `}</style>
    </Box>
  );
}

const Work = ({ works = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false); // App modal (launching soon)
  const [graphicModalOpen, setGraphicModalOpen] = useState(false);
  const [currentGraphicIndex, setCurrentGraphicIndex] = useState(0);
  const [graphicList, setGraphicList] = useState([]);
  const dragStartX = useRef(0);

  useEffect(() => {
    if (works.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % works.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [works.length]);

  const handlePrev = () => setCurrentIndex((p) => (p - 1 + works.length) % works.length);
  const handleNext = () => setCurrentIndex((p) => (p + 1) % works.length);

  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX || e.touches?.[0]?.clientX;
  };
  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX;
    const diff = dragStartX.current - currentX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) handleNext();
      else handlePrev();
      setIsDragging(false);
    }
  };
  const handleDragEnd = () => setIsDragging(false);

  const defaultGraphicPool = works.filter((w) => w.filter === "graphic").map((w) => w.image);

  const handleCardClick = (e, work) => {
    if (work.filter === "app") {
      e.preventDefault();
      setShowModal(true);
      return;
    }
    if (work.filter === "graphic") {
      e.preventDefault();
      let images = Array.isArray(work.gallery) && work.gallery.length > 0 ? [...work.gallery] : [...defaultGraphicPool];
      images = images.filter((src) => src !== work.image);
      if (images.length === 0) images = defaultGraphicPool.filter((s) => s !== work.image);
      setGraphicList(images);
      setCurrentGraphicIndex(0);
      setGraphicModalOpen(true);
      return;
    }
  };

  const getCardTransform = (index) => {
    let offset = index - currentIndex;
    if (offset > works.length / 2) offset -= works.length;
    if (offset < -works.length / 2) offset += works.length;
    const isActive = offset === 0;
    const absOffset = Math.abs(offset);
    const shouldHide = absOffset > 3;
    const translateX = offset * 65;
    const translateY = absOffset * 15;
    const rotateY = offset * -15;
    const rotateZ = offset * -3;
    const scale = isActive ? 1 : Math.max(0.75, 1 - absOffset * 0.12);

    return {
      transform: `
        translateX(${translateX}%)
        translateY(${translateY}px)
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
        scale(${scale})
      `,
      zIndex: shouldHide ? -10 : 100 - absOffset * 10,
      opacity: shouldHide ? 0 : Math.max(0.3, 1 - absOffset * 0.25),
      filter: isActive ? "brightness(1) blur(0px)" : `brightness(0.7) blur(${Math.min(absOffset * 1.5, 3)}px)`,
      pointerEvents: isActive ? "auto" : "none",
      visibility: shouldHide ? "hidden" : "visible",
    };
  };

  if (!works || works.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: "center", color: "#fff" }}>
        <Typography>No work items to display</Typography>
      </Box>
    );
  }

  const appImages = works.filter((w) => w.filter === "app").map((w) => w.image);

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, px: 0, position: "relative", overflow: "visible", minHeight: { xs: "700px", md: "850px" } }}>
      {/* Carousel (unchanged) */}
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
        <Box sx={{ position: "relative", width: { xs: "280px", sm: "320px", md: "380px", lg: "420px" }, height: { xs: "370px", sm: "420px", md: "500px", lg: "550px" }, transformStyle: "preserve-3d" }}>
          {works.map((work, idx) => {
            const style = getCardTransform(idx);
            const isActive = idx === currentIndex;
            return (
              <Box key={idx} sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", transformStyle: "preserve-3d", transition: isDragging ? "none" : "all 0.7s cubic-bezier(0.16,1,0.3,1)", ...style }}>
                <Link href={work.url} passHref>
                  <Box
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleCardClick(e, work)}
                    sx={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                      overflow: "hidden",
                      textDecoration: "none",
                      color: "inherit",
                      background: "#fff",
                      boxShadow: isActive ? "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)" : "0 15px 40px rgba(0,0,0,0.3)",
                      position: "relative",
                    }}
                  >
                    <Box component="img" src={work.image} alt={work.name} loading="lazy" sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    {isActive && (
                      <Box className="card-overlay" sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.85) 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", p: { xs: 2.5, md: 3.5 }, opacity: 0, transition: "opacity 0.3s ease", "&:hover": { opacity: 1 } }}>
                        <Box sx={{ position: "absolute", top: { xs: 16, md: 24 }, left: { xs: 16, md: 24 }, px: 2, py: 0.75, borderRadius: "100px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                          <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "1.2px" }}>{work.filter}</Typography>
                        </Box>
                        <Typography sx={{ fontSize: { xs: "1.3rem", md: "1.6rem" }, fontWeight: 700, color: "#fff", mb: 1, lineHeight: 1.3 }}>{work.name}</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography sx={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.95)", fontWeight: 600 }}>{work.filter === "app" ? "View Details" : "View Project"}</Typography>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

      {/* Controls (unchanged) */}
      <Box sx={{ position: "absolute", bottom: { xs: 20, md: 40 }, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 2.5, zIndex: 10 }}>
        <Box onClick={handlePrev} sx={{ width: { xs: 50, md: 56 }, height: { xs: 50, md: 56 }, borderRadius: "50%", background: "rgba(3, 42, 121, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s ease", "&:hover": { background: "rgba(13,129,202,0.8)", transform: "scale(1.1)" } }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          {works.map((_, idx) => (
            <Box key={idx} onClick={() => setCurrentIndex(idx)} sx={{ width: currentIndex === idx ? 32 : 8, height: 8, borderRadius: "100px", background: currentIndex === idx ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(25,29,242,0.3)", cursor: "pointer", transition: "all 0.4s ease", "&:hover": { background: currentIndex === idx ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.5)" } }} />
          ))}
        </Box>

        <Box onClick={handleNext} sx={{ width: { xs: 50, md: 56 }, height: { xs: 50, md: 56 }, borderRadius: "50%", background: "rgba(3, 42, 121, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s ease", "&:hover": { background: "rgba(13,129,202,0.8)", transform: "scale(1.1)" } }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </Box>
      </Box>

      {/* Launching Soon modal (unchanged) */}
      <Modal open={showModal} onClose={() => setShowModal(false)} sx={{ display: "flex", alignItems: "center", justifyContent: "center", px: 2 }}>
        <Box sx={{ position: "relative", width: { xs: "92%", sm: 760, md: 760 }, maxWidth: 500, borderRadius: 8, overflow: "hidden", outline: "none", bgcolor: "#fff", boxShadow: "0 30px 80px rgba(13, 38, 149, 0.44)" }}>
          <Box sx={{ position: "absolute", inset: 0, display: "flex", gap: 2, p: 3, zIndex: 0, opacity: 0.15, filter: "blur(5px)", pointerEvents: "none" }}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, animation: "scrollUp 25s linear infinite" }}>
              {appImages.length > 0 && Array.from({ length: 6 }).map((_, i) => <Box key={`c1-${i}`} component="img" src={appImages[i % appImages.length]} alt={`bg1-${i}`} sx={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 2 }} />)}
            </Box>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, animation: "scrollDown 25s linear infinite" }}>
              {appImages.length > 0 && Array.from({ length: 6 }).map((_, i) => <Box key={`c2-${i}`} component="img" src={appImages[(i + 1) % appImages.length]} alt={`bg2-${i}`} sx={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 2 }} />)}
            </Box>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, animation: "scrollUp 25s linear infinite", animationDelay: "-12s" }}>
              {appImages.length > 0 && Array.from({ length: 6 }).map((_, i) => <Box key={`c3-${i}`} component="img" src={appImages[(i + 2) % appImages.length]} alt={`bg3-${i}`} sx={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 2 }} />)}
            </Box>
          </Box>

          <Box sx={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.92)", zIndex: 1 }} />

          <IconButton onClick={() => setShowModal(false)} aria-label="close launching soon" sx={{ position: "absolute", top: 10, right: 10, zIndex: 5, color: "rgba(2,6,23,0.7)", "&:hover": { background: "rgba(2,6,23,0.05)" } }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </IconButton>

          <Box sx={{ position: "relative", zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", minHeight: 300, p: { xs: 3, sm: 5 } }}>
            <Typography sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: 800, mb: 1, color: "#0a0a0a" }}>Launching Soon</Typography>
            <Typography sx={{ fontSize: "1rem", color: "rgba(0,0,0,0.8)", lineHeight: 1.6, maxWidth: 480, mb: 2 }}>Our upcoming mobile app is in final stages of development — lightweight, fast and built with love. Stay tuned for something incredible!</Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: "0.9rem", maxWidth: 460 }}>Want a demo or a private preview for your team? Drop us an email at info@thebrchub.tech</Typography>
          </Box>

          <style jsx="true">{`
            @keyframes scrollUp { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
            @keyframes scrollDown { 0% { transform: translateY(-50%); } 100% { transform: translateY(0); } }
          `}</style>
        </Box>
      </Modal>

      {/* COMPACT Graphic Gallery Modal: only moving cards, larger with side gradients */}
      <Modal open={graphicModalOpen} onClose={() => setGraphicModalOpen(false)} sx={{ display: "flex", alignItems: "center", justifyContent: "center", px: 2 }}>
        <Box sx={{ position: "relative", width: { xs: "92%", sm: 820, md: 980 }, maxWidth: 1100, borderRadius: 8, overflow: "hidden", outline: "none", bgcolor: "#fff", boxShadow: "0 40px 100px rgba(2,6,23,0.6)", p: { xs: 2, md: 3 } }}>
          {/* Close */}
          <IconButton onClick={() => setGraphicModalOpen(false)} sx={{ position: "absolute", top: 14, right: 14, zIndex: 6, color: "rgba(2,6,23,0.7)" }} aria-label="close gallery">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </IconButton>

          {/* Left gradient fade */}
          <Box sx={{ position: "absolute", left: 0, top: 0, bottom: 0, width: { xs: 48, sm: 72 }, zIndex: 4, pointerEvents: "none", background: "linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0))" }} />

          {/* Right gradient fade */}
          <Box sx={{ position: "absolute", right: 0, top: 0, bottom: 0, width: { xs: 48, sm: 72 }, zIndex: 4, pointerEvents: "none", background: "linear-gradient(270deg, rgba(255,255,255,1), rgba(255,255,255,0))" }} />

          <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", py: { xs: 2, md: 3 } }}>
            <Box sx={{ width: "100%", maxWidth: 980 }}>
              {/* bigger marquee: default height=140, responsive via .moving-marquee img css */}
              <MovingMarquee images={graphicList.length ? graphicList : defaultGraphicPool} height={200} gap={16} speed={24} />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Work;
