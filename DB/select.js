var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Rajat@123',
    database: 'articles'
    
});

connection.connect();

connection.query('select * from articles',function(err,result){
    console.log(result);
});