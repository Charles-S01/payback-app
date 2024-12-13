import App from "./App"
import Login from "./components/Login"
import Signup from "./components/Signup"

const routes = [
    {
        path: "/",
        element: <App />,
        // errorElement: <ErrorPage />,
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
