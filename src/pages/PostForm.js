import { useNavigate, useParams } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import { render } from '@testing-library/react'

const PostForm = ({ BASE_URL }) => {
  let { id } = useParams()
  const [hashtagInput, setHashtagInput] = useState('')
  const [formValues, setFormValues] = useState({
    forum: id,
    photo_urls: [],
    caption: '',
    hashtags: []
  })
  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    console.log(formValues)
  }

  const handleHashtagInput = (e) => {
    setHashtagInput(e.target.value)
    console.log(hashtagInput)
  }

  const addHashtag = (e) => {
    e.preventDefault()
    setFormValues({
      ...formValues,
      hashtags: [...formValues.hashtags, hashtagInput]
    })
    setHashtagInput('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${BASE_URL}`, formValues)
    setFormValues({
      forum: id,
      photo_urls: [],
      caption: '',
      hashtags: []
    })
    navigate('/ForumList')
  }

  const onFileChange = (e) => {
    const clientId = process.env.REACT_APP_CLIENT_ID
    const auth = 'Client-ID ' + clientId
    console.log(clientId)

    Object.values(e.target.files).forEach((file) => {
      const formData = new FormData()
      formData.append('image', file)

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
          formValues.photo_urls.push(data.data.link)
          console.log(formValues)
        })
    })
  }

  return (
    <div className="forum-form">
      <form className="forum-form-fields">
        <label>Post Your Photo(s): </label>
        <input
          className="upload-photo"
          name="photo_urls"
          type="file"
          multiple="multiple"
          onChange={onFileChange}
        />
        <br />
        <textarea
          name="caption"
          rows="10"
          placeholder="Write a Caption"
          onChange={handleChange}
        />
        <br />
        <label>Hashtags: </label>
        <input
          id="hashtagInput"
          name="hashtagInput"
          type="text"
          placeholder="#hashtag"
          onChange={handleHashtagInput}
        />
        <button type="submit" onClick={addHashtag}>
          +
        </button>
        {formValues.hashtags?.map((hashtag) => (
          <div>{hashtag}</div>
        ))}
        <br />
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

export default PostForm
