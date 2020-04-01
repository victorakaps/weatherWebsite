const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000;

//define paths for express config
const pubblicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and view loction
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//setup static directory to use 
app.use(express.static(pubblicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Made by victor'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Created By Victor'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Documantation',
        name: 'Made By Victor'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
        if(error){
        return res.send({
            error
        })
        }
        forecast(longitude,latitude, (error, forecastData) => {
        if(error){
            return res.send({
                error
            })
        }
        res.send({
            location: location,
            weather: forecastData,
            address: req.query.address,
        })
      })   
    })
})

app.get('/help/*',(req,res)=>{
    res.render('article-error',{
        title: 'article not found',
        name: 'parth',
        errorMessage: 'article you are looking for doesnt exists'
    })
})


app.get('*',(req,res)=>{
    res.render('404-error',{
        title: '404',
        name: 'parth',
        errorMessage: 'page not found'
    })
})



app.listen(port, ()=>{
    console.log('server is up on port:' + port)
})
