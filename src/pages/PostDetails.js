import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'

const PostDetails = ({ BASE_URL }) => {
  let { id } = useParams()
  const [postDetails, setPostDetails] = useState([])
  let [newComment, setNewComment] = useState({
    post: id,
    body: ''
  })
  let navigate = useNavigate()

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(newComment)
    await axios.post(`${BASE_URL}/comments/`, newComment)
    setNewComment({
      post: id,
      body: ''
    })
  }

  useEffect(() => {
    const getPostDetails = async () => {
      let res = await axios.get(`${BASE_URL}/posts/${id}`)
      console.log(res.data)
      setPostDetails(res.data)
    }
    getPostDetails()
  }, [newComment])

  return (
    <div className="banner mb-3">
      {postDetails.photo_urls?.map((photo) => (
        <img src={photo} className="post-images" alt="post-image" />
      ))}
      <button onClick={() => navigate(`/UpdatePost/${id}`)}>Edit</button>
      <div className="card-body">
        <p className="card-text">{postDetails.caption}</p>
        {postDetails.hashtags?.map((hashtag) => (
          <h4 className="hashtag">{hashtag}</h4>
        ))}
        {postDetails.comments?.map((comment) => (
          <p className="comment">{comment.body}</p>
        ))}
      </div>
      <form className="comment-form">
        <textarea
          className="commentBox"
          rows="10"
          placeholder="Leave a comment!"
          name="body"
          value={newComment.body}
          onChange={handleChange}
        ></textarea>
        <button onClick={handleSubmit} className="postButton">
          Post Comment
        </button>
      </form>
    </div>
  )
}

export default PostDetails
