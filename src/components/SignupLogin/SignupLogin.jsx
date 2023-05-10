import React from "react";
import style from './SignupLogin.module.css';
import SignupLoginInput from './SignupLoginInput'
import {validate, testPassword, matchPasswords, validateStr, validateEmail, validatePassword, validatePasswordsMatch, validatePostCode} from '../../validation'


class SignupLogin extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         signIn: false,
         eMail: '',
         isEMailGood: false,
         createPassword: '',
         isPasswordGood: false,
         isLoginEMailGood: false,
         isLoginPasswordGood: false,
         confirmPassword: '',
         doPasswordsMatch: false,
         firstName: '',
         isFirstNameGood: false,
         surName: '',
         isSurNameGood: false,
         postCode: '',
         isPostCodeGood: false,
         inputDisplay: true,
         error : {},
      }
      

   }
  

   handleInputChange = ({ target : {name, value}}) => {
      let newvalue = value;
      this.setState({
         [`${name}`]: newvalue,
      }, () => {
         testPassword(this.state.createPassword, 'isPasswordGood', this);
         matchPasswords(this.state.createPassword, this.state.confirmPassword, 'doPasswordsMatch', this);
         validate(this.state.eMail, 'isEMailGood', this, /\w+[@]\w+\.(com|net|org|edu|info|gov)/g);
         validate(this.state.firstName,'isFirstNameGood', this, /(^[A-Z]\D+)$/g);
         validate(this.state.surName,'isSurNameGood', this, /(^[A-Z]\D+)$/g);
         validate(this.state.postCode, 'isPostCodeGood', this, /^(\d+)$/g);
      })

      if (name === 'eMail') {
         this.props.getMail(value);
      }
      
   }

   handleValidations = (type, value) => {
      let errorText;
      switch(type) {
         case 'eMail' :
            errorText = validateEmail(value);
            this.setState((prevState) => ({
                  error: {
                     ...prevState.error,
                     eMailError: errorText,
                  },
            }))
            break;
         case 'createPassword':
            errorText = validatePassword(value);
            this.setState((prevState) => ({
               error: {...prevState.error, createPasswordError : errorText}
            }))
            break;
         case 'confirmPassword':
            errorText = validatePasswordsMatch(value, this.state.createPassword);
            this.setState((prevState) => ({
               error: {...prevState.error, confirmPasswordError : errorText}
            }))
            break;
         case 'firstName':
            errorText = validateStr(value);
            this.setState((prevState) => ({
               error: {...prevState.error, firstNameError : errorText}
            }))
            break;
            case 'surName':
            errorText = validateStr(value);
            this.setState((prevState) => ({
               error: {...prevState.error, surNameError : errorText}
            }))
            break;
            case 'postCode':
            errorText = validatePostCode(value);
            this.setState((prevState) => ({
               error: {...prevState.error, postCodeError : errorText}
            }))
            break;
         default : 
         break;
      }
   }

   handleBlur = ({ target: {name, value}}) => this.handleValidations(name, value);


   handleSubmit = (e) => {
      const {isEMailGood, isPasswordGood, doPasswordsMatch, isFirstNameGood, isSurNameGood, isPostCodeGood, inputDisplay} = this.state;
      if (inputDisplay){
         if (isEMailGood && isPasswordGood && doPasswordsMatch && isFirstNameGood && isSurNameGood && isPostCodeGood) {
            // console.log("HOOOOORAAAAAYYY! You created an account!");
            e.preventDefault();
            
           
            this.props.changePage();
            return
         } else {e.preventDefault();}
         
         
      }
      if (!inputDisplay) {
         if(isEMailGood && isPasswordGood && this.state.eMail.length > 0 && this.state.createPassword.length > 0){
            // console.log("HOOOOORAAAAAYYY! You just logged in!");
            e.preventDefault();
            this.props.changePage();
            return
         } else {e.preventDefault();}
      }
      
   }

   signIn = () => (
        this.setState({
         inputDisplay : false,
         signIn: true,
         eMail: '',
         createPassword: '',
        })
   )
   createAccount = () => (
      this.setState({
       inputDisplay : true,
       signIn: false,
     
      })
 )

   

   


   render() {

      
    
      const inputData = [
         {labelHTML: 'Your E-Mail Address*', inputName: 'eMail', inputPlaceholder: '', type: 'email', error: 'eMailError'},
         {labelHTML: 'Create Password', inputName: 'createPassword', inputPlaceholder: '', type: 'password', error: 'createPasswordError'},
         {labelHTML: 'Confirm Password', inputName: 'confirmPassword', inputPlaceholder: '', type: 'password', error: 'confirmPasswordError'},
         {labelHTML: 'First Name *', inputName: 'firstName', inputPlaceholder: 'John', error: 'firstNameError'},
         {labelHTML: 'Sur Name *', inputName: 'surName', inputPlaceholder: 'Doe', error: 'surNameError'},
         {labelHTML: 'Postcode', inputName: 'postCode', inputPlaceholder: '12345', type: 'number', error: 'postCodeError'},
      ];

      const login = [
         {labelHTML: 'E-Mail', inputName: 'eMail', inputPlaceholder: '', type: 'email', error: 'eMailError'},
         {labelHTML: 'Password', inputName: 'createPassword', inputPlaceholder: '', type: 'password', error: 'createPasswordError'},
      ]

      const {error} = this.state;
      
      return (
        
         <div>
            {this.test}
            <form className={style.form} onSubmit={this.handleSubmit}>
               <div className={`${style.fontBlack} ${style.fontSize20}`}>
                  <div className={style.flexbox}>
                  <input type="radio" name="r" id="1" onClick={this.signIn}/><label>SIGN IN</label>
                  <input type="radio" name="r" id="2" onClick={this.createAccount} defaultChecked/><label>CREATE ACCOUNT</label>
               </div>
               <br />
               {!this.state.signIn ? 
               inputData.length ? inputData.map((item) => (
                  <SignupLoginInput 
                  shippingPage={false}
                  type={item.type ? item.type : 'text'}
                  autoComplete="off"
                  onChange = {this.handleInputChange}
                  onBlur={this.handleBlur}
                  labelHTML={item.labelHTML} 
                  inputName={item.inputName} 
                  inputPlaceholder={item.inputPlaceholder}
                 
                  style={{display : this.state.inputDisplay ? 'block' : 'none'}}
                  errorM={
                     (error
                     && error[item.error]
                     && error[item.error].length > 1)
                     ? error[item.error]
                     : null
                   }
                  />
               )) : null
               :
               login.length ? login.map((item) => (
                  <SignupLoginInput 
                  shippingPage={false}
                  type={item.type ? item.type : 'text'}
                  autoComplete="off"
                  onChange = {this.handleInputChange}
                  onBlur={this.handleBlur}
                  labelHTML={item.labelHTML} 
                  inputName={item.inputName} 
                  inputPlaceholder={item.inputPlaceholder}
                  
                  style={{display : this.state.inputDisplay ? 'none' : 'block'}}
                  errorM={
                     (error
                     && error[item.error]
                     && error[item.error].length > 1)
                     ? error[item.error]
                     : null
                   }
                  />
               )) : null
               }
               </div>
               <button className={style.saveButton}>{this.state.inputDisplay ? 'SAVE' : 'LOGIN'}</button>
               <br />
               <div className={style.flexbox}>
                  <div className={style.line}></div>
                  <p className={style.or}>or</p>
                  <div className={style.line}></div>

               </div>
               
               <button className={style.facebookButton}>Sign Up with facebook</button>
               <br />
               
               <p className={style.continueAsGuest} onClick={this.props.changePage}>Continue as Guest</p>
            </form>
         </div>
      )
   }
}

export default SignupLogin;