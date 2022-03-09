const express =require('express')
const router = express.Router();
let db =require('../DB/dabase')
let mysql = require('mysql');
let db =mysql.createConnection({
    host:'localhost' ,
    user :'root',
    password:'',
    database:"bd_user"
})



//verification de la connexion a a la base de donnee
db.connect(function (err) {
    if (err) {
      console.log(err);
      res.render('une erreur est survenue')
    } else {
      console.log("Connected!");
     }
    
  });

module.exports =router;