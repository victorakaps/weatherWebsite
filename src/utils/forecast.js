const request = require('request')

const forecast = (longitude , latitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/5101fad8dde6eb3cb51fcf9fac2bc833/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '/?units=si'
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('check your internet conncetion',undefined)
        }
        else if(body.error){
            callback('unable to find the forecast for enetred location',undefined)
        }
        else{
            callback(undefined ,body.daily.data[0].summary + ',' + body.currently.temperature + ',' + body.currently.precipProbability)
        }
    })
}
module.exports = forecast