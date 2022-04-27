import React, { useEffect, useState } from 'react'
import Product from './Product'

function Wishlist({setCartCount}) {
    const [products,setProducts] = useState([])
    useEffect(()=>{
        let cart = JSON.parse(localStorage.getItem("wl"))
        setProducts(cart)
    },[])
    return (
        <div className='product'>
        <div className='product' style={{marginTop:"2em"}}>
            {
                products.map((product)=>{
                    return <Product setCartCount={setCartCount} product={product} wl={true} />
                })
            }
        </div>
        </div>
      )
}

export default Wishlist