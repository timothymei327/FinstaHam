import { useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'

const ForumForm = ({ BASE_URL }) => {
  const [file, setFile] = useState()
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
    await axios.post(`${BASE_URL}`, formValues)
    setFormValues({
      name: '',
      description: '',
      photo_url: ''
    })
    navigate('/ForumList')
  }

  const onFileChange = (e) => {
    setFile(e.target.files[0])
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

  return (
    <div className="forum-form">
      <form className="forum-form-fields">
        <label>Forum Name: </label>
        <input name="name" placeholder="name" onChange={handleChange} />
        <br />
        <label>Forum Description: </label>
        <textarea
          name="description"
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
          accept="image/png, image/jpg"
        />
        <button
          className="upload-photo"
          name="submit"
          type="submit"
          onChange={onFileChange}
          onClick={onFileUpload}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ForumForm
