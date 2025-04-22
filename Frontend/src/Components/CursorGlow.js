// components/CursorGlow.js
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

const CursorGlow = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        if (typeof window !== "undefined" && window.innerWidth > 768) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 0,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: mousePos.y - 150,
                    left: mousePos.x - 150,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #7F5AF0 0%, #2CB1FF 100%)",
                    opacity: 0.7, // 🔥 Stronger glow
                    filter: "blur(100px)", // 👀 More focus
                    mixBlendMode: "overlay", // or try: "normal", "overlay"
                    transition: "top 0.05s linear, left 0.05s linear",
                    display: { xs: "none", md: "block" },
                }}
            />
        </Box>
    );
};

export default CursorGlow;
