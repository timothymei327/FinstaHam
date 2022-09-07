import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [signInForm, setSignInForm] = useState({ username: '', password: '' })
  let navigate = useNavigate

  const handleChange = (e) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value })
  }
  // const handleSubmit = async (e) => {
  //   e.preventDefault
  //   //axios post to django backend
  // }
  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="username"
          type="username"
          placeholder="Username"
          value={signInForm.username}
        />
        <br />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
          value={signInForm.password}
        />
        <br />
        <button type="submit">Log in</button>
      </form>
      <div>Don't have an account?</div>
      <button onClick={() => navigate('/register')}>Sign Up</button>
    </div>
  )
}

export default SignIn
