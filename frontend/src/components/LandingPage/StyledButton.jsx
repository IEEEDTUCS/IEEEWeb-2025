import { motion } from "framer-motion";
import MuiButton from "@mui/material/Button";

const MotionButton = motion(MuiButton);

export default function StyledButton({
  children,
  variant = "primary",
  href,
  ...props
}) {
  const base =
    "!px-6 !py-2.5 !rounded-lg !text-base font-medium tracking-wide transition-all duration-200";

  const styles =
    variant === "primary"
      ? "!bg-indigo-600 !text-white hover:!bg-indigo-700"
      : "!border !border-indigo-500 !text-indigo-400 hover:!bg-indigo-500 hover:!text-white";

  return (
    <MotionButton
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.03 }}
      className={`${base} ${styles}`}
      href={href}
      {...props}
    >
      {children}
    </MotionButton>
  );
}
