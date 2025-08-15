import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
    const [position, setPosition] = useState(
        window.innerWidth < 768 ? "top-center" : "bottom-right"
    );

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setPosition("top-center"); // Mobile
            } else {
                setPosition("bottom-right"); // Desktop
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // run initially

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Toaster
            position={position}
            gutter={8}
            toastOptions={{
                duration: 3000,
                style: {
                    width: "90%",
                    marginRight:"20px",
                    height:"100px",
                    maxWidth: "350px",
                    fontSize: "1rem",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "#1e1e1e",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                },
                success: {
                    style: { background: "#2e7d32" },
                    iconTheme: { primary: "#4caf50", secondary: "#fff" }
                },
                error: {
                    style: { background: "#c62828" },
                    iconTheme: { primary: "#f44336", secondary: "#fff" }
                },
                loading: {
                    style: { background: "#1565c0" }
                }
            }}
        />
    );
};

export default ToastProvider;
