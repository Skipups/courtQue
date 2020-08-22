var express = require("express");
const { PRIORITY_LOW } = require("constants");
const { rawListeners } = require("process");
var app = express();
var bodyParser = require('body-parser');

const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'courtque',
    host: 'localhost',
    database: 'courtque',
    password: 'courtque',
    port: 5432,
  })

app.use(bodyParser.urlencoded({extended:true}));

app.get("/users/:id", async (req, res, next) => {
    if (!('authorization' in req.headers)) {
      return res.sendStatus(401);
    }

    let token = req.headers['authorization'];
    token = token.split(' ')[1];
    let userId = req.params.id;
    
    console.debug("url   : "+req.url);
    console.debug('token : '+token);

    let userInfo = {};

    let isValid = false;
    const client = await pool.connect()
    try {
        const res = await client.query("SELECT name, phoneNumber from users where userid = $1 and token = $2", [req.params.id, token])
        
        isValid = res.rows.length > 0;

        if (isValid) {
            // initialize userInfo object
            userInfo = {
                'id': req.params.id,
                'name': res.rows[0].name,
                'phoneNumber': res.rows[0].phonenumber
            };
        }    
    } finally {
        client.release();    
    }

    if (!isValid) {
        return res.sendStatus(401);
    }

    //return userInfo
    res.json(userInfo);
   });

app.post("/users", async (req, res, next) => {
    console.debug("url   : "+req.url);

    if (!FieldHasValue('name', req.body)
        || !FieldHasValue('phoneNumber', req.body)
    )
    {
        return res.sendStatus(400);
    }

    let newUser = {
        'name': req.body.hasOwnProperty('name') ? req.body.name : '',
        'phoneNumber': req.body.hasOwnProperty('phoneNumber') ? req.body.phoneNumber : ''
    };

    let userRegistrationInfo = {};

    const client = await pool.connect()
    try {
        const res = await client.query("insert into users (name, phoneNumber) values ($1, $2) returning userid, token", [newUser.name, newUser.phoneNumber])

        userRegistrationInfo = {
            'id': res.rows[0].userid,
            'token': res.rows[0].token
        };
        
    } finally {
        client.release();    
    }

    res.json(userRegistrationInfo);
   });


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

app.listen(3000, () => {
 console.log("Server running on port 3000");
});