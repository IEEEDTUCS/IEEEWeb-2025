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
    "!px-12 !py-2.5 !font-[600] !tracking-[0.1em] !font-body !rounded-lg transition-all duration-200";

  const styles =
    variant === "primary"
      ? "!border-2 !text-white hover:!bg-white hover:!text-black"
      : "!border-2 !text-white hover:!bg-white hover:!text-black";

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
