import { useNavigate } from 'react-router'

const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home-container">
      <div className="home">
        <img className="logo" src="https://imgur.com/7vB6vgD.png" alt="logo" />
        <div className="phrase">
          <h1>Post freely and anonymously.</h1>
          <button classname="button-52" onClick={() => navigate('/ForumList')}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
