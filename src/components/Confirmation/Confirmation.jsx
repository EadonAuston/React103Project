import React from "react";
import style from "./Confirmation.module.css";
import { CARDICON } from "../CCForm/constants";
import ProgressBar from "../ProgressBar/ProgressBar";
import ConfirmationItem from "./ConfirmationItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faCircleCheck);

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getLastFourDigits = (str) => {
    let lastFour = "";
    let arr = Array.from(str);
    for (let i = 1; i < 5; i++) {
      lastFour += arr[arr.length - i];
    }
    let answer = Array.from(lastFour).reverse().join("");
    return answer;
  };

  render() {
    return (
      <div className={style.confirmationPage}>
        <div className={style.vFlexbox}>
          <ProgressBar confirmation={true} shipping={false} />
          <div className={`${style.flexbox} ${style.mainFlex}`}>
            <div className={style.confirmConfirm}>
              <h1 className={style.tal}>CONFIRMATION</h1>
              <hr />
              <FontAwesomeIcon
                icon={faCircleCheck}
                className={`${style.confirmCircle} ${style.confirmCircleBorder}`}
              />
              <h1 className={style.tac}>
                Congratulations. <br /> Your order is accepted.
              </h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
                veritatis inventore delectus velit, laborum fuga! Aspernatur
                officiis ipsum tempore consequuntur optio?
              </p>
              <button className={style.trackOrderButton}>TRACK ORDER</button>
              <br />
              <button className={style.backButton}>BACK TO HOME PAGE</button>
            </div>
            <div className={style.confirmSummary}>
              <h1 className={style.tal}>SUMMARY</h1>
              <hr />
              {this.props.itemsInShoppingCart
                ? this.props.itemsInShoppingCart.map((item) => (
                    <ConfirmationItem
                      img={item.img}
                      description={item.name}
                      category={item.category}
                      price={(item.price * item.qty).toFixed(2)}
                      qty={item.qty}
                    />
                  ))
                : null}

              <hr />
              <div className="tar">
                <div className={`${style.flexbox} ${style.flexEnd}`}>
                  <span>Cart Subtotal:</span>
                  <span>{`$${
                    this.props.discount === 1
                      ? (+this.props.cartTotal).toFixed(2)
                      : ((+this.props.cartTotal * 100) / 85).toFixed(2)
                  }`}</span>
                </div>
                <div className={`${style.flexbox} ${style.flexEnd}`}>
                  <span>Shipping and Handling:</span>
                  <span>+${this.props.shippingCost === 0 ? "FREE" : "5"}</span>
                </div>
                <div className={`${style.flexbox} ${style.flexEnd}`}>
                  <span>Discount:</span>
                  <span>{`-$${
                    this.props.discount === 1
                      ? "0.00"
                      : `${(
                          (this.props.discount === 1
                            ? +this.props.cartTotal.toFixed(2)
                            : ((+this.props.cartTotal * 100) / 85).toFixed(2)) *
                          (1 - +this.props.discount)
                        ).toFixed(2)}`
                  }`}</span>
                </div>
                <div className={`${style.flexbox} ${style.flexEnd}`}>
                  <span>Cart Total:</span>
                  <span>
                    $
                    {(+this.props.cartTotal + this.props.shippingCost).toFixed(
                      2
                    )}
                  </span>
                </div>
              </div>
              <hr />
              <div className={`${style.flexbox} ${style.mainFlex}`}>
                <h1>SHIPPING</h1>
                <p>View Shipping Details</p>
              </div>

              {this.props.shippingCost === 0 ? (
                <div>
                  <h3>STANDARD</h3>
                  <p>Delivery in 4-6 working days</p>
                </div>
              ) : (
                <div>
                  <h3>EXPRESS</h3>
                  <p>Delivery in 1-3 working days</p>
                </div>
              )}

              <hr />
              <div className={`${style.flexbox} ${style.mainFlex}`}>
                <h1>PAYMENT</h1>
                <p>View Payment Details</p>
              </div>
              <div className={`${style.flexbox} ${style.flexStart}`}>
                <img
                  src={CARDICON[`${this.props.cardType}`]}
                  alt="It didn't work"
                  width="50px"
                />
                <div className={style.cardType}>{`${
                  this.props.cardType
                } ending in ...${this.getLastFourDigits(
                  this.props.cardNumber
                )}`}</div>
                <p>
                  Total Payment: $
                  {(+this.props.cartTotal + this.props.shippingCost).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirmation;
