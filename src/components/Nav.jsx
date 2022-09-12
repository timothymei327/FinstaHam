import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  let navigate = useNavigate()

  return (
    <header>
          <button onClick={() => navigate(-1)}>Back</button>
      <Link to="/">
        <div className="logo-wrapper" alt="logo">
        <img className='nav-logo' src="https://i.imgur.com/7vB6vgD.png" />
        </div>
      </Link>    
      <Link to="/ForumList">Forums</Link>
      <Link to="/ForumForm">Create a Forum!</Link>
    </header>
  )
}

export default Nav