import VISA_ICON from '../../assetsCopy/visa.png';
import AMERICAN_EXPRESS_ICON from '../../assetsCopy/amex.png';
import MASTER_CARD_ICON from '../../assetsCopy/masterCard.png';
import DISCOVER_ICON from '../../assetsCopy/discover.png';

export const OTHERCARDS = [
   /[1-9]/,
   /\d/,
   /\d/,
   /\d/,
   ' ',
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   ' ',
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   ' ',
   /\d/,
   /\d/,
   /\d/,
   /\d/,
]

export const AMERICAN_EXPRESS = [
   /[1-9]/,
   /\d/,
   /\d/,
   /\d/,
   ' ',
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   ' ',
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   /\d/,
  
];

export const CARD = [
   'VISA',
   'MASTERCARD',
   'AMERICAN_EXPRESS',
   'DISCOVER'
];

export const CARDICON = {
   VISA : VISA_ICON,
   MASTERCARD : MASTER_CARD_ICON,
   AMERICAN_EXPRESS : AMERICAN_EXPRESS_ICON,
   DISCOVER : DISCOVER_ICON,
}