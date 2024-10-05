import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 991 ? true : false
  );
  const { currentUser } = useContext(UserContext);

  const closeNavHandler = () => {
    if (window.innerWidth < 991) {
      setIsNavShowing(false);
    } else {
      window.location.reload();
      setIsNavShowing(true);
    }
  };

  const [avatar, setAvatar] = useState('');

  const token = currentUser?.token;

  useEffect(() => {
    if (currentUser) {
      const getUserAvatar = async () => {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/${currentUser.id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
        const { avatar } = response.data;
        setAvatar(avatar);
      }


      getUserAvatar();
    }
  }, [currentUser])



  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo" onClick={closeNavHandler}>
          <img src={Logo} alt="" />
          <span className="logo_side">Polywoven.</span>
        </Link>
        {currentUser?.id && isNavShowing && (
          <ul className="nav__menu">
            <span className="side__avatar">
              <Link to={`/myposts/${currentUser.id}`}>
                <img
                  src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                  alt=""
                />
              </Link>
            </span>
            <li>
              <Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>
                {currentUser?.name}
              </Link>
            </li>
            <li>
              <Link to={window.location.href += "/create"} onClick={closeNavHandler}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavHandler}>
                Logout
              </Link>
            </li>
          </ul>
        )}
        {!currentUser?.id && isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to={window.location.href += "/authors"} onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to={window.location.href = "/login"} onClick={closeNavHandler}>
                Login
              </Link>
            </li>
          </ul>
        )}
        <button
          className="nav__toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
