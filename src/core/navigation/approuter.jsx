import {createBrowserRouter, redirect} from "react-router-dom";
import {routeNames} from "@/src/core/navigation/routenames.js";
import RegistrationPage from "@/src/modules/auth/pages/RegistrationPage.jsx";
import LoginPage from "@/src/modules/auth/pages/LoginPage.jsx";

const appRouter = createBrowserRouter([
    {
        path: routeNames.home,
        loader: () => redirect(routeNames.register),
    },
    {
        path: routeNames.register,
        element: <RegistrationPage />,
    },
    {
        path: routeNames.login,
        loader: <LoginPage />,
    }
])

export default appRouter;