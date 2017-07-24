const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/session1db";
let collectionName = "testCollection";
let dbInstance;

let connectDB = (cb)=>{
    MongoClient.connect(url, (err, db)=>{
        if(err) return cb(err, 'Error');
        console.log('DB connected!');
        dbInstance = db;
        cb(null, 'DB Connected!');
    });
};

let insertDB = (data)=>{
    db.collection.insertOne(data,(err)=>{
        if(err) console.log(err);
    });
};

let getData = (data, cb)=>{
    let queryData = data.split('&');
    let userName = queryData[0].split('=')[1];
    let Id = queryData[1].split('=')[1];
    let query = '{"name" : "'+userName+'", "id" : "'+Id+'"}';
    query = JSON.parse(query);

    let dbCollection = dbInstance.collection(collectionName);
    dbCollection.find(query).toArray((err, res)=>{
        if(err) return cb(err, 'Error');
        cb(null, res);
    });

    // MongoClient.connect(url, (err, db)=>{
    //     if(err) return console.log(err);
    //     console.log('DB connected!');
    //     let dbCollection = db.collection(collectionName);    
    //     dbCollection.find(query).toArray((err, res)=>{
    //         if(err) return cb(err, 'Error');
    //         db.close();
    //         cb(null, res);
    //     });
    // });    
};

let insertData = (data, cb)=>{
    let dbCollection = dbInstance.collection(collectionName);    
        dbCollection.insert(data,(err, res)=>{
            if(err) return cb(err, 'Error');
            cb(null, res);
        });

    // MongoClient.connect(url,(err, db)=>{
    //     if(err) return console.log(err);
    //     console.log('DB connected!');
    //     let dbCollection = db.collection(collectionName);    
    //     dbCollection.insert(data,(err, res)=>{
    //         if(err) return cb(err, 'Error');
    //         db.close();
    //         cb(null, res);
    //     });
    // });
};

let updateData = (id, name, cb)=>{
    let dbCollection = dbInstance.collection(collectionName);
        let selector = '{"id" : "'+id+'"}';
        selector = JSON.parse(selector);
        let newValue = '{"name" : "'+name+'", "id" : "'+id+'"}';
        newValue = JSON.parse(newValue);
        let multi = JSON.parse('{"multi" : "true"}');
        dbCollection.update(selector,newValue,multi, (err, res)=>{
            if(err) return cb(err, 'Error');
            cb(null, res);
        });

    // MongoClient.connect(url,(err, db)=>{
    //     if(err) return console.log(err);
    //     console.log('DB connected!');
    //     let dbCollection = db.collection(collectionName);
    //     let selector = '{"id" : "'+id+'"}';
    //     selector = JSON.parse(selector);
    //     let newValue = '{"name" : "'+name+'", "id" : "'+id+'"}';
    //     newValue = JSON.parse(newValue);
    //     let multi = JSON.parse('{"multi" : "true"}');
    //     dbCollection.update(selector,newValue,multi, (err, res)=>{
    //         if(err) return cb(err, 'Error');
    //         db.close();
    //         cb(null, res);
    //     });
    // });
};

let deleteData = (id, cb) => {
    let dbCollection = dbInstance.collection(collectionName);
        let selector = '{"id" : "'+id+'"}';
        selector = JSON.parse(selector);
        dbCollection.deleteMany(selector, (err, res)=>{
            if(err) return cb(err, 'Error');
            cb(null, res);
        }); 

    // MongoClient.connect(url, (err, db)=>{
    //     if(err) return console.log(err);
    //     console.log('DB connected!');
    //     let dbCollection = db.collection(collectionName);
    //     let selector = '{"id" : "'+id+'"}';
    //     selector = JSON.parse(selector);
    //     dbCollection.deleteMany(selector, (err, res)=>{
    //         if(err) return cb(err, 'Error');
    //         db.close();
    //         cb(null, res);
    //     }); 
    // });
};

module.exports.mongoUtil = {
    connectDB,
    insertData,
    getData,
    updateData,
    deleteData
};