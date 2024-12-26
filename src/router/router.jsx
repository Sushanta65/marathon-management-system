import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./privateRouter";
import Dashboard from "../pages/Dashboard";
import AddMarathon from "../pages/AddMarathon";
import AllMarathon from "../pages/AllMarathon";
import MarathonDetails from "../pages/MarathonDetails";
import MarathonRegistration from "../pages/MarathonRegistration";
import MyApply from "../pages/MyApply";
import MyMarathons from "../pages/MyMarathons";


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
                element: <PrivateRouter><AllMarathon></AllMarathon></PrivateRouter>
            },
            {
                path: '/dashboard',
                element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
                children: [
                    {
                        path: '/dashboard/addMarathon',
                        element: <AddMarathon></AddMarathon>
                    },
                    {
                        path: '/dashboard/myApply',
                        element: <MyApply></MyApply>
                    },
                    {
                        path: '/dashboard/myMarathons',
                        element: <MyMarathons></MyMarathons>
                    }
                ]
            },
            {
                path: '/marathons/:id',
                element: <PrivateRouter><MarathonDetails></MarathonDetails></PrivateRouter>,
                loader: ({params}) => fetch(`http://localhost:5600/marathons/${params.id}`)
            },
            {
                path: '/marathon/registration/:id',
                element: <PrivateRouter><MarathonRegistration></MarathonRegistration></PrivateRouter>,
                loader: ({params}) => fetch(`http://localhost:5600/marathons/${params.id}`)
            },
            {

            }
        ]
    }
])
export default router;