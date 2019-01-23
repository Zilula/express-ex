const request  = require('superagent');
const getQuote = () => {
    return request 
        .get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
    // .then(res => {
    //     return res;
    // });
};


console.log(getQuote());

