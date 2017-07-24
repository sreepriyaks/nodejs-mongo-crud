const express = require('express');
const app = express();
const url = require('url');
const {connectDB, insertData, getData, updateData, deleteData} = require('./mongoUtil').mongoUtil;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB((err, dbRes)=>{
    if(err) return console.log(err);
    console.log(dbRes);
});

app.get('/getUser', (req, res)=>{
    res.write('Got a GET!');
    var queryString = url.parse(req.url).query;
    
    getData(queryString,(err, dbRes)=>{
        if(err) return console.log(err);
        console.log(dbRes);
    });    

    res.end();
    
});

app.post('/insertUser', (req, res)=>{
    res.write('Got a POST!');
    insertData(req.body, (err, dbRes)=>{
        if(err) return console.log(err);
        console.log(dbRes);
    });

    res.end();
});

app.put('/updateUser',(req, res)=>{
    res.write('Got a PUT!');
    let id = req.body.id;
    let newName = req.body.newName;
    updateData(id, newName, (err, dbRes)=>{
        if(err) return console.log(err);
        console.log(dbRes);
    });

    res.end();
});

app.delete('/deleteUser', (req, res)=>{
    res.write('Got a DELETE!');
    let id = req.body.id;
    deleteData(id, (err, dbRes)=>{
        if(err) return console.log(err);
        console.log(dbRes);
    });

    res.end();
});

app.listen(3001, ()=>{
    console.log('http server up on port 3001!');
})