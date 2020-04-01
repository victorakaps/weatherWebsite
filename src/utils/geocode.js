const request = require('request')
const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmljdG9yYWthcHMiLCJhIjoiY2s4YWRqbnF0MDE5YjNtbXVlY3V3Z2FhdSJ9.nk1IrpkK8AHcAMvOHzj8jg&limit=1'
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('unable to connect to location service', undefined)
        }
        else if(body.features.length === 0){
            callback('unable to find entered location.',undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode