import { Navigate, createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/MainLayout";
import { PatientsPage } from "../pages/Patients";
import { SchedulePage } from "../pages/Schedule";
import { MedicationsPage } from "../pages/Medications";
import { DashboardPage } from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import { useAuth } from "../components/AuthBuilder";
import Login from "../pages/Login";
import PatientPage from "../pages/Patient";
<<<<<<< HEAD
import PatientInfoPage  from "../pages/PatientInfo";
=======
import VisitPage from "../pages/VisitSummary";
>>>>>>> f73e78e (Add visit summary page)
export const UnProtectedRoute = ({ children }: any) => {
    const session = useAuth();
    if (session) {
        return <Navigate to="/dashboard" />;
    }
    return children;
};

export const IndexRoute = ({ children }: any) => {
    const session = useAuth();
    if (session) {
        return <Navigate to="/dashboard" />;
    } else {
        return <Navigate to="/login" />;
    }

};
export const ProtectedRoute = ({ children }: any) => {
    const session = useAuth();
    if (!session) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};

export const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <IndexRoute></IndexRoute>,
    // },
    {
        path: "/signup",
        element: <UnProtectedRoute><SignUp /></UnProtectedRoute>,
    },
    {
        path: "/login",
        element: <UnProtectedRoute><Login /></UnProtectedRoute>,
    },
    {
        path: "/",
        element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
        children: [
            {
                path: "/dashboard",
                element: <DashboardPage />,

            },
            {
                path: "/patients",
                element: <PatientsPage />,


            },
            {
                path: "/patients/:patientId",
                element: <PatientPage />,

            },
            {
                path: "/visits/:visitId",
                element: <VisitPage />,

            },
            {
                path: "/schedule",
                element: <SchedulePage />,
            },
            {
                path: "/medications",
                element: <MedicationsPage />,
            },
            {
                path: "/personalinfo",
                element: <PatientInfoPage />,
            },
        ]
    },
]);