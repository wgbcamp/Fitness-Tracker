var db = require("../database/mongo");
var express = require("express");

var router = express.Router();

router.get("/", function(req, res){

    res.render("index");
})

router.get("/add", function(req, res){
    
    res.render("add");
})

router.get("/edit", function(req, res){
    
    res.render("edit");
})

router.get("/about", function(req, res){
    
    res.render("about");
})

router.post("/submit", (req, res)=>{
    console.log(req.body);

    db.plans.save(req.body, (error, data) =>{
        if (error){
            res.send(error);
        }else{
            res.send(data);
        }
    })
})
module.exports = router;

