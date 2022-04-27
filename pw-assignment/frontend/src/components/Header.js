import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({cartCount,wlCount,auth,user,setUser,setAuth,setCartCount,setWlCount}) {
    const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem("auth")
        localStorage.removeItem("user")
        localStorage.removeItem("wl")
        localStorage.removeItem("cart")
        setUser(null)
        setAuth(false)
        setCartCount(0)
        setWlCount(0)
        navigate('/sign-in')
    }
  return (
    <header>
      <nav className="navbar" style={{paddingRight:"1em"}}>
        <div className="burger">
          <div className="layer1"></div>
          <div className="layer2"></div>
          <div className="layer3"></div>
        </div>

        <div className="logo">
          <span className="logo-text">
            <i className="fa fa-home" style={{marginRight:"0.1em"}}></i>PW
            <span style={{color:"#f09d51",fontSize:"1.1em"}}>Ecommerce</span>
          </span>
        </div>

        <div className="menubar">
          <ul className="list">
            <li className="list-items">
              <Link to="/">HOME</Link>
            </li>
            <li className="list-items">
              <Link to="/polls">POLLS</Link>
            </li>
            {
                auth
                ?
                    <li className="list-items">
                        <span onClick={handleLogout}>LOGOUT</span>
                    </li>
                    :
                <>
                    <li className="list-items">
                        <Link to="/sign-in">SIGN IN</Link>
                    </li>
                    <li className="list-items">
                        <Link to="/sign-up">SIGN UP</Link>
                    </li>
                </>
            }
          </ul>
        </div>

        <div style={{display:'flex'}}>
        <Link to="/cart">
            <div className="cart">
            <i className="fa fa-shopping-cart fa-1x"></i>
            <div className="number-of-items">
                <span className="noi">{cartCount}</span>
            </div>
        </div>
        </Link>
        <Link to="/wl">
            <div className="cart">
            <i className="fa fa-heart fa-1x"></i>
            <div className="number-of-items">
                <span className="noi">{wlCount}</span>
            </div>
        </div>
        </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
