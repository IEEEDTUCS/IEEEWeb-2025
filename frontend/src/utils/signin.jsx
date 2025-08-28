import * as React from 'react';
import { createTheme} from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
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
        border: ' 0.5px solid #ffffffff',
        fontWeight: 500,
        '&:hover': {
          backgroundColor: '#6583fb92',
        },
      },
    },
  },
}
});

const providers = [{ id: 'credentials', name: 'Credentials' }];
// preview-start
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
// preview-end

const signIn = async (provider) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      resolve();
    }, 500);
  });
  return promise;
};

export default function BrandingSignInPage() {
  return (  
      <AppProvider branding={BRANDING} theme={darkTheme}>
        <SignInPage
          signIn={signIn}
          providers={providers}
          slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
        />
      </AppProvider>
  );
}
