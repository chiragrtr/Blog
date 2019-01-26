const request = require('request-promise');

const reqURL = "https://jsonplaceholder.typicode.com/";
const usersURL = "users";
const postsURL = "posts";
const commentsURL = "comments";

module.exports = {
    call: () => request(req)
        .then(parseUsers)
        .then(parsePosts)
        .then(parseCommentsAndMap)
        .catch(errorHandler)
};

interface RequestObject {
    uri: string,
    method: string,
    headers: object
}

const req: RequestObject = {
    uri: reqURL + usersURL,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

interface ObjectHavingId{
    id: number;
}

let users: ObjectHavingId[], postsArr: ObjectHavingId[];

interface ErrorObject {
    message: string
}

const parseUsers = (response: string) => {
    users = JSON.parse(response);                               // Handle parse exceptions
    if (users.length) {
        req.uri = reqURL + postsURL;
        return request(req);
    } else {
        throw new Error(`ERROR: No users are present on the URL: ${req.uri}`);
    }
};

const parsePosts = (posts: string) => {
    postsArr = posts ? JSON.parse(posts) : [];
    if(postsArr.length){
        req.uri = reqURL + commentsURL;
        return request(req);
    }
};

const parseCommentsAndMap = (comments: any) => {
    comments = comments ? JSON.parse(comments) : [];
    map(postsArr, comments, "postId");
    map(users, postsArr, "userId");
    return users;
};

const errorHandler = (error: ErrorObject) => {
    console.error(error.message);
};

function map(arrayToMapTo: ObjectHavingId[], arrayHavingTheKey: object[], key: string) : void {
    if(arrayToMapTo.length && arrayHavingTheKey.length){
        arrayToMapTo.forEach((obj: ObjectHavingId) => {
            const propertiesValArray = arrayHavingTheKey.filter((property: object) => property[key] === obj.id).map((property: object) => {
                delete property[key];
                return property;
            });
            if(propertiesValArray.length){
                const propertyName: string = key === "postId" ? "comments" : "posts";
                obj[propertyName] = propertiesValArray;
            }
        });
    }
}