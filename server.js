// Node js
// import modules @express @mongoDB @cors @body-parser
// require() function used to import the module

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoDB = require('mongodb');

// create the rest service object
let app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());

let ashokIT = mongodb.MongoClient;


app.post("/login",(req,res)=>{
    ashokIT.connect("mongodb+srv://admin:admin@cluster0.ah1c4.mongodb.net/workshop?retryWrites=true&w=majority",(err,conn)=>{
        if(err) throw err;
        else{
            let db = conn.db("workshop");
            db.collection("login_details").find({"uname":req.body.uname,"upwd":req.body.upwd})
            .toArray((err,my_array)=>{
                if(err) throw err;
                else{
                    if(my_array.length>0){
                        res.status(200).json({login:"success"});
                    }else{
                        res.status(200).json({login:"fail"});
                    }
                }
            });
        }
    });
});

// Assign the custom port no
let port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("server started successfully !!!");
});