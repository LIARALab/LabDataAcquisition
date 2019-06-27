const express  = require('express')
const bodyParser  = require('body-parser')
var cors = require('cors');
var mongo =require('mongodb')
const MongoClient  = require('mongodb').MongoClient
const app = express()

const config = require('./config.json')


var db
// app.use(cors({
//     "origin":"*",
//     "methods":"GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue":true,
//     "optionsSuccessStatus":204
//     }
// ));
app.use(cors());
// app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser());

const options = {
    host: process.env.MONGO_HOST || config.mongo.host,
    port: process.env.MONGO_PORT || config.mongo.port,
    database: config.mongo.db,
    connectOptions: {
      user: config.mongo.username,
      pass: config.mongo.password,
    },
};

var url = 'mongodb://' + config.mongo.host + ':' + config.mongo.port;

console.log("work1")
MongoClient.connect(url,(err,client)=>{
    if(err) return console.log(err)
    db = client.db(config.mongo.db)

    app.listen(3000, function(){
        console.log("work2")
    })
})

//////////action websocket
app.get('/websocket', function(req,res){

    var cursor = db.collection('websocket').find().toArray(function(err, results){
        if(err) {
            res.status(500).end();
            return console.log(err);
        }


        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.end(JSON.stringify(results));
    })
})

app.post('/websocket', function(req,res){
    let item = {
        name: req.body.name,
        uri: req.body.uri,
        type: req.body.type
    };


    db.collection('websocket').insertOne(item, function (err) {
        if(err) {
            res.status(500).end();
            return console.log(err);
        }
        console.log('insert!!!')
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.end(JSON.stringify(item));
    })
})

app.delete('/websocket/:id', function(req,res){
    var id= req.params.id;
    console.log(id);
    db.collection('websocket').deleteOne({"_id":mongo.ObjectID(id)},(err, result) =>{
        if(err) {
            res.status(500).end();
            return console.log(err);
        }


        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.end(JSON.stringify(result)) // Renvoyer l'objet de la BDD
    })

})



///////////action activité
app.get('/activities', function(req,res){
    var cursor = db.collection('activity').find().toArray(function(err, results){
        if(err) {
            res.status(500).end();
			return console.log(err);
        }


		res.setHeader('Content-Type', 'application/json');
		res.status(200);
		res.end(JSON.stringify(results));
    })
})

app.post('/activities', function(req,res){
    var item = {
        name: req.body.name,
        subActivity: req.body.subActivity
    };

    db.collection('activity').insertOne(item, function (err) {
        if(err) {
            res.status(500).end();
            return console.log(err);
        }
        console.log('insert!!!')
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.end(JSON.stringify(item));
    })
})

app.delete('/activities/:id', function(req,res){
    var id= req.params.id;
    console.log(id);
    db.collection('activity').deleteOne({"_id":mongo.ObjectID(id)},(err, result) =>{
        if(err) {
            res.status(500).end();
            return console.log(err);
        }


        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.end(JSON.stringify(result)) // Renvoyer l'objet de la BDD
    })

})

app.put('/activities/:id', function(req,res){
    var id= req.params.id;
    console.log(id);
    db.collection('activity').updateOne({"_id":mongo.ObjectID(id)},{$set:{"name":req.body.name,"subActivity":req.body.subActivity}},{upsert:true},(err, result) =>{
        if(err) {
            res.status(500).end();
            return console.log(err);
        }
        res.status(202).end();


        /*res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.end(JSON.stringify(result))*/ // Renvoyer l'objet de la BDD
    })

})