import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router"

const PostList = ({BASE_URL}) => {
  let {id} = useParams()
  let navigate = useNavigate()
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const getPosts = async () => {
      let res = await axios.get(`${BASE_URL}/forums/${id}`)
      console.log(res.data.posts)
      setPosts(res.data.posts)
    }
    getPosts()
  }, [])



  return (
    <div className="post-card-container">
      {posts.map((post) => (
        <div
          className="post-card card"
          onClick={() => navigate(`/PostDetails/${post.id}`)}
        >
          <img src={post.photo_urls[0]} className="post-images" alt="post-image" />
        {/* {post.photo_urls?.map((photo) => (
          <img src={photo} className="post-images" alt="post-image" />
        ))} */}
        <div className="card-body">
          <h2 className="card-text">{post.name}</h2>
          <p className="card-text description">{post.caption}</p>
        </div>
  </div>
))}
    </div>
  )
}

export default PostList


