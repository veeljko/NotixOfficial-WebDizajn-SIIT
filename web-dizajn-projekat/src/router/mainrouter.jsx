import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import AdminAccountsPage from "../pages/AdminAccountsPage.jsx";
import KnjizaraPage from "../pages/KnjizaraPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/accounts',
                element: <AdminAccountsPage/>
            },
            {
                path: '/knjizara/:id',
                element: <KnjizaraPage/>
            }
        ]
    }
]);

export default router;