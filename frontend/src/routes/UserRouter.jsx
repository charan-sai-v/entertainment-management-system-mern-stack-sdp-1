

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function UserRouter() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/user"  element={<h1>User</h1> } />
            </Routes>
        </Router>
    </>
  )
}
