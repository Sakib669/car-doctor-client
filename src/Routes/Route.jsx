import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import Checkout from "../pages/checkout/Checkout";
import Bookings from "../pages/bookings/Bookings";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
              path: '/',
              element: <Home/>  
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            },
            {
                path: '/bookings',
                element: <PrivateRoutes><Bookings/></PrivateRoutes>
            },
            {
                path: '/checkout/:id',
                element: <PrivateRoutes><Checkout/></PrivateRoutes>,
                loader: ({params}) => fetch(`https://car-doctor-server-sakib669.vercel.app/services/${params.id}`)
            }
        ]
    },
])

export default router;