import React from 'react'
import Products from './Products'

function Home({setCartCount,setWlCount}) {
  return (
    <div>
        <section className="section2" id="products">
        <div className="title">
            <h1>OUR PRODUCTS</h1>
        </div>
        <div className="product">
            <Products setCartCount={setCartCount} setWlCount={setWlCount}/>
        </div>
    </section>
    </div>
  )
}

export default Home