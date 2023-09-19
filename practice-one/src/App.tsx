import Sidebar from '@components/Sidebar'
import './App.css'
import LoginPage from './pages/LoginPage'
import useLocalStorage from '@hooks/useLocalStorage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from '@components/Header'
import DashBoardPage from './pages/DashBoardPage'
import PublicRoutes from './utils/PublicRoutes'
import { useState } from 'react'
import StudentPage from './pages/StudentPage'

export type authType = {
  accessToken: string
  name: string
}

function App() {
  const [auth, setAuth] = useLocalStorage('user', {
    accessToken: '',
    name: '',
  })

  const [searchText, setSearchText] = useState('')

  return auth.accessToken ? (
    <Router>
      <div className="bg-white flex capitalize">
        <Sidebar setAuth={setAuth} username={auth.name} />
        <main className="w-full max-h-screen">
          <Header setSearchText={setSearchText} />
          <Routes>
            <Route path="/" element={<DashBoardPage />} />
            <Route
              path="/students"
              element={<StudentPage searchText={searchText} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  ) : (
    <Router>
      <PublicRoutes auth={auth} navTo="/login">
        <Route
          path="/login"
          element={<LoginPage setAuth={setAuth}></LoginPage>}
        />
      </PublicRoutes>
    </Router>
  )
}

export default App
