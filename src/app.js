const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup halndlerbars and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath); 

//setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) =>{
    res.render('index', {
        title: "Index",
        name: "tri rahmat aribowo"
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'tri rahmat aribowo'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help Me',
        name: 'tri rahmat aribowo'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'No artikel help page',
        name: 'tri rahmat aribowo'
    })
})

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         errorMessage: 'page note found',
//         name: 'tri rahmat aribowo'
//     })
// });

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'this search not found'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'not data found'
        });
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {})=>{
        if(error){
            return res.send({error});
        }

        forcast(latitude, longitude, (error, forcastData)=>{
            if(error){
                return res.send({error});
            }

            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        })
    })
})






// app.get('', (req, res)=>{
//     res.send('hello world');
// });

app.get('/help', (req, res)=>{
    res.send(
        [
            {
                name : 'rahma',
                age: 21
            },
            {
                name: 'riska',
                age: 4
            }
        ]);
});

app.get('/home', (req, res)=>{
    res.send('<h1>page home</h1>');
});

app.get('/about', (req, res)=>{
    res.send('page about');
});

// app.get('/weather', (req, res)=>{
//     res.send('your weather');
// });

app.listen(3000, ()=>{
    console.log('server is up running on 3000');
});
 