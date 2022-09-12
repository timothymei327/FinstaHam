import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'

const PostDetails = ({ BASE_URL }) => {
  let { id } = useParams()
  const [postDetails, setPostDetails] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    const getPostDetails = async () => {
      let res = await axios.get(`${BASE_URL}/posts/${id}`)
      console.log(res.data)
      setPostDetails(res.data)
    }
    getPostDetails()
  }, [])

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
    </div>
  )
}

export default PostDetails
