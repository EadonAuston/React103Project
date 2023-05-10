
import React from "react";
import style from './CustomerCart.module.css';
import Product from "./Product";

class CustomerCart extends React.Component {
   constructor() {
      super();
      this.state = {
         couponCode: '',
         couponError: '',
         isCouponCodeGood: false,
         
         totalPrice1: 21.50,
         totalPrice2: 21.50,
         totalPrice3: 42.50,
         totalPrice4: 32.50,
         totalPrice5: 27.40,
         basePrice1: 21.50,
         basePrice2: 21.50,
         basePrice3: 42.50,
         basePrice4: 32.50,
         basePrice5: 27.40,
         discount: 1,
         discountText: "-",
         cartTotal:  "",
         '1': 1,
         '2': 1,
         '3': 1,
         '4': 1,
         '5': 1,
      }
   }

   handlePromo = ({target: {value}}) => {
      this.props.handlePromo(value);
      this.setState({
         promoCode: value,
      }, () => {
         this.state.promoCode === "PROMO15" ?  
         this.setState({isCouponCodeGood: true}) : 
          this.setState({isCouponCodeGood: false});
      })
   }

   deleteCircle = ({target }) => {
      // target.parentElement.style.display = 'none';
      
      this.props.itemsInShoppingCart.findIndex((item) => item.id === target.id)
      this.props.deleteCircle(target);
      
      this.setState({
         [`totalPrice${target.id}`]: 0,
         [`${target.id}`]: 0,
         
      }, () => {
         this.setState({
           cartTotal: (this.state.discount * ((this.state.totalPrice1 + this.state.totalPrice2 + this.state.totalPrice3 + this.state.totalPrice4 + this.state.totalPrice5))).toFixed(2),
         });
         
        
         })
      }
   

   setQuantity = ({target}) => {
     this.props.setQuantity(target);
      this.setState({
         [`${target.id}`]: target.value,
         // [`totalPrice${target.id}`]: target.value * this.state[`basePrice${target.id}`],
         
         
      })
     
   }

   handleChange = ({target}) => {
      console.log(target)
   }

  setPrice = ({target: {id, innerHTML}}) => {
   let no$ = Array.from(innerHTML);
   no$.shift();
   no$.join(' ');
   

   this.setState({
      [`totalPrice${id}`]: no$.join('')
   })
  }


  setTotalPrice = ({target: {id, innerHTML}}) => {
   let no$ = Array.from(innerHTML);
   no$.shift();
   no$.join(' ');
   console.log(no$);

   this.setState({
      [`totalPrice${id}`]: no$.join('')
   })
  }

  cartTotal = () => {
   const {totalPrice1, totalPrice2, totalPrice3, totalPrice4, totalPrice5} = this.state;
   this.setState({
      cartTotal: this.props.cartTotal,
   })
  }

  applyCoupon = () => {
   this.props.applyCoupon();
   this.state.isCouponCodeGood ? 
   this.setState({discount: .85},
       () => {
         this.props.setCartTotal();
         this.setState({discountText: "-15%"});
       }) :
   this.setState({couponError: "This is not a valid coupon, or you have already applied this coupon"})
   }

  componentDidMount = () => {
   this.props.onMount();
   this.cartTotal();
   this.props.setCartTotal();
  }

 

   render() {
      const {flexbox} = style;

      return (
         <div className={style.customerCartForm} onClick={this.cartTotal} >
            <div className={flexbox}>
               <div className={style.product}>
                  <nav>
                     <div className={style.flexboxProduct} style={{margin: '10px 10px 0 10px'}}>
                        <div>PRODUCT</div>
                        <div className={flexbox}>
                           <div className={style.marginRight}>PRICE</div>
                           <div className={style.marginRight}>QUANTITY</div>
                           <div className={style.marginRight}>TOTAL PRICE</div>
                        </div>
                     </div>
                  </nav>
                  <hr />
                  
                  {this.props.itemsInShoppingCart ? this.props.itemsInShoppingCart.map((item) => (
                    
                        <Product 
                        onClick={this.handleChange}
                        id={item.id}
                        img={item.img}
                        name={item.name}
                        desc={item.desc}
                        category={item.category}
                        price={item.price}
                        setTotalPrice={this.setTotalPrice}
                        setPrice={this.setPrice}
                        setQuantity={this.setQuantity}
                        deleteCircle={this.deleteCircle}
                        qty={item.qty}
                        leftInStock={item.leftinstock}
                        />
                     )
                  ): null}
               </div>
               <div className={style.summary}>
                  <div>Summary</div>
                  <hr />
                  <p>Do you have a promo code?</p>
                  <div className={flexbox}>
                     <div>
                     <input type="text" placeholder="Code" name='promoCode' onChange={this.handlePromo} value={this.props.promoCode}/>
                     <p>{this.state.couponError}</p>
                     </div>
                   
                     <button className={style.applyButton} onClick={this.applyCoupon}>Apply</button>
                  </div>
                  <hr />
                  <div className={flexbox}>
                     <p>Cart Subtotal:</p><p className={style.bold}>{this.props.discount === 1 ? `$${(+this.props.cartTotal).toFixed(2)}` : `$${(+this.props.cartTotal * 100 / 85).toFixed(2)}`}</p>
                  </div>
                  <div className={flexbox}>
                     <p>Shipping & Handling:</p><p>-</p>
                  </div>
                  <div className={flexbox}>
                     <p>Discount:</p><p>{this.props.discount === 1 ? '-0%' : '-15%'}</p>
                  </div>
                  <div className={flexbox}>
                     <p className={style.bold}>Cart Total: </p><p>${(+this.props.cartTotal).toFixed(2)}</p>
                  </div>
                  <hr />

                  <button 
                     className={`${style.checkoutButton} ${this.props.cartData.length ? null : style.disabled}`}  
                     onClick={this.props.cartData.length ? () => {this.props.changePage()} : null}>Checkout
                  </button>
               </div>
            </div>
            </div>
      )
   }
}

export default CustomerCart;