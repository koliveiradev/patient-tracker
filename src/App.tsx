
import { DashboardPage } from './pages/Dashboard';
import SignUpPage from './pages/SignUp';
import { AuthProvider, useAuth } from './components/AuthBuilder';
import { Switch } from '@mui/material';
import { Router, Link, Route, BrowserRouter, Routes, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';

import { router } from './router/Router';
import { AuthServiceProvider } from './services/Auth';



function App() {
  return (
    <AuthServiceProvider>
      <AuthProvider>
        <RouterProvider router={router} />


      </AuthProvider>
    </AuthServiceProvider>
    // <ResponsiveDrawer />
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
