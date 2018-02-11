var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Rajat@123',
    database: 'articles'
    
});

connection.connect();

/* Insert a record */

var article = {
    author : 'Saumya',
    title : 'Database tutorial',
    body: 'We are doing a database tutorial'
};

// now do a query and pass the data but this is asynchronous,
// so we call a callback function
connection.query('insert into articles set ?',article,function(err,result){
    if(err){
        console.error(err);
        return;
    }
    console.error(result)
});

/* Retrieve some data */
