import React from "react";
import style from './SignUpLoginInput.module.css';


const SignupLoginInput = ({labelHTML, inputName, inputPlaceholder, onChange, textUnderneath, errorM, shippingPage,  ...props}) => (
   <div className={shippingPage ? style.flexbox : null}>
   <label {...props}>{labelHTML}</label>
   {/* {shippingPage ? null : <br/>} */}
      <input 
      {...props}
      style={shippingPage ? {width: '70%'} : null}
      autoComplete="off"
      name={inputName} 
      placeholder={inputPlaceholder} 
      onChange={onChange}/>
      {shippingPage ? <br/> : null}
      
      {errorM &&  <div className={style.error}>{errorM}</div>}
    
   
   </div>
)

export default SignupLoginInput;