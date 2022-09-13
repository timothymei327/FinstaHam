import { useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'

const ForumForm = ({ BASE_URL }) => {
  const [fileLimit, setFileLimit] = useState('')
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    photo_url: 'https://imgur.com/7vB6vgD.png'
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
      photo_url: 'https://imgur.com/7vB6vgD.png'
    })
    navigate('/ForumList')
  }

  const onFileChange = (e) => {
    const clientId = process.env.REACT_APP_CLIENT_ID
    const auth = 'Client-ID ' + clientId
    console.log(clientId)

    if (e.target.files.length > 1) {
      setFileLimit(e.target.files.length)
      document.getElementById('upload-post').disabled = true
    } else {
      const formData = new FormData()
      formData.append('image', e.target.files[0])

      fetch('https://api.imgur.com/3/image', {
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
          setFormValues({ ...formValues, photo_url: data.data.link })
        })
    }
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
          onChange={onFileChange}
        />
        <br />
        {fileLimit ? (
          <div className="limit-error">
            Too many files uploaded, you may only upload a single pictures for
            your forum page.
          </div>
        ) : null}
        <button
          className="upload-photo"
          name="submit"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ForumForm
