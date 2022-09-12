import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import ForumList from './pages/ForumList'
import ForumDetails from './pages/ForumDetails'

function App() {
  const BASE_URL = 'http://localhost:8000'

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ForumList" element={<ForumList BASE_URL={BASE_URL} />} />
        <Route
          path="/ForumDetail/:id"
          element={<ForumDetails BASE_URL={BASE_URL} />}
        />
      </Routes>
    </div>
  )
}

export default App
