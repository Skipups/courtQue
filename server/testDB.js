// const sequelize = require('sequelize')

const db = require('./models')

async function test(){
    const me = await db.User.create({name:"Donovan",phoneNumber:"6315554914"});
    // const me = await db.User.findAll();
    console.log(me.toJSON());
    const type = await db.Type.create({typeName:"the type"},{include:[db.Request]})
    console.log(type.toJSON())
    const req = await db.Request.create({UserId:1,TypeId:1})
    
    // const theCourt = await db.Court.create({court_name:"Hudson-1"},{include:[ db.Type ]});
    // const theCourt = await db.Court.find({},{include:[db.Type]})
    // console.log(theCourt.toJSON());
    // console.log(theCourt.types);
    // me.destroy()
    // theCourt.destroy()

}


test()