const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require("./utils/geocode")
const forecast = require('./utils/forecast')


const app = express()

// Paths for express config
const viewspath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Hardev Goyal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name : 'Hardev Goyal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name : 'Hardev Goyal'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: "No address given"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error:error})
        }

        forecast(longitude,latitude,(error,forecastData)=>{
            if(error )
            {
                return res.send(error)
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
     res.render('error.hbs',{
        title : '404/Help',
        name : 'Hardev',
        errorMessage : 'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('error.hbs',{
        title : '404',
        name : 'Hardev',
        errorMessage : 'Page Not found'
    })
})


app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})