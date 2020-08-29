//  Court {
//     constructor(courtID, requestID, isDoubles, status) {

//     }
// }


const { Sequelize,  Model } = require('sequelize');

//requestID will be added
class Court extends Model{}

Court.init({
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        validate:{
            min:1,
            max:3
        }
    },
    isDoubles:{
        type:Sequelize.BOOLEAN,
       allowNull:false
    },
    isOpen:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
})

