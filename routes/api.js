var db = require("../database/mongo");
var express = require("express");

var router = express.Router();

///GET REQUESTS///

router.get("/add", function(req, res){
    
    res.render("add");
})


router.get("/", function(req, res){
    db.plans.find({}, (error, data)=>{
        if (error){
            res.send(error)
        }else{
            var resultArray = [];

            for(i=0; i<data.length; i++){
                resultArray.push(data[i]);
            };
            console.log(resultArray);
            var hbsObject = {names: resultArray};
            
        }
        res.render("viewall", hbsObject);
    });
    
})

router.get("/about", function(req, res){
    
    res.render("about");
})

router.get('/edit', function(req, res){

    res.render('edit');
});

///POST REQUESTS///
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

