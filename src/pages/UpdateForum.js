import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'

const UpdateForum = ({ BASE_URL }) => {
  let { id } = useParams()
  const [file, setFile] = useState()
  const [originalForum, setOriginalForum] = useState({})
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    photo_url: ''
  })
  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    console.log(formValues)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`${BASE_URL}/forums/${id}`, formValues)
    setFormValues({
      name: '',
      description: '',
      photo_url: ''
    })
    navigate('/ForumList')
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    await axios.delete(`${BASE_URL}/forums/${id}`)
    setFormValues({
      name: '',
      description: '',
      photo_url: ''
    })
    navigate('/ForumList')
  }

  const onFileChange = (e) => {
    setFile({ file: e.target.files[0] })
    console.log(file)
  }

  const onFileUpload = async (e) => {
    e.preventDefault()
    const clientId = process.env.REACT_APP_CLIENT_ID
    const auth = 'Client-ID ' + clientId
    console.log(clientId)

    const formData = new FormData()
    formData.append('image', file)

    await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: auth
      },
      body: formData
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
      })
  }

  useEffect(() => {
    const getOriginalForum = async () => {
      let res = await axios.get(`${BASE_URL}/forums/${id}`)
      setOriginalForum(res.data)
      console.log(res.data)
      setFormValues({
        name: res.data.name,
        description: res.data.description,
        photo_url: ''
      })
    }
    getOriginalForum()
  }, [])

  return (
    <div className="forum-form">
      <form className="forum-form-fields">
        <label>Forum Name: </label>
        <input
          name="name"
          value={formValues.name}
          placeholder="name"
          onChange={handleChange}
        />
        <br />
        <label>Forum Description: </label>
        <textarea
          name="description"
          value={formValues.description}
          rows="10"
          placeholder="description"
          onChange={handleChange}
        />
        <br />
        <label>Upload a Photo for Your Forum: </label>
        <input
          className="upload-photo"
          name="photo_url"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          onChange={onFileChange}
        />
        <button
          className="upload-photo"
          name="submit"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button onClick={handleDelete}>Delete Forum</button>
      </form>
    </div>
  )
}

export default UpdateForum
