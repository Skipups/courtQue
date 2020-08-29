// class User {
//     constructor(id, phoneNumber, name) {
        
//     }
// }

const { Sequelize,  Model } = require('sequelize');

class User extends Model{}

User.init({
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
       
    },
   phoneNumber:{
        type:Sequelize.INTEGER,
       allowNull:false
    },
    name:{
        type:Sequelize.STRING,
       allowNull:false
    }
})