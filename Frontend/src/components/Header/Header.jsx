import logo from "../../assets/argentBankLogo.webp";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import { logOut } from "../../features/auth/authSlice";
import { selectCurrentUsername } from "../../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const username = useSelector(selectCurrentUsername);

  return (
    <header className="header">
      <Link to={"/"}>
        <img className="header--logo" src={logo} alt="ARGENT BANK logo" />
      </Link>
      <nav className="header--nav">
        <ul>
          <li>
            {!token ? (
              <Link to={"/login"}>
                <i className="fa-solid fa-circle-user"></i> Sign In
              </Link>
            ) : (
              <div className="nav-links">
                <Link to={"/profile"}>
                  <p className="username">{username}</p>
                  <i className="fa-solid fa-circle-user"></i>
                </Link>
                <Link to={"/"} onClick={() => dispatch(logOut())}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <p>Sign Out</p>
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
