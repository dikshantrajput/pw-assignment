import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Product from './Product'

function Cart({setCartCount}) {
    const [products,setProducts] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("cart")){
            let cart = JSON.parse(localStorage.getItem("cart"))
            setProducts(cart)
        }
    },[])

    const handleClick = ()=>{
       alert('Order placed success')
       setCartCount(0)
       localStorage.removeItem('cart')
        navigate('/')
    }
    return (
        <>
        <div className='product'>
        <div className='product' style={{marginTop:"2em"}}>
            {
                products.length === 0 && 'No products in cart'
            }
            {
                products.map((product)=>{
                    return <Product product={product} cart={true} wl={true} />
                })
            }
        </div>
        </div>
        {
            products.length > 0 && <button className='btn btn-primary' onClick={handleClick} style={{marginLeft:"5em"}}>Place Order</button>
        }
        
        </>
      )
}

export default Cart