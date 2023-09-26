import logo from "../../assets/argentBankLogo.webp";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentRoles,
  selectCurrentToken,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import { logOut } from "../../features/auth/authSlice";
import { selectCurrentUsername } from "../../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const username = useSelector(selectCurrentUsername);
  const roles = useSelector(selectCurrentRoles);
  const rolesArray = Object.values(roles);

  const client = rolesArray && rolesArray.includes(2502);
  const banker = rolesArray && rolesArray.includes(1406);

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
                {client ? (
                  <Link to={"/profile"}>
                    <p className="username">
                      {username ? username : "My account"}
                    </p>
                    <i className="fa-solid fa-circle-user"></i>
                  </Link>
                ) : (
                  banker && (
                    <Link to={"/panel/banker"}>
                      <p className="username">Dashboard</p>
                      <i className="fa-solid fa-circle-user"></i>
                    </Link>
                  )
                )}
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
