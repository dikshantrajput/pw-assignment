import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Home from "./components/Home";
import Polls from "./components/Polls";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Wishlist from "./components/WishList";

function App() {
  const [cartCount,setCartCount] = useState(0)
  const [wlCount,setWlCount] = useState(0)
  const [user,setUser] = useState(null)
  const [auth,setAuth] = useState(false)
  useEffect(()=>{
    let cart = JSON.parse(localStorage.getItem("cart"))
    let wl = JSON.parse(localStorage.getItem("wl"))
    let auth = JSON.parse(localStorage.getItem("auth"))
    let user = JSON.parse(localStorage.getItem("user"))
    if(cart){
      setCartCount(cart.length)
    }
    if(wl){
      setWlCount(wl.length)
    }
    if(auth){
      setAuth(auth)
      setUser(user)
    }
  },[])
  return (
    <div className="App">
    <Header cartCount={cartCount} wlCount={wlCount} auth={auth} user={user} setAuth={setAuth} setUser={setUser} setCartCount={setCartCount} setWlCount={setWlCount} />
    <Routes>
      <Route path="/" element={<Home setCartCount={setCartCount} setWlCount={setWlCount} />}/>
      <Route path="/polls" element={<Polls user={user} />}/>
      <Route path="/cart" element={<Cart setCartCount={setCartCount}/>}/>
      <Route path="/wl" element={<Wishlist setCartCount={setCartCount}/>}/>
      <Route path="/sign-in" element={<SignIn setAuth={setAuth} setUser={setUser}/>} />
      <Route path="/sign-up" element={<SignUp/>}/>
    </Routes>
  </div>
  );
}

export default App;
