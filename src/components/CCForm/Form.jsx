import React from "react";
import { OTHERCARDS } from "./constants";
import InputBase from "./InputBase";
import { cardExpireValidation,
    cardNumberValidation, 
    CVCValidation, 
    onlyTextValidation 
   } from "./ccValidation";
import style from './Form.module.css';

const INIT_CARD = {
      card: '',
      cardHolder: '',
      expDate: '',
      CVC: '',
   }

class Form extends React.Component {
   constructor () {
      super();

      this.state = {
         cardData : INIT_CARD,
         maxLength : OTHERCARDS.length,
         error: {},
         cardType: null,
      }
   }

   findDebitCardType = (cardNumber) => {
      const regexPattern = {
         MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
         VISA:  /^4[0-9]{2,}$/,
         AMERICAN_EXPRESS:  /^3[47][0-9]{5,}$/,
         DISCOVER:  /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
      };
      for (const card in regexPattern) {
         if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
      }
      return '';
   }

   handleValidations = (type, value) => {
      let errorText;
      switch(type) {
         case 'card' :
            errorText = cardNumberValidation(value);
            this.setState((prevState) => ({
               
                  cardType : this.findDebitCardType(value),
                  error: {
                     ...prevState.error,
                     cardError: errorText,
                  },
                 
            }))
            break;
         case 'cardHolder':
            errorText = onlyTextValidation(value);
            this.setState((prevState) => ({
               error: {...prevState.error, cardHolderError : errorText}
            }))
            break;
         case 'expDate':
            errorText = cardExpireValidation(value);
            this.setState((prevState) => ({
               error: {...prevState.error, expDateError : errorText}
            }))
            break;
         case 'CVC':
            errorText = CVCValidation(3, value);
            this.setState((prevState) => ({
               error: {...prevState.error, CVCError : errorText}
            }))
            break;
         default : 
         break;
      }
   }

   handleBlur = ({ target: {name, value}}) => this.handleValidations(name, value);
   

   handleInputData = ({ target: {name, value}}) => {

      if (name === 'card') {
         let mask = value.split(' ').join('');
         if (mask.length) {
            mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
            this.setState((prevState) => ({
         
               cardData : {
                 ...prevState.cardData,
                  [name] : mask,
                 }}));
         } else {
            this.setState((prevState) => ({
            
               cardData : {
                 ...prevState.cardData,
                  [name] : '',
                 }}))
         }
      } else {
         this.setState((prevState) => ({
            
             cardData : {
               ...prevState.cardData,
                [name] : value
               }}))
      }
    
   }

   checkErrorBeforeSave = () => {
      const { cardData, error } = this.state;
      let errorValue = {};
      let isError = false;

      Object.keys(error).forEach((val) => {
         
         if ( error[val] !== undefined) {
            isError = true;
         }
      })
    
      Object.keys(cardData).forEach((val) => {
         if (!cardData[val].length) {
            errorValue = { ...errorValue, [`${val}Error`]: `Required`} ;
            isError = true;
            
         }
         
      });
      // this.setState({ error: errorValue });
      return isError;
   }

   handleAddCard = (e) => {
      e.preventDefault();
      const errorCheck = this.checkErrorBeforeSave();
      let cardValue = this.state.cardData['card']
      let cardType = this.state.cardType;
      this.props.addCardNumber(cardValue);
      this.props.addCard(cardType)
      if (!errorCheck) {
         this.setState({
            cardData: INIT_CARD,
            cardType: null,
         })
         this.props.changePage();
      }
   }

   render() {

      const { 
         cardData,
         error,
         cardType,
         maxLength,
         } = this.state;

      const inputData = [
         {label: 'Card Number', name: 'card', type: 'text', error: 'cardError'},
         {label: 'CardHolder\'s Name', name: 'cardHolder', type: 'text', error: 'cardHolderError'},
         {label: 'ExpDate (MM/YY)', name: 'expDate', type: 'text', error: 'expDateError'},
         {label: 'CVC', name: 'CVC', type: 'text', error: 'CVCError'},
      ];

      return (
         <div>
            <h1>Add New Card</h1>
            <form onSubmit={this.handleAddCard}>
               {inputData.length ? inputData.map((item) => (
                   <InputBase 
                   placeholder={item.label}
                   type={item.type}
                   value={cardData && cardData[item.name]}
                   onChange={this.handleInputData}
                   autoComplete="off"
                   maxLength={maxLength}
                   name={item.name}
                   onBlur={this.handleBlur}
                   error={error}
                   cardType={cardType}
                   isCard={item.name === 'card'}
                   errorM={
                     (error
                     && error[item.error]
                     && error[item.error].length > 1)
                     ? error[item.error]
                     : null
                   }
                   />
               )) : null}
               <div className={style.btnWrapper}>
                  <InputBase type="submit" value={`Pay $${(+this.props.cartTotal).toFixed(2)}`} className={style.submitButton}/>
               </div>
            </form>
         </div>
      )
   }
}

export default Form;