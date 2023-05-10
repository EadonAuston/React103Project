import React from "react";
import Confirmation from "../Confirmation/Confirmation";
import CustomerCart from "../CustomerCart/CustomerCart";
import PaymentInfo from "../PaymentInfo/PaymentInfo";
import ShippingInfo from "../ShippingInfo/ShippingInfo";


class Checkout extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         page: 1,
      };
   }

   changePage = () => {
      this.setState((prevState) => ({
         page: prevState.page + 1
     })); 
   }
  
   reversePage = () => {
      this.props.applyCoupon();
      this.setState((prevState) => ({
         page: prevState.page - 1,
         

     })); 
   }
   render() {

   const {page} = this.state;


   return (
      <div>

         
        
         {page === 1 ?
         <CustomerCart
         itemsInShoppingCart={this.props.itemsInShoppingCart} 
         setCartTotal={this.props.setCartTotal} 
         changePage={this.changePage} 
         cartData={this.props.cartData} 
         setQuantity={this.props.setQuantity} 
         deleteCircle={this.props.deleteCircle} 
         onMount={this.props.onMount}
         handlePromo={this.props.handlePromo}
         applyCoupon={this.props.applyCoupon}
         cartTotal={this.props.cartTotal}
         promoCode={this.props.promoCode}
         discount={this.props.discount}
         totalPrice1={this.props.totalPrice1}
         totalPrice2={this.props.totalPrice2}
         totalPrice3={this.props.totalPrice3}
         totalPrice4={this.props.totalPrice4}
         totalPrice5={this.props.totalPrice5}/>
         : 
         page === 2 ? 
         <ShippingInfo
         itemsInShoppingCart={this.props.itemsInShoppingCart} 
         changePage={this.changePage} 
         cartData={this.props.cartData}
         reversePage={this.reversePage}
         cartTotal={this.props.cartTotal}
         discount={this.props.discount}
         toggleExpressShipping={this.props.toggleExpressShipping}
         toggleStandardShipping={this.props.toggleStandardShipping}
         shippingCost={this.props.shippingCost}
         changeZip={this.props.changeZip}
         changeAddressTitle={this.props.changeAddressTitle}
         changeAddress={this.props.changeAddress}
         changeCity={this.props.changeCity}
         />
         : 
         page === 3 ? 
         <PaymentInfo
         itemsInShoppingCart={this.props.itemsInShoppingCart} 
         changePage={this.changePage} 
         reversePage={this.reversePage}
         cartData={this.props.cartData}
         cartTotal={this.props.cartTotal}
         discount={this.props.discount}
         shippingCost={this.props.shippingCost}
         addCard={this.props.addCard}
         addCardNumber={this.props.addCardNumber}
         addressTitle={this.props.addressTitle}
         address={this.props.address}
         zipCode={this.props.zipCode}
         city={this.props.city}
         eMail={this.props.eMail}


         /> 
         : 
         page === 4 ? 
         <Confirmation
         itemsInShoppingCart={this.props.itemsInShoppingCart} 
         cardType={this.props.cardType}
         cartData={this.props.cartData}
         shippingCost={this.props.shippingCost}
         cartTotal={this.props.cartTotal}
         discount={this.props.discount}
         cardNumber={this.props.cardNumber}
         />
         : null}
      </div>
   )
   }
}


export default Checkout;