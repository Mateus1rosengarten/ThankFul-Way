import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authentication } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import "./Navbar.css";
import { userContext } from "../context/userContext";

function Navbar() {
  const { userLoggedObject,setProfileNameValue } = useContext(userContext);
  const navigate = useNavigate(null);

  const logout = async () => {
    await signOut(authentication);
    setProfileNameValue('')
    navigate('/')
  };

  return (
    <div className="div-navbar">
    <nav className="navbar">
      <ul>
        <li className="first-item">
          <Link to={userLoggedObject ? "/blog" : "/"}> Blog</Link>
        </li>
        <li className="second-item">
          <Link to={userLoggedObject ? "/profile" : "/"}> Profile </Link>
        </li>
        <li className="third-item">
          <Link to="/"> {userLoggedObject ?  "Home" : "Login"}</Link>
        </li>
        </ul>
        
        <button
        className="button-logout"
        style={{ opacity: !userLoggedObject && "0.5" }}
        disabled={!userLoggedObject}
        onClick={logout}
      >
        Logout
      </button>

     
      
    </nav>
    </div>
  );
}

export default Navbar;
