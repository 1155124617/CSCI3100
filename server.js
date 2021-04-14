
var express=require("express");
var events = require('events');
var emitter = new events.EventEmitter();
var app=express();
var path=require("path");
var mysql=require("mysql");
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

app.post("/reg",function(req,res){

    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="insert into user(username,password) values(?,?);";
    var sqlValue=[req.body['username'], req.body['password']];

    connection.query(sql,sqlValue,function(err){
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

app.post("/log",function(req,res){

    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    var sql="select * from user where username=? and password=?;";
    var sqlValue=[req.body['username'], req.body['password']];
    
    connection.query(sql,sqlValue,function(err,result){
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

app.post("/admin_log",function(req,res){

    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    var sql="select * from admin where username=? and password=?;";
    var sqlValue=[req.body['username'], req.body['password']];
    
    connection.query(sql,sqlValue,function(err,result){
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

app.post("/admin_user_c",function(req,res){

    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="insert into user(username,password) values(?,?);";
    var sqlValue=[req.body['username'], req.body['password']];

    connection.query(sql,sqlValue,function(err){
        if(err){
            console.log(err.message);
            return res.end("F");
        }

    });
    
    var sql2="insert into savefile(UID, physical, mental, money, academic, round) values(?, 50, 50, 50, 50, 0);";
    var sqlValue2=[req.body['username']];
    
    connection.query(sql2,sqlValue2,function(err){
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

app.post("/admin_user_r",function(req,res){

    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="select * from user;";

    connection.query(sql,function(err,result){
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

app.post("/admin_user_d",function(req,res){

    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="delete from user where username=?;";
    var sqlValue=[req.body['username']];

    connection.query(sql,sqlValue,function(err, result){
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
    
    var sql2="delete from savefile where UID=?;";
    var sqlValue2=[req.body['username']];

    connection.query(sql2,sqlValue2,function(err, result){
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

app.post("/admin_user_u",function(req,res){

    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="update user set username=?, password=? where username=?";
    var sqlValue=[req.body['n_username'], req.body['n_password'], req.body['o_username']];

    connection.query(sql,sqlValue,function(err, result){
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
    
    var sql2="update savefile set UID=? where UID=?";
    var sqlValue2=[req.body['n_username'], req.body['o_username']];

    connection.query(sql2,sqlValue2,function(err, result){
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

app.post("/admin_admin_c",function(req,res){

    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="insert into admin(username,password) values(?,?);";
    var sqlValue=[req.body['username'], req.body['password']];

    connection.query(sql,sqlValue,function(err){
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

app.post("/admin_admin_r",function(req,res){

    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="select * from admin;";

    connection.query(sql,function(err,result){
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

app.post("/admin_chat_r",function(req,res){

    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql;
    if(req.body['board']=='walkthrough')
        sql="select * from chat1;";
    else if (req.body['board']=='experience')
        sql="select * from chat2;";
    else if (req.body['board']='question')
        sql ="select * from chat3;";
    

    connection.query(sql,function(err,result){
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

app.post("/admin_chat_d",function(req,res){

    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    var sql;
    if(req.body['board']=='walkthrough')
        sql ="delete from chat1;";
    else if (req.body['board']=='experience')
        sql ="delete from chat2;";
    else if (req.body['board']='question')
        sql ="delete from chat3;";
    
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
        fs.writeFile("./main_page/comments1.txt", "", function(){console.log("success");});
    else if (req.body['board']=='experience')
        fs.writeFile("./main_page/comments2.txt", "", function(){console.log("success");});
    else if (req.body['board']='question')
        fs.writeFile("./main_page/comments3.txt", "", function(){console.log("success");});
    
});

app.post("/admin_save_r",function(req,res){

    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="select * from savefile;";

    connection.query(sql,function(err,result){
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

app.post("/admin_save_u",function(req,res){

    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="update savefile set physical=?, mental=?, money=?, academic=?, round=? where UID=?";
    var sqlValue=[req.body['physical'], req.body['mental'], req.body['money'], req.body['academic'],req.body['round'],req.body['UID']];

    connection.query(sql,sqlValue,function(err, result){
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


app.post("/main_page/index.html",function(req,res){
    res.header("Content-Type", "text/html;charset=utf-8");
    res.sendFile(__dirname + '/main_page/index.html');
});

app.get("/sign_in/index.html",function(req,res){
    res.sendFile(__dirname + '/sign_in/index.html');
});

app.get("/sign_up/index.html",function(req,res){
    res.sendFile(__dirname + '/sign_up/index.html');
});

app.post("/admin/admin.html", function (req, res) {
    res.header("Content-Type", "text/html;charset=utf-8");
    res.sendFile(__dirname + '/admin/admin.html');
});

app.post("/main_page/comments1.txt",function(req,res){
    fs.writeFile("./main_page/comments1.txt", req.body.data, function(){console.log("success");});
});
app.post("/main_page/comments2.txt",function(req,res){
    fs.writeFile("./main_page/comments2.txt", req.body.data, function(){console.log("success");});
});
app.post("/main_page/comments3.txt",function(req,res){
    fs.writeFile("./main_page/comments3.txt", req.body.data, function(){console.log("success");});
});

app.post("/main_page/commentsupload1", function(req,res){
    console.log("Receive Success");
    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="insert into chat1(username,comment,subject,time) values(?,?,?,?);";
    var sqlValue=[req.body['username'], req.body['comment'],req.body['subject'],req.body['time']];
    connection.query(sql,sqlValue,function(err){
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

app.post("/main_page/commentsupload2", function(req,res){
    console.log("Receive Success");
    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="insert into chat2(username,comment,subject,time) values(?,?,?,?);";
    var sqlValue=[req.body['username'], req.body['comment'],req.body['subject'],req.body['time']];
    connection.query(sql,sqlValue,function(err){
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

app.post("/main_page/commentsupload3", function(req,res){
    console.log("Receive Success");
    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"CSCI3100"
    });

    connection.connect();
    
    var sql="insert into chat3(username,comment,subject,time) values(?,?,?,?);";
    var sqlValue=[req.body['username'], req.body['comment'],req.body['subject'],req.body['time']];
    connection.query(sql,sqlValue,function(err){
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
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "CSCI3100"
    });

    connection.connect();

    var sql = "replace into savefile(UID, physical, mental, money, academic, round) values(?,?,?,?,?,?);";// the db schema
    var sqlValue = [req.body['UID'], req.body['physical'], req.body['mental'], req.body['money'], req.body['academic'], req.body['round']];
    connection.query(sql, sqlValue, function (err) {
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
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "CSCI3100"
    });

    connection.connect();

    var sql = "select * from savefile where UID = ?;";// the db schema
    var sqlValue = [req.body['UID']];
    connection.query(sql,sqlValue,function (err, result) {
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
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "CSCI3100"
    });

    connection.connect();

    var sql = "replace into record(UID, round) values(?,?);";// the db schema
    var sqlValue = [req.body['UID'], req.body['round']];
    connection.query(sql, sqlValue, function (err) {
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
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "CSCI3100"
    });

    connection.connect();

    var sql = "select * from record order by round desc;";// the db schema
    //var sqlValue = [req.body['UID'], req.body['physical'], req.body['mental'], req.body['money'], req.body['academic'], req.body['round']];
    connection.query(sql, function (err, result) {
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
