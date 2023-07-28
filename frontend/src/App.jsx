import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserRouter from './routes/UserRouter'
import Home from './pages/Home'
import LoginPortal from './pages/LoginPortal'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginportal" element={<LoginPortal />} />
        </Routes>
      </BrowserRouter>
      <UserRouter />
    </>
  )
}

export default App
