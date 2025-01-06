import { Link } from "react-router-dom";

const Home = () => {
    return(
        <div>
            <h1>Witaj!</h1>
            <Link to="/blog">Blog</Link>
        </div>
    )
  };
  
  export default Home;