import * as React from "react";
import {
  Box,
  Button,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { paper: "#000" },
    text: { primary: "#fff" },
  },
});

const BRANDING = {
  logo: (
    <img
      src="/loader/ieee-dtu-logo.svg"
      alt="IEEE logo"
      style={{ height: 65 }}
    />
  ),
  title: "IEEE DTU",
};

const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

export default function AuthPage() {
  const [mode, setMode] = React.useState("FORM"); 
  const [intent, setIntent] = React.useState("LOGIN"); 

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [snack, setSnack] = React.useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showSnack = (msg, type = "error") =>
    setSnack({ open: true, msg, type });

  /* ---------------- LOGIN / SIGNUP ---------------- */
  const handleAuth = async () => {
    try {
      setLoading(true);

      const endpoint =
        intent === "LOGIN" ? "/auth/login" : "/auth/signup";

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // LOGIN → user not found → auto SIGNUP
        if (
          intent === "LOGIN" &&
          data.message?.toLowerCase().includes("not found")
        ) {
          showSnack("No account found. Switching to signup.", "info");
          setIntent("SIGNUP");
          return;
        }

        // SIGNUP → user exists → auto LOGIN
        if (
          intent === "SIGNUP" &&
          data.message?.toLowerCase().includes("exists")
        ) {
          showSnack("Account already exists. Please login.", "info");
          setIntent("LOGIN");
          return;
        }

        throw new Error(data.message);
      }

      showSnack("OTP sent to your email", "success");
      setMode("OTP");
    } catch (err) {
      showSnack(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      showSnack(
        intent === "LOGIN"
          ? "Login successful 🎉"
          : "Signup successful 🎉",
        "success"
      );

    } catch (err) {
      showSnack(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppProvider branding={BRANDING} theme={darkTheme}>
        {mode === "FORM" && (
          <SignInPage
            title={
              intent === "LOGIN"
                ? "Sign in to IEEE DTU"
                : "Create your IEEE DTU account"
            }
            providers={[{ id: "credentials", name: "Credentials" }]}
            signIn={handleAuth}
            slotProps={{
              emailField: { onChange: (e) => setEmail(e.target.value) },
              passwordField: { onChange: (e) => setPassword(e.target.value) },
              submitButton: {
                disabled: !email || !password || loading,
              },
            }}
            slots={{
              subtitle: () => (
                <Typography color="gray" textAlign="center">
                  {intent === "LOGIN"
                    ? "Welcome back 👋"
                    : "Join the IEEE DTU community"}
                </Typography>
              ),
              forgotPasswordLink: () => (
                <Link
                  component="button"
                  onClick={() =>
                    setIntent(intent === "LOGIN" ? "SIGNUP" : "LOGIN")
                  }
                >
                  {intent === "LOGIN"
                    ? "New here? Create an account →"
                    : "Already have an account? Login →"}
                </Link>
              ),
            }}
          />
        )}

        {mode === "OTP" && (
          <Box
            sx={{
              maxWidth: 400,
              mx: "auto",
              mt: 10,
              p: 4,
              bgcolor: "#000",
              borderRadius: 2,
            }}
          >
            <Typography textAlign="center" variant="h6" mb={2}>
              Verify OTP
            </Typography>

            <Typography textAlign="center" mb={2} color="gray">
              OTP sent to <b>{email}</b>
            </Typography>

            <TextField
              fullWidth
              label="OTP"
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button
              fullWidth
              variant="outlined"
              disabled={!otp || loading}
              onClick={handleVerifyOtp}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

            <Button
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => {
                setMode("FORM");
                setOtp("");
              }}
            >
              Back to Login
            </Button>
          </Box>
        )}
      </AppProvider>

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snack.type}>{snack.msg}</Alert>
      </Snackbar>
    </>
  );
}
