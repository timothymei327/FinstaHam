import './App.css'
import { Route, Routes } from 'react-router'
import SignIn from './pages/SignIn'
import Register from './pages/Register'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
