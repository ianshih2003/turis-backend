const router = require('express').Router();
const verify = require('./verifyToken');
const Guide = require("../model/Guides");
const Tourist = require("../model/Turista");

router.post('/guide', verify, async (req,res) => { 

    try{

        const email = req.body.email
        if(!email) return res.status(400).send("Missing fields");
        const info = await Guide.find(
            {email:email}, 
            {
                name: 1, 
                lastName: 1, 
                rating: 1,                   
                dni: 1            
                
            });
        res.send(info);
    }
    catch(err){
        res.send("Random Error");
    }
    
});

router.get('/tourist', verify, async (req,res) => { 

    try{
        const email = req.body.email
        if(!email) return res.status(400).send("Missing fields");
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
        res.send("Random Error");
    }
    
});

module.exports = router;