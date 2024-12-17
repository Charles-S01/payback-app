import App from "./App"
import { Login, Signup } from "./components"
import Home from "./components/Home"
import Profile from "./components/Profile"

const routes = [
    {
        path: "/",
        element: <App />,
        // errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },
    {
        path: "/log-in",
        element: <Login />,
    },
    {
        path: "/sign-up",
        element: <Signup />,
    },
]

export default routes
