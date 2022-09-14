import './App.css'
import { Route, Routes } from 'react-router'
import axios from 'axios'
import Home from './pages/Home'
import ForumList from './pages/ForumList'
import ForumDetails from './pages/ForumDetails'
import ForumForm from './pages/ForumForm'
import Nav from './components/Nav'
import UpdateForum from './pages/UpdateForum'
import PostDetails from './pages/PostDetails'
import PostForm from './pages/PostForm'

function App() {
  // const BASE_URL = 'http://localhost:8000'
  const BASE_URL = 'https://unmrkd-backend.herokuapp.com'
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
        <Route
          path="/UpdateForum/:id"
          element={<UpdateForum BASE_URL={BASE_URL} />}
        />
        <Route
          path="/PostDetails/:id"
          element={<PostDetails BASE_URL={BASE_URL} />}
        />
        <Route
          path="/PostForm/:id"
          element={<PostForm BASE_URL={BASE_URL} />}
        />
      </Routes>
    </div>
  )
}

export default App
