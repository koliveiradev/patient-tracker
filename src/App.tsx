
import { DashboardPage } from './pages/Dashboard';
import SignUpPage from './pages/SignUp';
import { AuthProvider, useAuth } from './components/AuthBuilder';
import { Switch } from '@mui/material';
import { Router, Link, Route, BrowserRouter, Routes, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { router } from './router/Router';
import { AuthServiceProvider } from './services/Auth';
import { PatientServiceProvider } from './services/Patient';
import { LocalizationProvider } from '@mui/x-date-pickers';



function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <PatientServiceProvider>
        <AuthServiceProvider>
          <AuthProvider>
            <RouterProvider router={router} />


          </AuthProvider>
        </AuthServiceProvider>
      </PatientServiceProvider>
    </LocalizationProvider>

  );
}

function PrivateRoute({ children, ...rest }: any) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }: any) => {
        return auth == null ? (
          children
        ) : (
          <Navigate
            to="/signup" replace />
        );
      }
      }
    />
  );
}

export default App;
