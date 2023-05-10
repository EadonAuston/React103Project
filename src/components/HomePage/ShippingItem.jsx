import React from "react";
import styles from "../HomePage/ShippingItem.module.css";
function stripHtmlTags(htmlString) {
  return htmlString.replace(/(<([^>]+)>)/gi, "");
}

function changeQty({target}){
  let qty = target.value;
  let targetQty = target.parentElement;

  console.log(`Target Value: ${qty}`)
  console.log(`Parent Element: ${targetQty}`)
  console.log(`Qty Attribute on parent: ${targetQty.getAttribute("qty")}`)
  console.log(`Target Value: ${qty}`)
  // target.parentElement.qty = target.value;
  
  targetQty.setAttribute("qty", qty)

  
  
}


// const [dollars, cents] = value.toFixed(2).split('.');


const ShippingItem = ({category, desc, id, img, leftInStock, name, price, qty, addItemToCart}) => (

 
  <div className={styles.item}
  category={category}
  desc={stripHtmlTags(desc)}
  id={id}
  img={img}
  leftInStock={leftInStock}
  name={name}
  price={price}
  qty={qty}>

    <div style={{padding: "10px",  display: "inline-block", width: "350px", height: "400px"}}>
    <img src={img} alt="" style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
    </div>
    <p>{name}</p>
    <p style={{fontSize: "30px"}}><sup style={{fontSize: "15px"}}>$</sup>{Number(price).toFixed(2).split('.')[0]}<sup style={{fontSize: "15px"}}>{Number(price).toFixed(2).split('.')[1]}</sup></p>

    <p>{stripHtmlTags(desc)}</p>
    <p>Category: {category}</p>
    <p>Left In Stock: {leftInStock}</p>
    <label htmlFor="">Qty: </label><input type="number" onChange={changeQty}/>
    <button onClick={addItemToCart}>Add to Cart +</button>
      {/* <p>{id}</p> */}
      {/* <p>{qty}</p> */}
  </div>
)

export default ShippingItem;