import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* LOGIN PAGE */}
                <Route
                    path="/"
                    element={<Login />}
                />

                {/* REGISTER PAGE */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* HOME PAGE */}
                <Route
                    path="/home"
                    element={<Home />}
                />

                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* DYNAMIC DASHBOARD */}
                <Route
                    path="/dashboard/:handle"
                    element={<Dashboard />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;
