import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'

const UpdateForum = ({ BASE_URL }) => {
  let { id } = useParams()
  const [fileLimit, setFileLimit] = useState('')
  const [uploadError, setUploadError] = useState('')
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
          if (data.success === true) {
            setFormValues({ ...formValues, photo_url: data.data.link })
          } else if (data.success === false) {
            setUploadError('error')
          }
        })
    }
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
          accept="image/png, image/jpg"
          onChange={onFileChange}
        />
        <br />
        {fileLimit ? (
          <div className="limit-error">
            Too many files uploaded, you may only upload a single pictures for
            your forum page.
          </div>
        ) : null}
        {uploadError ? (
          <div className="error">Image failed to upload</div>
        ) : null}
        <br />
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
