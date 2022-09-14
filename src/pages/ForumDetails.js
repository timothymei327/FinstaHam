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
        <img
          src={forumDetails.photo_url}
          className="banner-img-top"
          alt="forum-img"
        />
        <br />
        <div className="banner-body">
          <h3 className="banner-title">{forumDetails.name}</h3>
          <p className="banner-text">{forumDetails.description}</p>
        </div>
        <button
          className="banner-post"
          onClick={() => navigate(`/PostForm/${id}`)}
        >
          Make a Post!
        </button>
        <button
          className="banner-edit"
          onClick={() => navigate(`/UpdateForum/${id}`)}
        >
          Edit Forum
        </button>
      </div>
      <PostList BASE_URL={BASE_URL} />
    </div>
  )
}

export default ForumDetails
