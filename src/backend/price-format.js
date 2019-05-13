export function getPriceFormattedString(price) {
    let unformattedString = "" + price;
    let formattedString = "";

    unformattedString = unformattedString.split('').reverse().join('');
    
    for (let i = 0; i < unformattedString.length; i++) {
        formattedString += unformattedString.charAt(i);
        if( (i+1) % 3 === 0 && (i+1) !== unformattedString.length) {
            formattedString += ".";
        }
    }

    formattedString = formattedString.split('').reverse().join('');

    return formattedString;
}