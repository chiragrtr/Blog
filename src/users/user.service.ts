export {};
const db = require('../db/db');
const fs = require('fs');
const asyncForEach = require('../util/util');
const User = db.User;

module.exports = {
    getUsers,
    getPosts,
    changeAvatar
};

async function getUsers(dbNames: string){
    const users: object[] = [];
    await asyncForEach(dbNames, async dbName => {
        const userArr: object[] = await db.get(dbName, "users", {});
        users.push(userArr[0]);
    });
    return users;
}

async function getPosts(dbPrefix: string, dbNames: string){
    const users: object[] = [];
    await asyncForEach(dbNames, async dbName => {
       const user: object = {
           userId: Number(dbName.split(dbPrefix)[1]),
           posts: await db.get(dbName, "posts", {})
       };
       users.push(user);
    });
    return users;
}

async function changeAvatar(dbPrefix: string, dbNames: string, file: any, userId: string){
    const dbName: string = dbPrefix + userId;
    if(!dbNames.includes(dbName)){
        throw new Error("User not found");
    }
    const path: string = file && file.path;
    if(!path){
        throw new Error("File must be sent");
    }
    const avatar: object = {
        image: fs.readFileSync(path),
        contentType: "image/png"
    };
    return await db.update(dbName, "users", {avatar});

}