import './App.css'
import { Route, Routes } from 'react-router'
import SignIn from './pages/SignIn'
import Register from './pages/Register'

export const BASE_URL = 'http://localhost:8000'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register BASE_URL={BASE_URL} />} />
      </Routes>
    </div>
  )
}

export default App
