export {};
const express = require('express');
const usersController = require('./users/users.controller');
const apiCaller = require('./util/apiCaller');
const db = require('./db/db');
const asyncForEach = require('./util/util');

const DB_PREFIX: string = "User-";
const DB_NAMES: string[] = [];

console.log("Starting up...");

apiCaller.call()
    .then(async (users: User[]) => {
        await asyncForEach(users, saveDataToDB);
        startExpressServer();
    });

interface User {
    id: number,
    posts: object[]
}

async function saveDataToDB (user: User) : Promise<any> {
        const posts: object[] = user.posts;
        delete user.posts;
        const dbName: string = DB_PREFIX + user.id;
        await db.dropCollection(dbName, "users");
        await db.dropCollection(dbName, "posts");
        DB_NAMES.push(dbName);
        await db.save(dbName, "users", [user]);
        await db.save(dbName, "posts", posts);
}

function startExpressServer () : void {
    const app: any = express();
    app.use("/", usersController(DB_PREFIX, DB_NAMES));

    const port: number = Number(process.env.PORT) || 8989;
    const server: object = app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}