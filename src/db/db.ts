const MongoClient = require('mongodb').MongoClient;
const config = require('../../configurations.json');
const connectionString = process.env.CONNECTION_STRING || config.connectionString;
const dbPort = process.env.DB_PORT || config.dbPort;
const url = connectionString + dbPort;

module.exports = {
    dropCollection: async (dbName: string, collectionName: string) =>{
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, { useNewUrlParser: true }, (err: object, db: any) => {
                if (err){
                    reject(err);
                }
                const dbo = db.db(dbName);
                dbo.collection(collectionName).drop().then(() => {
                    db.close();
                    resolve(true);
                }).catch(e => resolve(e));
            });
        });
    },
    save: async function(dbName: string, collectionName: string, data: object[]){
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, { useNewUrlParser: true }, (err: object, db: any) => {
                if(err){
                    reject(err);
                }
                const dbo = db.db(dbName);
                dbo.collection(collectionName).insertMany(data, (err: object, res: object) => {
                    if (err){
                        reject(err);
                    }
                    db.close();
                    resolve(res);
                });
            });
        });
    },
    get: async function(dbName: string, collectionName: string, findKeywords: object){
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, { useNewUrlParser: true }, (err: object, db: any) => {
                if(err){
                    reject(err);
                }
                const dbo: any = db.db(dbName);
                dbo.collection(collectionName).find(findKeywords).project({_id:0, avatar:0}).toArray((err: object, result: object) => {
                    if(err){
                        throw err;
                    }
                    db.close();
                    resolve(result);
                });
            });
        });
    },
    update: async function(dbName: string, collectionName: string, data: object){
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, { useNewUrlParser: true }, (err: object, db: any) => {
                if(err){
                    reject(err);
                }
                const dbo: any = db.db(dbName);
                dbo.collection(collectionName).updateOne({}, {$set: data}, (err: object, result: object) => {
                    if(err){
                        throw err;
                    }
                    db.close();
                    resolve(result);
                });
            });
        });
    }
};