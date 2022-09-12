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
    <div className="banner mb-3">
      <img src={forumDetails.photo_url} className="banner-img-top" alt="..." />
      <div className="card-body">
        <h3 className="card-title">{forumDetails.name}</h3>
        <p className="card-text">{forumDetails.description}</p>
      </div>
      <PostList BASE_URL={BASE_URL} />
    </div>
  )
}

export default ForumDetails
