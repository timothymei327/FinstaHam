import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import PostList from '../components/PostList'

const ForumDetails = ({ BASE_URL }) => {
  let { id } = useParams()
  const [forumDetails, setForumDetails] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    const getForumDetails = async () => {
      let res = await axios.get(`${BASE_URL}/forums/${id}`)
      console.log(res.data)
      setForumDetails(res.data)
    }
    getForumDetails()
  }, [])

  return (
    <div className="post-container">
      <div className="banner">
        <button onClick={() => navigate(`/UpdateForum/${id}`)}>
          Edit Forum
        </button>
        <img
          src={forumDetails.photo_url}
          className="banner-img-top"
          alt="forum-img"
        />
        <button onClick={() => navigate(`/PostForm/${id}`)}>
          Make a Post!
        </button>
      </div>
      <div className="card-body">
        <h3 className="card-title">{forumDetails.name}</h3>
        <p className="card-text">{forumDetails.description}</p>
      </div>
      <PostList BASE_URL={BASE_URL} />
    </div>
  )
}

export default ForumDetails
