var express = require('express');
var app = express();
var sqlite3 = require("sqlite3").verbose();
var passwordHash = require('password-hash');
var bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// creating a database and has a call-back function to deal with error
let db = new sqlite3.Database("user_details.db",(err ) => {
    if(err){
        return console.error(err.message);
    }
    console.log('Connected to database');
}); 

app.post('/sign_up',function(req,res){
    var name = req.body.username;
    var password = req.body.password;
    var hashPass = passwordHash.generate(password);
    
    var sign_up_details = {
        username : name,
        password: hashPass
    }

    // now insert the data into the table
    db.run("insert into details(name, password) values (?,?)",[sign_up_details['username'],sign_up_details['password']],function(err){
        if(err){
            throw err;
        }
        else{
            console.log('Data Inserted');
            res.send('Sign_up Successful')
        }
    });
});



app.get('/',function(req,res){
    res.sendfile('index.html');
});

// Close the database upton execution of all queries
/*db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
  });*/







app.listen(8000,function(){
    console.log('Listening');
});