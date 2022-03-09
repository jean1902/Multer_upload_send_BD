const express =require('express')
const mysql =require('mysql');
const router = express.Router();

let db =mysql.createConnection({
    host:'localhost' ,
    user :'root',
    password:'',
    database:"bd_user"
})



//verification de la connexion a a la base de donnee
db.connect(function ( req,res,err) {
    if (err) {
      console.log(err);
      res.render('une erreur est survenue')
    } else {
      console.log("Connected!");
     }
    //encore une fois tous est reussit
  });

module.exports =db;