import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  let navigate = useNavigate()

  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    //submit functionality
  }

  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="username"
          type="username"
          placeholder="Username"
          value={registerForm.username}
        />
        <br />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
          value={registerForm.password}
        />
        <input
          onChange={handleChange}
          name="password-confirm"
          type="password"
          placeholder="Confirm Password"
          value={registerForm.confirmPassword}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
