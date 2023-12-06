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
import { PatientInfoPage }  from "../pages/PatientInfo";
import VisitPage from "../pages/VisitSummary";
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
export const PatientRoute = ({children}: any) => {
    const session = useAuth();
    const email = session?.user?.email??"";
    console.log(email);
    if (email.endsWith('health.gov')) {
        return <Navigate to="/dashboard"/>;
    }
    return children;
}

export const DoctorRoute = ({children}: any) => {
    const session = useAuth();
    const email = session?.user?.email??"";
    console.log(email);
    if (email.endsWith('health.gov')) {
        return children;
    }
    return <Navigate to="/dashboard"/>;
}

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
                element: <DoctorRoute><PatientsPage /></DoctorRoute>,

            },
            {
                path: "/patients/:patientId",
                element: <DoctorRoute><PatientPage /></DoctorRoute>,

            },
            {
                path: "/visits/:visitId",
                element: <VisitPage />,

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
                element: <PatientRoute><PatientInfoPage /></PatientRoute>,
            },
        ]
    },
]);