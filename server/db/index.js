//need db
const {Court}= require("./models/court")
const {Queue}= require("./models/queue")
const {Request}= require("./models/Request")
const {User}= require('./models/user')

//associations


//user and request, Request table will have userId as foreign key
User.hasOne(Request)
Request.belongsTo(User)

//court and request, Request table will have courtId as foreign key
Court.hasMany(Request)
Request.belongsTo(Court)









