
import VISA_ICON from '../components/assets/cards/visa.png'
import AMERICAN_EXPRESS_ICON from '../components/assets/cards/amex.png'
import MASTER_CARD_ICON from '../components/assets/cards/mastercard.png'
import DISCOVER_ICON from '../components/assets/cards/discover.png'



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
];

export const AMERICANEXPRESS = [
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
]

export const CARDICON = {
    VISA: VISA_ICON,
    MASTERCARD: MASTER_CARD_ICON,
    AMERICAN_EXPRESS: AMERICAN_EXPRESS_ICON,
    DISCOVER: DISCOVER_ICON,

}

