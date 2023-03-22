import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

//styles
import "./Navbar.css";

export default function Navbar() {

    const {logout } = useLogout()
    const { dispatch, user } = useAuthContext()

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/')
    }

    const getLogout = () => {
      navigate('\login')
      logout()
     
    }
    
  return (
    <div className="navbar">
      <ul>
        <li className="logo" onClick={handleClick}>
            BE Project
        </li>

        {user && 
          <li><p>Hello, {user.displayName}</p></li>
        }

        {!user && (
          <li>
            <NavLink to="/login">Login</NavLink>
        </li>
        )}

        {!user && (
          <li>
            <NavLink to="/signup">Signup</NavLink>    
          </li>
        )}
        
        {user && (
        <li>
          <button className="btn" onClick={getLogout}>Logout</button>
        </li>
        )}
      </ul>
    </div>
  );
}
