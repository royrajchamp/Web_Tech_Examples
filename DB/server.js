var express = require('express');
var app = express();
var passwordHash = require('password-hash');
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Rajat@123',
    database: 'users'
    
});

connection.connect();




app.get('/',function(req,res){
    res.sendfile('index.html');
});



app.post('/login',function(req,res){
    var name = req.body.username; // get the username from the form
    var password = req.body.password; // get the password from the form
    var hashedPassword = passwordHash.generate(password);
    console.log(hashedPassword);
    var login_details ={
        username : name,
        password : hashedPassword
    };
    // check if the user entered username already exists or not
    connection.query('select username from details where username = ?',login_details.username,function(err,result){
        if(result.length!=0){ // if the result list has some data then the name that was input already exists
            res.send('Name already exists');
           
        }
        else{ // otherwise the result list is empty and the username can be registered to the database
            
            connection.query('insert into details set ?',login_details,function(err,result){
                if(err){
                    console.error(err);
                    res.send('Login Unsuccessful');
                    return;
                }
                if(result){
                    res.send('Login Successful');
                }
            });
        }

    });
  

});

/* Verify password whether the user entered password is same as hashed password */

var password = 'srkrocks';
connection.query("select password from details where username ='rajat'",function(err,result){
    // console.log(result[0].password);
    var checkValidity = passwordHash.verify(password,result[0].password);
    //console.log(checkValidity);
    if(checkValidity){
        console.log('Password Match. ');
    }
    else{
        console.log('Password Do not Match');
    }
});

app.listen(9000,function(){
    console.log('Listening');
});