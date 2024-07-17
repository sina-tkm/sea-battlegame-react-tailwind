import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
     <div className="home-link flex justify-center items-center">
     <Link to={"/place"} className='link-style justify-center flex items-center font-semibold'>
        play
      </Link>
     </div>
    </div>
  );
}

export default Home;
