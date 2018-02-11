var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/public/views'));

// Using middleware
var logger = function(req,res,next){
    res.send('Middleware function');
    next();//go to the next middleware in the stack
}

app.use('/middle',logger);

// OR, app.get('/middle',logger);


// static path middleware
app.use(express.static(path.join(__dirname,'public')));




app.get('/',function(req,res){
    res.sendfile('index.html');
})

app.get('/ejs',function(req,res){
    var name = 'Rajat';

    res.render('index',{
        title:name
    });
})



app.listen(8000,function(){
    console.log('Listening...');
}); 







