import logo from "../../assets/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginToken } from "../../selectors/user.selectors";
import { disconnection } from "../../actions/user.actions";
import { selectFirstName } from "../../selectors/profile.selectors";

const Header = () => {
  const dispatch = useDispatch();
  const firstName = useSelector(selectFirstName);
  const token = useSelector(selectLoginToken);

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
                  <i className="fa-solid fa-circle-user"> </i>
                  <p>{firstName}</p>
                </Link>
                <Link to={"/"} onClick={() => dispatch(disconnection())}>
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
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
