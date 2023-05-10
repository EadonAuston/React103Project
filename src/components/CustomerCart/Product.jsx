import React from "react";
import style from './CustomerCart.module.css';


const Product = ({id, img, name, desc, category, price, setTotalPrice, setPrice, setQuantity, deleteCircle, qty, leftInStock, ...props}) => (
   
   <div className={style.productContainer} {...props}>
      <div className={style.circle} onClick={deleteCircle} id={id}>X</div>
      <div className={style.productStats}>
         <img src={img} alt={desc} width={150} height={150}/>
         {/* <div className={img} style={{backgroundSize: '150px 150px', marginRight: '20px'}}></div> */}
         <div className="info" style={{width: '600px'}}>
            <div>{name}</div>
            <div>{desc}</div>
            <div>Category: {category}</div>
            <div>Left in Stock: {leftInStock}</div>
         </div>
      </div>
      <div className={`${style.flexbox} ${style.center}`}>
         <div className={style.marginRight2}>${price}</div>
         <input className={style.marginRight2} onChange={setQuantity} value={qty} name="" id={id} min={0} max={leftInStock}></input>
         <div className={style.marginRight2} onClick={setTotalPrice} id={id} >${(qty * price).toFixed(2)}</div>
      </div>
   </div>
)

export default Product;