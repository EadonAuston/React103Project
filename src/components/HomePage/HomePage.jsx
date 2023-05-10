import React from "react";
import ShippingItem from "./ShippingItem";
import styles from './HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faShoppingCart );

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsInShoppingCart: [],
      itemsInCart: 0,

    }
  }


  addItemToCart = ({target}) => {
    // let inputValue = target.parentElement.children[7].value;
    // let mapArr = ["category", "desc", "id", "img", "leftinstock", "name", "price"];
    // let objectArr = {};
    // for (let i = 0; i < mapArr.length; i++) {
    //   objectArr[`${mapArr[i]}`] = target.parentElement.getAttribute(`${mapArr[i]}`);
    // }
    // objectArr['qty'] = inputValue === "" ? 1 : inputValue > Number(target.parentElement.getAttribute("leftinstock")) ? null : inputValue;
  
    // let newShoppingCartObj = {[target.parentElement.getAttribute("id")]: objectArr};

    // if (newShoppingCartObj[target.parentElement.getAttribute("id")].qty === null) {
    //   return
    // } else {
    //   target.disabled = true;
    //   this.setState({
    //     itemsInShoppingCart: [...this.state.itemsInShoppingCart, newShoppingCartObj],
    //     itemsInCart: this.state.itemsInCart + +inputValue,
    //   }) 
    //   console.log(this.state.itemsInShoppingCart)
    // }

    let inputValue = target.parentElement.children[7].value;
    let mapArr = ["category", "desc", "id", "img", "leftinstock", "name", "price"];
    let objectArr = {};
    for (let i = 0; i < mapArr.length; i++) {
      objectArr[`${mapArr[i]}`] = target.parentElement.getAttribute(`${mapArr[i]}`);
    }
    objectArr['qty'] = inputValue === "" ? 1 : inputValue > Number(target.parentElement.getAttribute("leftinstock")) ? null : inputValue;
  
    let newShoppingCartObj = objectArr;

    if (objectArr['qty'] === null) {
      return
    } else {
      target.disabled = true;
      this.setState({
        itemsInShoppingCart: [...this.state.itemsInShoppingCart, newShoppingCartObj],
        itemsInCart: this.state.itemsInCart + +inputValue,
      }) 
      console.log(this.state.itemsInShoppingCart)
    }
  }

  goOnToNextPage = () => {
    if (this.state.itemsInCart !== 0) {
      this.props.getShoppingItems(this.state.itemsInShoppingCart)
      this.props.changePage()
    } else {
      console.log("Falsy")
    }

    // this.state.itemsInCart !== 0 ? (this.props.getShoppingItems(this.state.itemsInShoppingCart) && this.props.changePage()) : console.log("Falsy");
    // ;
  }


  render () {

    return (
      <>
      <div className={styles.flexbox}>
        <h1 className={styles.h1}>CodeCommerceAPI</h1>
        <FontAwesomeIcon
        icon={faShoppingCart}
        className={styles.shoppingCart}
        onClick={this.goOnToNextPage}
        >
        </FontAwesomeIcon>
        <div 
          className={styles.circle} 
          style={this.state.itemsInShoppingCart.length >= 1 ? {display: "block"} : {display: "none"}}>{this.state.itemsInCart}
        </div>
      </div>
      
        {this.props.data ? this.props.data.map((item) => (
          <ShippingItem
          category={item.category}
          desc={item.desc}
          id={item.id}
          img={item.img}
          leftInStock={item.leftInStock}
          name={item.name}
          price={item.price}
          qty={item.qty}
          addItemToCart={this.addItemToCart}
          />
        )) : null}
      </>
    )
  }
}

export default HomePage;