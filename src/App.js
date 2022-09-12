import './App.css'
import { Route, Routes } from 'react-router'
import axios from 'axios'
import Home from './pages/Home'
import ForumList from './pages/ForumList'
import ForumDetails from './pages/ForumDetails'
import ForumForm from './pages/ForumForm'
import Nav from './components/Nav'

function App() {
  const BASE_URL = 'http://localhost:8000'
  axios.defaults.headers.common[
    'Authorization'
  ] = `Client-ID ${process.env.CLIENT_ID}`

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ForumList" element={<ForumList BASE_URL={BASE_URL} />} />
        <Route
          path="/ForumDetail/:id"
          element={<ForumDetails BASE_URL={BASE_URL} />}
        />
        <Route path="/ForumForm" element={<ForumForm BASE_URL={BASE_URL} />} />
      </Routes>
    </div>
  )
}

export default App
