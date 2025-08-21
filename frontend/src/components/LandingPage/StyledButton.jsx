import { motion } from "framer-motion";
import MuiButton from "@mui/material/Button"; // MUI button import

const MotionButton = motion(MuiButton);

export default function StyledButton({
  children,
  variant = "primary",
  href,
  ...props
}) {
  const base =
    "!px-6 !py-3 !rounded-xl !text-lg font-semibold transition-all duration-300";

  const styles =
    variant === "primary"
      ? "!bg-indigo-600 !text-white shadow-md hover:!bg-indigo-700"
      : "!border-2 !border-indigo-400 !text-indigo-300 hover:!bg-indigo-500 hover:!text-white";

  const hoverShadow =
    variant === "primary"
      ? "0px 8px 25px rgba(99,102,241,0.6)"
      : "0px 8px 25px rgba(129,140,248,0.6)";

  return (
    <MotionButton
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.07, boxShadow: hoverShadow }}
      className={`${base} ${styles}`}
      href={href} 
      {...props}
    >
      {children}
    </MotionButton>
  );
}


