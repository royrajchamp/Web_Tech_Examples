var mysql = require('mysql');

var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Rajat@123',
    database: 'db_tut'
    
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


// insert data
var data={
    name: 'Abhi',
    address: 'Bengal'
};


/* con.query("insert into customers(name,address) values ('Saumya','Kolkata')",function(err,result){
    if(err)throw err;
    console.log("Inserted data");
});*/

  con.query("insert into customers set ?",data,function(err,result){
    if(err)throw err;
    console.log("Inserted data");
}); *


/* retrieve data from thet able */


 con.query("select * from customers",function(err,result,fields){
    console.log(result);
 });

 // select just one column and display all the names

 con.query("select name from customers",function(err,result,fields){
     for(i=0;i<result.length;i++){
        console.log("All names: ",result[i].name);
     }
});


// outputs the result object where name is saumya
con.query("select * from customers where name ='saumya'",function(err,result){
    if(result.length==0){
        console.log('Not found');
    }
    else {console.log("Just Name: ",result);}
});

// returns [] when data not found
con.query("select * from customers where name ='aumya'",function(err,result){
    if(result.length==0){
        console.log('Not found');
    }
    else {console.log("Just Name: ",result);}
});


// check if address is same for a name
con.query("select address from customers where name = 'priya'",function(err,result){
    var add = 'Brazil'
    if(add==result[0].address){
        console.log('address match');
    }
    else{
        console.log('No match found');
    }
});

/* Write a query that will do user input of a name to the database but first
it will check whether the name is already present or not, otherwise it will
output that he cant enter the name, if name not there then add it to the database
*/


var another_data={
    name:'Arka',
    address:'BS2 8BQ'
}

con.query("select name from customers where name = ?", another_data['name'],function(err,result){ //first checks if the name is already in the database
    if(err)throw(err);
    if(result.length!=0){
        console.log('Name already exists');
    }
    else{
        con.query("insert into customers set ?",another_data,function(err,result){
            if(err)throw(err);
            console.log('Entered new data');
        });
    }
});



