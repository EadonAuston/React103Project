import React from "react";
import style from "../CustomerCart/CustomerCart.module.css";

const ConfirmationItem = ({
  img,
  description,
  category,
  price,
  qty,
  ...props
}) => (
  <div className={style.confirmationContainer} {...props}>
    <div className={style.productStats}>
      <img
        src={img}
        style={{ backgroundSize: "cover", height: "80px", marginRight: "20px" }}
        alt="product"
      />

      <div className="info" style={{ width: "600px" }}>
        <div>{description}</div>
        <div>Category: {category}</div>
        <div>Price: {(price / qty).toFixed(2)}</div>
      </div>
    </div>

    <div>Qty: {qty}</div>
    <div className={`${style.flexbox} ${style.center}`}>
      <div>${(+price).toFixed(2)} </div>
    </div>
  </div>
);

export default ConfirmationItem;
