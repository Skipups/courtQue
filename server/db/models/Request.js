// class Request {
//     constructor(requestId, userID, needDoubles, startTime, status) {

//     }


//status not done

const { Sequelize,  Model } = require('sequelize');

//userID will be added
class Request extends Model{}

Request.init({
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        
    },
    needDoubles:{
        type:Sequelize.BOOLEAN,
       allowNull:false
    },
   requestCreatedTime:{
    type: Sequelize.DATE, defaultValue: Sequelize.NOW
   },
   status:{
type:Sequelize.ENUM,
values:['pending', '']
   }
    }
)