const path = require('path');
const hbs = require('hbs');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


//Define paths for express config.
const app = express();

const PORT =process.env.PORT || 3000

const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location.
app.set('view engine','hbs')
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve.
app.use(express.static(publicDirPath));

app.get('',(req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'S.M.Saad'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About Me',
        name: 'S.M.Saad'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Always there for your help',
        name:'S.M.Saad'
    })
})


app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error:'Should provide a address term!...'
        })
    }

    geocode(req.query.address, (error, {Latitude, Longitude, place} = {} ) => {
        if(error){
            return res.send( {error} )
        }
        forecast(req.query.address, (error, data = {} ) => {
            if(error){
                return res.send( {error} )
            }

            res.send({
                address:req.query.address,
                forecast:data,
                Latitude:Latitude,
                Longitude:Longitude,
                place:place
            })

        })
    })

})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You should provide a search term!...'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page',{
        title:'404! Page not found',
        name:"S.M.Saad"
    })
})

// app.get('*', (res, req) => {
//     res.render('404page',{
//         title:'404! Page not found',
//         name:"S.M.Saad"
//     })
// })
// ('incoming request to the server --> req, response send back to requester --> res )

// app.get('',(req, res) => {
//     res.send(`<h1> Hello Express... </h1>`);
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name:'Syed Saad',
//         age: 20},
//         {
//         name:'Naveed Hakim',
//         age: 21
//     }])
// })
//
// app.get('/about', (req, res) => {
//     res.send('`<h1> About Page... </h1>')
// })


app.listen(PORT, () => {
    console.log('Server is up on port'+ PORT);
});