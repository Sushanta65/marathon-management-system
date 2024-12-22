import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./privateRouter";
import Dashboard from "../pages/Dashboard";
import AddMarathon from "../pages/AddMarathon";
import AllMarathon from "../pages/AllMarathon";


const router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/marathons',
                element: <PrivateRouter><AllMarathon></AllMarathon></PrivateRouter>,
                loader: () => fetch('http://localhost:5600/marathons')
            },
            {
                path: '/dashboard',
                element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
                children: [
                    {
                        path: '/dashboard/addMarathon',
                        element: <AddMarathon></AddMarathon>
                    }
                ]
            }
        ]
    }
])
export default router;