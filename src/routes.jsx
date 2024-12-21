import App from "./App"
import {
    Login,
    Signup,
    ErrorPage,
    Requests,
    DebtDetail,
    ProfileEdit,
    RequestForm,
    Notifications,
} from "./components.js"
import Home from "./components/Home"
import Profile from "./components/Profile"

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            { path: "/debt-detail/:isOwedToUser?/:debtId?", element: <DebtDetail /> },
            {
                path: "/profile",
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                    {
                        path: "edit",
                        element: <ProfileEdit />,
                    },
                ],
            },
            {
                path: "/notifications",
                element: <Notifications />,
            },
            {
                path: "/request",
                children: [
                    {
                        index: true,
                        element: <Requests />,
                    },
                    {
                        path: "form/:receiverId",
                        element: <RequestForm />,
                    },
                ],
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
