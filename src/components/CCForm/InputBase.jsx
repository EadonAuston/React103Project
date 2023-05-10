import React from "react";
import style from './InputBase.module.css';
import { CARD, CARDICON } from './constants';

const InputBase = ( { errorM, error, cardType, isCard, ...props}) => (
   <label className={style.label}>
      <input className={`input-root ${style.input}`} {...props}/>
     {errorM &&  <div className="error">{errorM}</div>}
     {(!error || !error.cardError) && isCard && CARD.includes(cardType) && (
      <img 
      style= {{
         position: 'absolute',
         top: '5px',
         right: '10px',
         width: '50px',
         height: '33px',
      }}
      src={CARDICON[cardType]}
       alt="card" 
       />
     )}
   </label> 
)

export default InputBase;