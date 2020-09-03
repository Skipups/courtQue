var express = require("express");
const { PRIORITY_LOW } = require("constants");
const { rawListeners } = require("process");
var app = express();
var bodyParser = require('body-parser');

const db = require("./models");
const User = db.Users;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const cors = require('cors')

// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.use(cors())
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

    const userInfo = await User.findOne({
        where: {
            [Op.and]: [
                Sequelize.literal('"Users"."userId"::varchar = \'' + userId + '\''),
                Sequelize.literal('"Users"."token"::varchar = \'' + token + '\'')
            ]
        }
    });

    if (isEmpty(userInfo))
    {
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

    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    console.log(req.res);
    console.log(req.route);

    if (!FieldHasValue('name', req.body)
        || !FieldHasValue('phoneNumber', req.body)
    )
    {
        return res.send(req.body);
    }

    const newUser = User.build({
        name: req.body.hasOwnProperty('name') ? req.body.name : '',
        phoneNumber: req.body.hasOwnProperty('phoneNumber') ? req.body.phoneNumber : ''
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

const listenPort = process.env.PORT || 3000;
app.listen(listenPort, () => {
 console.log("Server running on port " + listenPort);
});