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
