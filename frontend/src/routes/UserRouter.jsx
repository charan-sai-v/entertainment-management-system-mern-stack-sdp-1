

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "../pages/user/UserDashboard";

export default function UserRouter() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/user"  element={<h1>User</h1> } />
                <Route path="/user/dashboard"  element={<UserDashboard /> } />
            </Routes>
        </Router>
    </>
  )
}
