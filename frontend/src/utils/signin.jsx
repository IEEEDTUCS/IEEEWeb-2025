// import * as React from "react";
// import { Snackbar } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";

// const Alert = React.forwardRef((props, ref) => (
//   <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
// ));

// // ✅ NEXT.JS ENV
// const API =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// export default function AuthPage() {
//   const [mode, setMode] = React.useState("FORM"); 
//   const [intent, setIntent] = React.useState("LOGIN");

//   const [username, setUsername] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [otp, setOtp] = React.useState("");

//   const [loading, setLoading] = React.useState(false);
//   const [otpTimer, setOtpTimer] = React.useState(0);
//   const [checkingSession, setCheckingSession] = React.useState(true);

//   const [currentUser, setCurrentUser] = React.useState(null);

//   const [snack, setSnack] = React.useState({
//     open: false,
//     msg: "",
//     type: "error",
//   });

//   const showSnack = (msg, type = "error") =>
//     setSnack({ open: true, msg, type });

//   const validateEmail = (e) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
//   const validatePassword = (p) => p.length >= 6;
//   const validateUsername = (u) => u.length >= 3;

//   /* ---------------- SESSION CHECK ---------------- */
//   React.useEffect(() => {
//     let mounted = true;

//     (async () => {
//       try {
//         const res = await fetch(`${API}/auth/check-session`, {
//           credentials: "include",
//         });

//         if (!mounted) return;

//         if (res.ok) {
//           const data = await res.json();
//           if (data.isAuthenticated && data.user) {
//             setCurrentUser(data.user);
//             setMode("SUCCESS");
//             showSnack(
//               `Welcome back ${data.user.username || data.user.email}`,
//               "success"
//             );
//           }
//         }
//       } catch (err) {
//         console.error("Session check failed");
//       } finally {
//         mounted && setCheckingSession(false);
//       }
//     })();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   React.useEffect(() => {
//     if (otpTimer <= 0) return;
//     const t = setTimeout(() => setOtpTimer((v) => v - 1), 1000);
//     return () => clearTimeout(t);
//   }, [otpTimer]);

//   /* ---------------- LOGIN / SIGNUP ---------------- */
//   const handleAuth = async () => {
//     if (!email || !password)
//       return showSnack("Please fill all required fields");

//     if (!validateEmail(email))
//       return showSnack("Invalid email format");

//     if (!validatePassword(password))
//       return showSnack("Password must be at least 6 characters");

//     if (intent === "SIGNUP" && !validateUsername(username))
//       return showSnack("Username must be at least 3 characters");

//     setLoading(true);
//     try {
//       const endpoint =
//         intent === "LOGIN" ? "/auth/login" : "/auth/signup";

//       const payload =
//         intent === "SIGNUP"
//           ? { username, email, password }
//           : { email, password };

//       const res = await fetch(`${API}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         if (res.status === 403) {
//           setCurrentUser(data.currentUser);
//           setMode("SUCCESS");
//           showSnack(data.message, "warning");
//           return;
//         }

//         if (intent === "LOGIN" && res.status === 404) {
//           showSnack("User not found. Switching to signup.", "info");
//           setIntent("SIGNUP");
//           return;
//         }

//         if (intent === "SIGNUP" && res.status === 409) {
//           showSnack(data.message, "info");
//           setIntent("LOGIN");
//           setUsername("");
//           return;
//         }

//         throw new Error(data.message);
//       }

//       if (data.otpRequired) {
//         setMode("OTP");
//         setOtpTimer(300);
//         showSnack("OTP sent to your email", "success");
//       }
//     } catch (err) {
//       showSnack(err.message || "Authentication failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (otp.length !== 6)
//       return showSnack("Please enter a valid 6-digit OTP");

//     setLoading(true);
//     try {
//       const res = await fetch(`${API}/auth/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       setCurrentUser(data.user);
//       setMode("SUCCESS");
//       showSnack("Authentication successful 🎉", "success");
//     } catch (err) {
//       showSnack(err.message || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- RESEND OTP ---------------- */
//   const handleResendOtp = async () => {
//     setLoading(true);
//     try {
//       const endpoint =
//         intent === "LOGIN" ? "/auth/login" : "/auth/signup";

//       const payload =
//         intent === "SIGNUP"
//           ? { username, email, password }
//           : { email, password };

//       await fetch(`${API}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       });

//       setOtp("");
//       setOtpTimer(300);
//       showSnack("OTP resent successfully", "success");
//     } catch {
//       showSnack("Failed to resend OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- LOGOUT ---------------- */
//   const handleLogout = async () => {
//     try {
//       await fetch(`${API}/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });

//       setCurrentUser(null);
//       setMode("FORM");
//       setUsername("");
//       setEmail("");
//       setPassword("");
//       showSnack("Logged out successfully", "success");
//     } catch {
//       showSnack("Logout failed");
//     }
//   };

//   if (checkingSession) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

//         {/* FORM */}
//         {mode === "FORM" && (
//           <div className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-xl p-6 backdrop-blur-xl">
//             <div className="text-center mb-6">
//               <img
//                 src="/loader/ieee-dtu-logo.svg"
//                 className="h-16 mx-auto mb-3"
//               />
//               <h2 className="text-xl font-semibold">
//                 {intent === "LOGIN" ? "Welcome Back" : "Create Account"}
//               </h2>
//               <p className="text-gray-400 text-sm">
//                 {intent === "LOGIN"
//                   ? "Sign in to continue to IEEE DTU"
//                   : "Join the IEEE DTU community"}
//               </p>
//             </div>

//             {intent === "SIGNUP" && (
//               <input
//                 className="w-full mb-3 px-4 py-2 rounded bg-black border border-white/20"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             )}

//             <input
//               className="w-full mb-3 px-4 py-2 rounded bg-black border border-white/20"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//               type="password"
//               className="w-full mb-4 px-4 py-2 rounded bg-black border border-white/20"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button
//               onClick={handleAuth}
//               disabled={loading}
//               className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
//             >
//               {loading ? "Please wait..." : intent}
//             </button>

//             <button
//               onClick={() =>
//                 setIntent(intent === "LOGIN" ? "SIGNUP" : "LOGIN")
//               }
//               className="mt-4 w-full text-sm text-blue-400 hover:underline"
//             >
//               {intent === "LOGIN"
//                 ? "New here? Create an account →"
//                 : "Already have an account? Login →"}
//             </button>
//           </div>
//         )}

//         {/* OTP */}
//         {mode === "OTP" && (
//           <div className="w-full max-w-sm bg-zinc-950 border border-white/10 rounded-xl p-6">
//             <h3 className="text-lg font-semibold text-center mb-2">
//               Verify OTP
//             </h3>
//             <p className="text-sm text-gray-400 text-center mb-4">
//               Sent to <b>{email}</b>
//             </p>

//             <input
//               className="w-full mb-3 px-4 py-2 text-center tracking-widest rounded bg-black border border-white/20"
//               placeholder="000000"
//               value={otp}
//               onChange={(e) =>
//                 setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
//               }
//             />

//             {otpTimer > 0 && (
//               <p className="text-center text-gray-400 mb-3">
//                 {Math.floor(otpTimer / 60)}:
//                 {String(otpTimer % 60).padStart(2, "0")}
//               </p>
//             )}

//             <button
//               onClick={handleVerifyOtp}
//               disabled={loading}
//               className="w-full py-2 rounded bg-green-600 hover:bg-green-700"
//             >
//               Verify OTP
//             </button>

//             <button
//               onClick={handleResendOtp}
//               disabled={otpTimer > 0}
//               className="mt-3 w-full text-sm text-blue-400 hover:underline"
//             >
//               {otpTimer > 0 ? "Resend OTP disabled" : "Resend OTP"}
//             </button>
//           </div>
//         )}

//         {/* SUCCESS */}
//         {mode === "SUCCESS" && (
//           <div className="w-full max-w-sm bg-zinc-950 border border-white/10 rounded-xl p-6 text-center">
//             <h2 className="text-2xl font-bold mb-2">Welcome 🎉</h2>
//             <p className="text-gray-400 mb-6">
//               {currentUser?.username || currentUser?.email}
//             </p>

//             <button
//               onClick={handleLogout}
//               className="w-full py-2 rounded bg-red-600 hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>

//       <Snackbar
//         open={snack.open}
//         autoHideDuration={4000}
//         onClose={() => setSnack({ ...snack, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity={snack.type}>{snack.msg}</Alert>
//       </Snackbar>
//     </>
//   );
// }

import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {
 
  Link,


} from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#000000ff',
    },
    text: {
      primary: '#ffffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#d2d4ffff',
          border: '0.5px solid #ffffffff',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: '#6583fb92',
          },
        },
      },
    },
  },
});

const providers = [{ id: 'credentials', name: 'Credentials' }];

const BRANDING = {
  logo: (
    <img
      src="/loader/ieee-dtu-logo.svg"
      alt="IEEE logo"
      style={{ height: 65 }}
    />
  ),
  title: 'IEEE DTU',
};

function ForgotPasswordLink() {
  return (
  <Link href="https://drive.google.com/file/d/1QWUDALanIDhwZ8CmhwzGCi-irSmRhndq/view?usp=sharing" target="_blank" variant="body2">
      Not a part of IEEE DTU?
      Join now →
    </Link>
  );
}

function Subtitle() {
  return (
    <div style={{ 
      marginBottom: '16px', 
      padding: '4px 8px', 
      fontSize: '0.875rem', 
      lineHeight: '1.4', 
      color: '#ccc',
      textAlign: 'center'
    }}>
      <strong>Get access</strong> to research papers, company-wise roadmaps, 
      and insights from IEEE DTU seniors based on their real experiences and many more!
    </div>
  );
}


export default function BrandingSignInPage() {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const signIn = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setOpenSnackbar(true);
        resolve(); // avoid Toolpad throwing error
      }, 3000);
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <AppProvider branding={BRANDING}  theme={darkTheme}>
        <SignInPage
          signIn={signIn}
          providers={providers}
          slots={{
          
          subtitle: Subtitle,
          forgotPasswordLink: ForgotPasswordLink,
        }}
          slotProps={{
            emailField: {
              autoFocus: false,
              onChange: (e) => setEmail(e.target.value),
            },
            passwordField: {
              onChange: (e) => setPassword(e.target.value),
            },
            submitButton: {
              disabled: !email.trim() || !password.trim(),
            },
           
            form: { noValidate: true },
          }}
        />
      </AppProvider>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          User does not exist!
        </Alert>
      </Snackbar>
    </>
  );
}