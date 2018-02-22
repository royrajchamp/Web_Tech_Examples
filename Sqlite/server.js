var express = require('express');
var app = express();
var sqlite3 = require("sqlite3").verbose();
var bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// creating a database and has a call-back function to deal with error
let db = new sqlite3.Database("form.db",(err ) => {
    if(err){
        return console.error(err.message);
    }
    console.log('Connected to database');
}); 



// Query all rows and get a value out
db.all('select * from user_details',[],(err,rows) => {
    if(err){
        throw err;
    }
    else{
        console.log(rows); // returns just the name
    }
});

// get all names out
db.all('select * from user_details',[],(err,rows) => {
    if(err){
        throw err;
    }
    else{
        for(i=0;i<rows.length;i++){
            console.log(rows[i].Name); // returns just the name
        }
    }
});



// query based on placeholder
let rowid=1;
db.get('select * from user_details where rowid = ?',rowid,(err,rows) => {
    if(err){
        throw err;
    }
    else{
         console.log('Name and Age for only id : ',rowid);
         console.log(rows);
         console.log(rows.Name,rows.Age);
    }
});

 var data = {
    name: 'Tapan',
    age: 41
}

// Inserting data as JS objects into tables
 db.run("insert into user_details(Name,Age) values (?,?)",[data['name'],data['age']],function(err){
    if(err){
        throw err;
    }
    else{
        console.log('data inserted');
    }
});

app.post('/sign_up',function(req,res){
    var name = req.body.username; // get the username from the form
    var password = req.body.password; // get the password from the form
    
});












app.get('/',function(req,res){
    res.sendfile('index.html');
});

// Close the database upton execution of all queries
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
  });







app.listen(9000,function(){
    console.log('Listening');
});