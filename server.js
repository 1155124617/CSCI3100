
var express=require("express"); //we use express to simplify our code
var events = require('events');
var emitter = new events.EventEmitter();
var app=express();
var path=require("path");
var mysql=require("mysql");//we use mysql as our database
var fs = require("fs");
var dirname=__dirname;
const bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '.')));
var marked = require("marked");

    
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    req.method == "Options" ? res.send(200) : next()
});

/*reg the user account*/

app.post("/reg",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="insert into user(username,password) values(?,?);"; //mysql query
    var sqlValue=[req.body['username'], req.body['password']]; //query parameters

    connection.query(sql,sqlValue,function(err){ //do the query in database and return the result
        if(err){
            console.log(err.message);
            return res.end("F");
        }

    });
    
    var sql2="insert into savefile(UID, physical, mental, money, academic, round) values(?, 50, 50, 50, 50, 0);"; //mysql query
    var sqlValue2=[req.body['username']]; //query parameters
    
    connection.query(sql2,sqlValue2,function(err){ //do the query in database and return the result
        if(err){
            console.log(err.message);
            return res.end("F");
        }
        else if(!err)
        {
            return res.end("S");
        }
    });
    
});

/*log in to user account*/

app.post("/log",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    var sql="select * from user where username=? and password=?;"; //mysql query
    var sqlValue=[req.body['username'], req.body['password']]; //query parameters
    
    connection.query(sql,sqlValue,function(err,result){ //do the query in database and return the result
        if(err){
            console.log("error!");
            console.log(err.message);
            return res.end("E");
        }
        else if(!err)
        {
            if(result.length == 1)
            {
                res.setHeader('Set-Cookie', 'username='+req.body['username']);
                return res.end("S");
            }
            else
            {
                return res.end("F");
            }
        }
    });
});

/*log in to admin account*/

app.post("/admin_log",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    var sql="select * from admin where username=? and password=?;"; //mysql query
    var sqlValue=[req.body['username'], req.body['password']]; //query parameters
    
    connection.query(sql,sqlValue,function(err,result){ //do the query in database and return the result
        if(err){
            console.log("error!");
            console.log(err.message);
            return res.end("E");
        }
        else if(!err)
        {
            if(result.length == 1)
            {
                return res.end("S");
            }
            else
            {
                return res.end("F");
            }
        }
    });
});

/*create user account by admin*/

app.post("/admin_user_c",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="insert into user(username,password) values(?,?);"; //mysql query
    var sqlValue=[req.body['username'], req.body['password']]; //query parameters

    connection.query(sql,sqlValue,function(err){ //do the query in database and return the result
        if(err){
            console.log(err.message);
            return res.end("F");
        }

    });
    
    var sql2="insert into savefile(UID, physical, mental, money, academic, round) values(?, 50, 50, 50, 50, 0);"; //mysql query
    var sqlValue2=[req.body['username']]; //query parameters
    
    connection.query(sql2,sqlValue2,function(err){ //do the query in database and return the result
        if(err){
            console.log(err.message);
            return res.end("F");
        }
        else if(!err)
        {
            return res.end("S");
        }
    });
    
});

/*retrieve user account by admin*/

app.post("/admin_user_r",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="select * from user;"; //mysql query

    connection.query(sql,function(err,result){ //do the query in database and return the result
        if(err){
            console.log(err.message);
            return res.end("F");
        }
        else if(!err)
        {
            res.send(result);
            //return res.end("S");
        }
    });
});

/*delete user account by admin*/

app.post("/admin_user_d",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="delete from user where username=?;"; //mysql query
    var sqlValue=[req.body['username']]; //query parameters

    connection.query(sql,sqlValue,function(err, result){ //do the query in database and return the result
        if(err){
            console.log("error!");
            console.log(err.message);
            return res.end("E");
        }
        else if(!err)
        {
            if(result.affectedRows != 1)
                return res.end("F");
        }
    });
    
    var sql2="delete from savefile where UID=?;"; //mysql query
    var sqlValue2=[req.body['username']]; //query parameters

    connection.query(sql2,sqlValue2,function(err, result){ //do the query in database and return the result
        if(err){
            console.log("error!");
            console.log(err.message);
            return res.end("E");
        }
        else if(!err)
        {
            if(result.affectedRows == 1)
                return res.end("S");
            else
                return res.end("F");
        }
    });
    
});

/*update user account by admin*/

app.post("/admin_user_u",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="update user set username=?, password=? where username=?"; //mysql query
    var sqlValue=[req.body['n_username'], req.body['n_password'], req.body['o_username']]; //query parameters

    connection.query(sql,sqlValue,function(err, result){ //do the query in database and return the result
        if(err){
            console.log("error!");
            console.log(err.message);
            return res.end("E");
        }
        else if(!err)
        {
            if(result.affectedRows != 1)
                return res.end("F");
        }
    });
    
    var sql2="update savefile set UID=? where UID=?"; //mysql query
    var sqlValue2=[req.body['n_username'], req.body['o_username']]; //query parameters

    connection.query(sql2,sqlValue2,function(err, result){ //do the query in database and return the result
        if(err){
            console.log("error!");
            console.log(err.message);
            return res.end("E");
        }
        else if(!err)
        {
            if(result.affectedRows == 1)
                return res.end("S");
            else
                return res.end("F");
        }
    });
    
});

/*create admin account by admin*/

app.post("/admin_admin_c",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="insert into admin(username,password) values(?,?);"; //mysql query
    var sqlValue=[req.body['username'], req.body['password']]; //query parameters

    connection.query(sql,sqlValue,function(err){ //do the query in database and return the result
        if(err){
            console.log(err.message);
            return res.end("F");
        }
        else if(!err)
        {
            return res.end("S");
        }
    });
});

/*retrieve admin account by admin*/

app.post("/admin_admin_r",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="select * from admin;"; //mysql query

    connection.query(sql,function(err,result){ //do the query in database and return the result
        if(err){
            console.log(err.message);
            return res.end("F");
        }
        else if(!err)
        {
            res.send(result);
            //return res.end("S");
        }
    });
});

/*retrieve chat by admin*/

app.post("/admin_chat_r",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql;
    if(req.body['board']=='walkthrough')
        sql="select * from chat1;"; //mysql query
    else if (req.body['board']=='experience')
        sql="select * from chat2;"; //mysql query
    else if (req.body['board']='question')
        sql ="select * from chat3;"; //mysql query
    

    connection.query(sql,function(err,result){ //do the query in database and return the result
        if(err){
            console.log(err.message);
            return res.end("F");
        }
        else if(!err)
        {
            res.send(result);
            //return res.end("S");
        }
    });
});

/*delete chat by admin*/

app.post("/admin_chat_d",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    var sql;
    if(req.body['board']=='walkthrough')
        sql ="delete from chat1;"; //mysql query
    else if (req.body['board']=='experience')
        sql ="delete from chat2;"; //mysql query
    else if (req.body['board']='question')
        sql ="delete from chat3;"; //mysql query
    
    connection.query(sql,function(err){
        if(err){
            console.log(err.message);
            return res.end("F");
        }
        else if(!err)
        {
            return res.end("S");
        }
    });
    
    if(req.body['board']=='walkthrough')
        fs.writeFile("./main_page/comments1.txt", "", function(){console.log("success");}); //write into txt file
    else if (req.body['board']=='experience')
        fs.writeFile("./main_page/comments2.txt", "", function(){console.log("success");});
    else if (req.body['board']='question')
        fs.writeFile("./main_page/comments3.txt", "", function(){console.log("success");});
    
});

/*retrieve game save by admin*/

app.post("/admin_save_r",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="select * from savefile;"; //mysql query

    connection.query(sql,function(err,result){ //do the query in database and return the result
        if(err){
            console.log(err.message);
            return res.end("F");
        }
        else if(!err)
        {
            res.send(result);
            //return res.end("S");
        }
    });
});

/*update game save by admin*/

app.post("/admin_save_u",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="update savefile set physical=?, mental=?, money=?, academic=?, round=? where UID=?"; //mysql query
    var sqlValue=[req.body['physical'], req.body['mental'], req.body['money'], req.body['academic'],req.body['round'],req.body['UID']]; //query parameters

    connection.query(sql,sqlValue,function(err, result){ //do the query in database and return the result
        if(err){
            console.log("error!");
            console.log(err.message);
            return res.end("E");
        }
        else if(!err)
        {
            if(result.affectedRows == 1)
                return res.end("S");
            else
                return res.end("F");
        }
    });
    
});

/*delete record by admin*/

app.post("/admin_record_d",function(req,res){

    var connection=mysql.createConnection({ // connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    var sql = "delete from record;"; //mysql query
    
    connection.query(sql,function(err){ //do the query in database and return the result
        if(err){
            console.log(err.message);
            return res.end("F");
        }
        else if(!err)
        {
            return res.end("S");
        }
    });
    
});

app.post("/main_page/index.html",function(req,res){ //send back /main_page/index.html
    res.header("Content-Type", "text/html;charset=utf-8");
    res.sendFile(__dirname + '/main_page/index.html');
});

app.get("/sign_in/index.html",function(req,res){ //send back /sign_in/index.html
    res.sendFile(__dirname + '/sign_in/index.html');
});

app.get("/sign_up/index.html",function(req,res){ //send back /sign_up/index.html
    res.sendFile(__dirname + '/sign_up/index.html');
});

app.post("/admin/admin.html", function (req, res) { //send back /admin/admin.html
    res.header("Content-Type", "text/html;charset=utf-8");
    res.sendFile(__dirname + '/admin/admin.html');
});

app.post("/main_page/comments1.txt",function(req,res){ //send back /main_page/comments1.txt
    fs.writeFile("./main_page/comments1.txt", req.body.data, function(){console.log("success");});
});
app.post("/main_page/comments2.txt",function(req,res){ //send back /main_page/comments2.txt
    fs.writeFile("./main_page/comments2.txt", req.body.data, function(){console.log("success");});
});
app.post("/main_page/comments3.txt",function(req,res){ //send back /main_page/comments3.txt
    fs.writeFile("./main_page/comments3.txt", req.body.data, function(){console.log("success");});
});

app.post("/main_page/commentsupload1", function(req,res){ //update chat1
    console.log("Receive Success");
    var connection=mysql.createConnection({ //connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="insert into chat1(username,comment,subject,time) values(?,?,?,?);"; //query
    var sqlValue=[req.body['username'], req.body['comment'],req.body['subject'],req.body['time']]; //parameter
    connection.query(sql,sqlValue,function(err){ //do the query in database and return the result
        if(err){
            console.log(err.message);
            return res.end("F");
        }
        else if(!err)
        {
            return res.end("S");
        }
    });
});

app.post("/main_page/commentsupload2", function(req,res){ //update chat2
    console.log("Receive Success");
    var connection=mysql.createConnection({ //connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="insert into chat2(username,comment,subject,time) values(?,?,?,?);"; //query
    var sqlValue=[req.body['username'], req.body['comment'],req.body['subject'],req.body['time']]; //parameter
    connection.query(sql,sqlValue,function(err){ //do the query in database and return the result
        if(err){
            console.log(err.message);
            return res.end("F");
        }
        else if(!err)
        {
            return res.end("S");
        }
    });
});

app.post("/main_page/commentsupload3", function(req,res){ //update chat3
    console.log("Receive Success");
    var connection=mysql.createConnection({ //connect to the database
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="insert into chat3(username,comment,subject,time) values(?,?,?,?);"; //query
    var sqlValue=[req.body['username'], req.body['comment'],req.body['subject'],req.body['time']]; //parameter
    connection.query(sql,sqlValue,function(err){ //do the query in database and return the result
        if(err){
            console.log(err.message);
            return res.end("F");
        }
        else if(!err)
        {
            return res.end("S");
        }
    });
});

app.get('/main_page/readmemd',urlencodedParser,function(req,res){
    console.log("Readme.md has been required");
    var data = fs.readFileSync('main_page/pages/documentation/README.md','utf-8');
    res.end(JSON.stringify({
        body: marked(data)
    }));
});

app.post("/main_page/savefile", function (req, res) {// respond to the request of uploading game saves
    var connection = mysql.createConnection({ //connect to the database
        host: "localhost",
        user: "root",
        password: "password",
        database: "CSCI3100"
    });

    connection.connect();

    var sql = "replace into savefile(UID, physical, mental, money, academic, round) values(?,?,?,?,?,?);";// the db schema
    var sqlValue = [req.body['UID'], req.body['physical'], req.body['mental'], req.body['money'], req.body['academic'], req.body['round']]; //parameter
    connection.query(sql, sqlValue, function (err) { //do the query in database and return the result
        if (err) {
            console.log(err.message);
            return res.end("F");
        }
        else if (!err) {
            return res.end("S");
        }
    });
});

app.post("/main_page/loadfile", function (req, res) {// respond to the request of uploading game saves
    var connection = mysql.createConnection({ //connect to the database
        host: "localhost",
        user: "root",
        password: "password",
        database: "CSCI3100"
    });

    connection.connect();

    var sql = "select * from savefile where UID = ?;";// the db schema
    var sqlValue = [req.body['UID']];
    connection.query(sql,sqlValue,function (err, result) { //do the query in database and return the result
        if (err) {
            console.log(err.message);
            //return res.end("F");
        }
        else if (!err) {
            //return res.end("S");
            res.send(result);
        }
    });
});

app.post("/main_page/record", function (req, res) {
    var connection = mysql.createConnection({ //connect to the database
        host: "localhost",
        user: "root",
        password: "password",
        database: "CSCI3100"
    });

    connection.connect();

    var sql = "replace into record(UID, round) values(?,?);";// the db schema
    var sqlValue = [req.body['UID'], req.body['round']];
    connection.query(sql, sqlValue, function (err) { //do the query in database and return the result
        if (err) {
            console.log(err.message);
            return res.end("F");
        }
        else if (!err) {
            //console.log(sqlValue);
            return res.end("S");
        }
    });
});

app.get("/main_page/checkrecord", function (req, res) {// respond to the request of uploading game saves
    var connection = mysql.createConnection({ //connect to the database
        host: "localhost",
        user: "root",
        password: "password",
        database: "CSCI3100"
    });

    connection.connect();

    var sql = "select * from record order by round desc;";// the db schema
    //var sqlValue = [req.body['UID'], req.body['physical'], req.body['mental'], req.body['money'], req.body['academic'], req.body['round']];
    connection.query(sql, function (err, result) { //do the query in database and return the result
        if (err) {
            console.log(err.message);
            //return res.end("F");
        }
        else if (!err) {
            //return res.end("S");
            res.send(result);
        }
    });
});
app.listen(8081);
