const express = require('express');
const app = express();
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.port || 3000;

app.set('view engine', hbs);
hbs.registerPartials(__dirname + '/views/partials');

app.use((req,res,next)=> {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log( log );
    fs.appendFile('server.log', log + '\n');
     next();
});

//  app.use((req,res,next)=> {
//      res.render("maintenence.hbs");
//      next();
//  });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=> {
    // return text.toUpperCase();
});


app.get('/', (req,res)=> {
    res.render('about.hbs', ( {
        pageTitle : 'Aboyt Page is present now...',
        date  : new Date().getFullYear()
    }));
});

app.get('/data', (req,res)=> {
    res.send( {
        name : 'zainbintariq',
        hobbies :[
                 "Playingfootball",
                 "programing"
        ] 
    });
});

app.get('/about',(req,res)=> {
    res.render('home.hbs', ( {
        pageTitle : 'Aboyt Page is present now...',
        date  : new Date().getFullYear()
    }));    
});


app.listen(port, ()=> {
    console.log(`app will be running on ${port} port`);
});