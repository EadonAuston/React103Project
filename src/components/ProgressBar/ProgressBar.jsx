import React from "react";
import style from '../ShippingInfo/ShippingInfo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTruck, faCreditCard, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faCheck, faTruck, faCreditCard, faCircleCheck );



const ProgressBar = ({shipping, confirmation,...props}) => (
  
   <div>
      <div className={`${style.flexbox} ${style.ml14}`}>
         <div className={`${style.circle} ${style.bb}`}><FontAwesomeIcon icon={faCheck} className={`${style.fai} ${style.cw}`} /></div>
         <div className={`${style.bar} ${confirmation ? style.w30 : style.w25} ${style.bb}`}></div>
         <div className={`${style.circle} ${style.bb}`}><FontAwesomeIcon icon={shipping ? faTruck : faCheck} className={`${style.fai} ${style.cw}`} /></div>
         <div className={`${style.bar} ${confirmation ? style.w30 : style.w25} ${shipping ? style.bg : style.bb}`}></div>
         <div className={`${style.circle} ${shipping ? style.bg : style.bb}`}><FontAwesomeIcon icon={confirmation ? faCheck : faCreditCard} className={`${style.fai} ${shipping ? style.cg : style.cw}`} /></div>
         <div className={`${style.bar} ${confirmation ? style.bb : style.bg} ${confirmation ? style.w30 : style.w25}`}></div>
         <div className={`${style.circle} ${style.bg}`}><FontAwesomeIcon icon={faCircleCheck} className={`${style.fai} ${confirmation ? style.cw : style.cg}`} /></div>
         <br />               
      </div>
      <div className={`${style.flexbox} ${style.w104}`}>
         <p>Cart</p>
         <p>Delivery</p>
         <p>Payment</p>
         <p>Confirmation</p>
      </div>      
   </div> 
)




export default ProgressBar;