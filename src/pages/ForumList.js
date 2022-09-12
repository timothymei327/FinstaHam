import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const ForumList = ({ BASE_URL }) => {
  const [forums, setForums] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    const getForums = async () => {
      let res = await axios.get(`${BASE_URL}/`)
      console.log(res.data)
      setForums(res.data)
    }
    getForums()
  }, [])

  return (
    <div className="forum-list">
      {forums.map((forum) => (
        <div
          className="card"
          onClick={() => navigate(`/ForumDetail/${forum.id}`)}
        >
          <img
            src={forum.photo_url}
            className="card-img-top"
            alt="forum_image"
          />
          <div className="card-body">
            <h2 className="card-text">{forum.name}</h2>
            <p className="card-text description">{forum.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ForumList
