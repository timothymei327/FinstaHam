import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  let navigate = useNavigate()

  return (
    <header>
          <button className="nav-back" onClick={() => navigate(-1)}>Back</button>
      <Link to="/">
        <div className="logo-wrapper" alt="logo">
        <img className='nav-logo' src="https://i.imgur.com/7vB6vgD.png" />
        </div>
      </Link>    
      <button className="nav-back" onClick={() => navigate("/ForumList")}>Forums</button>
      <button className="nav-back" onClick={() => navigate("/ForumForm")}>Create a Forum!</button>
    </header>
  )
}

export default Nav