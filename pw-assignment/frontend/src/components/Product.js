import React from 'react'

function Product({product,setCartCount,setWlCount,cart=false,wl=false}) {
    const handleClick = (type)=>{
        if(type === 'c'){
            let cart = JSON.parse(localStorage.getItem("cart"))
            if(cart && cart.find((p)=>p.sys.id === product.sys.id)){
                alert('Product already in cart')
            }else{
                if(cart){
                    localStorage.setItem('cart',JSON.stringify([...cart,product]))
                }else{
                    localStorage.setItem('cart',JSON.stringify([product]))
                }
                setCartCount((prev)=>prev+1)
            }
        }else{
            let cart = JSON.parse(localStorage.getItem("wl"))
            if(cart && cart.find((p)=>p.sys.id === product.sys.id)){
                alert('Product already in wishlist')
            }else{
                if(cart){
                    localStorage.setItem('wl',JSON.stringify([...cart,product]))
                }else{
                    localStorage.setItem('wl',JSON.stringify([product]))
                }
                setWlCount((prev)=>prev+1)
            }
        }
    }
  return (
    <div className="product-card">
        <img src="images/product-1.jpeg" alt="product"/>
        {
            !cart ?
                <span className="add-to-cart" data-id="" onClick={()=>handleClick('c')}>
                    <i className="fa fa-cart-plus fa-1x" style={{marginRight:"0.1em",fontSize:"1em"}}></i>
                    Add To Cart
                </span>
                :
                null
        }
        <div className="product-name">{product.fields.title} 
        {
            !wl ?
            <span onClick={()=>handleClick('wl')} style={{fontSize:"1.2em",marginLeft:"0.2em",cursor:"pointer"}}>&hearts;</span>
            :
            null
        }
        </div>
        <div className="product-pricing">Rs. {product.fields.price * 1000}</div>
    </div>
  )
}

export default Product