const router = require('express').Router();
const verify = require('./verifyToken');
const Guide = require("../model/Guides");
const Tourist = require("../model/Turista");

router.post('/guide', verify, async (req,res) => { 

    try{
        const info = await Guide.find(
            {email:req.body.email}, 
            {
                name: 1, 
                lastName: 1, 
                rating: 1,                   
                dni: 1            
                
            });
        res.send(info);
    }
    catch(err){
        res.send("Me pego un tiro");
    }
    
});

router.get('/tourist', verify, async (req,res) => { 

    try{
        const info = await Tourist.find(
            {email: req.body.email}, 
            {
                name: 1, 
                lastName: 1,                 
                dni: 1,             
                _id: 1
            });
        res.send(info);
    }
    catch(err){
        res.send("Me pego un tiro");
    }
    
});

module.exports = router;