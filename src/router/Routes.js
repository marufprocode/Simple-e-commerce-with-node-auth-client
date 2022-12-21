import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import About from "../pages/About";
import CheckOut from "../pages/CheckOut";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/checkout',
                element: <CheckOut/>
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            }
        ]
    }
])

export default routes;