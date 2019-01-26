export{}
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: `tmp/`});
const router = express.Router();
const userService = require('./user.service');

module.exports = function(dbPrefix: string, dbNames: string){
    router.get("/users", getUsers);
    router.get("/posts", getPosts);
    router.post("/upload/:userId", upload.single('avatar'), changeAvatar);

    function getUsers(req: object, res: any){
        userService.getUsers(dbNames)
            .then((users: object[]) : void => res.json(users));
    }

    function getPosts(req: object, res: any){
        userService.getPosts(dbPrefix, dbNames)
            .then((users: object[]) : void => res.json(users));
    }

    function changeAvatar(req: any, res: any){
        userService.changeAvatar(dbPrefix, dbNames, req.file, req.params.userId)
            .then(() : void => res.json({"message": "Successful"}))
            .catch((err: any) : void => res.status(400).json(err.message));
    }
    return router;
};