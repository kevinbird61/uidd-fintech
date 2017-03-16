/* Calculate exchange rate usage */
const swap = require('node-currency-swap');
const jsfs = require('jsonfile');
const path = require('path');
const finance_country_config = require(path.join('..','data','finance.json'));

// Add the google finance provider
swap.addProvider(new swap.providers.GoogleFinance());

function getExchangeSync(country1,country2){
    var l_country = search_codename(country1);
    var r_country = search_codename(country2);

    var rateSync = swap.quoteSync({currency: l_country+'/'+r_country });
    // print the exchange rate
    console.log("Provider : " + rateSync[0].provider +"; Sync mode : ");
    console.log( l_country + " to " + r_country + " = 1 : "+rateSync[0].value+ "; date : " + rateSync[0].date);
    return rateSync;
}

function getExchangeAsync(country1,country2,callback){
    var l_country = search_codename(country1);
    var r_country = search_codename(country2);
    // if there is single provider in the list it fetch the rate from that provider but if there are multiple provider in the list it fetch the rate from first available one.
    swap.quote({currency: l_country+'/'+r_country }, function (err, rateAsync) {
        // print the exchange rate
        console.log("Provider : " + rateAsync[0].provider +"; Async mode : ");
        console.log( l_country + " to " + r_country + " = 1 : "+rateAsync[0].value+ "; date : " + rateAsync[0].date);
        if(err){
            callback(0,"[INFO] ERROR!! MSG:" + err);
        }
        else{
            // Work fine
            callback(1,rateAsync);
        }
    });
}

// Mapping original_country to corresponse country name
function search_codename(original_country){
    // Match and get correct name
    var mapping = finance_country_config[original_country.toUpperCase()];
    console.log("[INFO] Country Code name you get is : " + mapping);
    return mapping;
}

module.exports = {
    getExchangeSync : getExchangeSync,
    getExchangeAsync : getExchangeAsync
}
