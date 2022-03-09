const express =require('express');
const multer =require('multer');
const mysql =require('mysql');
// const path = require('path')
const database = require("./DB/database")

const app =express();
const Port=1500;


// const upload = multer({storage})


app.use("/public", express.static('public'));
app.set("views", "./views");
app.set("view engine", "ejs");



app.get('/', (req,res)=>{
    res.render('index.ejs')
})



// const limits = {
//     fileSize : 4000000
// }

// //fileFilter function controls which files should be uploaded. req = request being made. file = contains file info. cb = callback function to tell multer when we are done filtering the file. send back an error message to the client with cb.
// const fileFilter =(req, file, cb) => {
//   //if the file is not a jpg, jpeg, or png file, do not upload it multer; reject it.
//   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error('File must be of type JPG, JPEG, or PNG and nore more than 2MB in size'))
//   }
//   //undefined = nothing went wrong; true = that is true, nothing went wrong, accept the upload.
//   cb(undefined, true)
// }

//set up the multer middleware
// const upload = multer({
//     storage: storage,
//     limits: limits,
//     fileFilter: fileFilter
//     // filename: filename
//   })



let storage = multer.diskStorage({

    destination:function(req ,file,cb){
        cb(null, './public')
    },
    filename: function(req ,file ,cb){
        cb(null, Date.now()+file.originalname)
    }
});


let upload= multer({storage:storage});

app.post('/',upload.single('image'),(req,res)=>{

    if(!req.file){
        console.log("pas de fichier uploder")
    }else{
        console.log("voila sa",req.file.filename);

        //host:http://127.0.0.1 ;
        
        var imgsrc = 'localhost:1500/image/' + req.file.filename;

     let insertData = "INSERT INTO `user`(Nom) VALUES (?)";
    database.query(insertData, [imgsrc],(err, result) => {
        if (err) throw err
        console.log("file uploaded")
        res.redirect('/')
    })
      
    }

   
    // res.redirect('/');

    //  let insertData = "INSERT INTO `user`(Nom) VALUES (?)";
    // database.query(insertData, [imgsrc],(err, result) => {
    //     console.log(database)
    //     if (err) throw err
    //     console.log("file uploaded")
    // })

    // let sql = "INSERT INTO  image (name) VALUES (?)";

    // db.query(sql, [req.file.filename], function(err, result) {
    //     console.log('inserted 88 data');
    //     console.log("query ");
    //  });

    //  message = "Successfully! uploaded";
    //  //res.render('index',{message: message, status:'success'});
    //  //end of mysql stuff
      
    //  res.redirect('./');


    
    // console.log(req.file);
    // res.send('1 fichier uploader')


}) 

// (error, req, res, next) => {
//     res.status(400).res.send("You have successfully uploaded the file!");
//     // res.redirect('/');
// }


// app.post('/multiple',upload.array('image',3),(req,res)=>{

//     console.log(req.file);
//     res.send('3 fichier uploader')
// })




app.listen(Port,()=>{
    console.log(`ecoute sur le port ${Port}`)
})