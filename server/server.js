var express = require("express");
const { PRIORITY_LOW } = require("constants");
const { rawListeners } = require("process");
var app = express();
var bodyParser = require('body-parser');
var admin = require("firebase-admin");
    

const db = require("./models");
const User = db.Users;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');

app.use(bodyParser.urlencoded({extended:true}));

app.get("/users/:id", async (req, res, next) => {
    if (!('authorization' in req.headers)) {
      return res.sendStatus(401);
    }

    let token = req.headers['authorization'];
    token = token.split(' ')[1];
    let userId = req.params.id;
    
    console.debug("url   : "+req.url);
    console.debug('userId : '+userId);
    console.debug('token : '+token);

    const userInfo = await GetAuthenticatedUserInfo(userId, token);

    if (isEmpty(userInfo)) {
        return res.sendStatus(401);
    }

    //return userInfo
    return res.json(userInfo);
   });

app.get("/users", async (req, res, next) => {
    console.debug("url   : "+req.url);

    const users = await User.findAll();

    return res.json(users);
});


app.post("/users", async (req, res, next) => {
    console.debug("url   : "+req.url);

    if (!FieldHasValue('name', req.body)
        || !FieldHasValue('phoneNumber', req.body)
        || !FieldHasValue('verificationId', req.body)
        )
    {
        return res.sendStatus(400);
    }

    const userInfo = await User.findOne({
        where: {
            [Op.and]: [
                Sequelize.literal('"Users"."phoneNumber"::varchar = \'' + req.body.phoneNumber + '\''),
                Sequelize.literal('"Users"."verified" = true')
            ]
        }
    });

    if (!isEmpty(userInfo)) {
        return res.sendStatus(422);
    }

    const newUser = User.build({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        token: req.body.verificationId
    });

    await newUser.save();

    res.json(newUser);
   });

function isEmpty(obj) {
    for (var key in obj){
        if (obj.hasOwnProperty(key))
        {
            return false;
        }
    }

    return true;
}

function FieldHasValue(fieldName, fields) {
    console.debug('FieldHasValue - ' + fieldName);
    console.debug(' hasOwnProperty - ' + (fields.hasOwnProperty(fieldName) ? 'Y' : 'N'));
    if (fields.hasOwnProperty(fieldName)) {
        console.debug(' IsNullOrWhiteSpace - ' + IsNullOrWhiteSpace(fields[fieldName]) ? 'Y' : 'N');
    }

    return fields.hasOwnProperty(fieldName) && !IsNullOrWhiteSpace(fields[fieldName]);
}

function IsNullOrWhiteSpace(text) {
    return text === null || text.match(/^\s*$/) !== null;
}

async function GetAuthenticatedUserInfo(userId, token) {
    const userInfo = await User.findOne({
        where: {
            [Op.and]: [
                Sequelize.literal('"Users"."userId"::varchar = \'' + userId + '\''),
                Sequelize.literal('"Users"."token"::varchar = \'' + token + '\'')
            ]
        }
    });

    if (!isEmpty(userInfo) && !userInfo.verified) {
        console.log("user("+userInfo.userId+") : check against firebase!");

        var serviceAccount = JSON.parse(process.env.FIREBASE_SECRET);
        
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://nycc-courtque.firebaseio.com"
        });
        
        // idToken comes from the client app
        await admin.auth().verifyIdToken(token)
            .then(async function(decodedToken) {
                let uid = decodedToken.uid;
                //res.send({ uid })
                
                //update database
                userInfo.verified = true;
                await userInfo.save();
                
                //res.sendStatus(200);
             // ...
            }).catch(function(error) {
                // Handle error
                console.log(error)
                //res.send("Error!")
                //return res.sendStatus(404);
            });
    
    } else {
        console.log("user("+userInfo.userId+") : verified!");
    }

    return userInfo;
} 


const listenPort = process.env.PORT || 3000;
app.listen(listenPort, () => {
 console.log("Server running on port " + listenPort);
});