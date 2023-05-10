import React from "react";
import style from '../CustomerCart/CustomerCart.module.css';

const ShippingProduct = ({img, description, category, price, qty, ...props}) => (
   <div className={style.shippingContainer} {...props}>
      <div className={style.shippingStats}>
         <img src={img} width={100} style={{backgroundSize: 'cover', marginBottom: '-10px', marginRight: '20px'}}></img>
         <div className="info" style={{width: '600px'}}>
            <div className={style.vFlexbox}>
               <div className={`${style.bold} ${style.mb5}`}>{description}</div>
               <div>
                  <div>Category: {category}</div>
                  <div className={style.flexbox}>
                     <div>Qty: {qty}</div>
                     <div className={style.bold}>${price}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
)

export default ShippingProduct;