const request = require('request')
const forecast=(latitude,longitude,callback) =>{
  const url = 'http://api.weatherstack.com/current?access_key=dccb76af4d693ebc4e4e4ec7a6ef44a1&query='+ latitude + ',' + longitude

  request({url,json:true},(error,{body})=>{
    if(error)
    {
      callback('Unable to Reach Api',undefined)
    }
    else if(body.error)
    {
      callback("Unable to find Co-ordinates",undefined)
    }
    else{
      callback(undefined,'The weather is '+body.current.weather_descriptions[0] +'.  '+'The temp is '+body.current.temperature+' but feels like '+ body.current.feelslike)
    }
  })
}

module.exports = forecast