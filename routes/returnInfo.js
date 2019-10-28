const router = require('express').Router();
const Turista = require("../model/Turista");
const Guide = require("../model/Guides");

router.get('/', function(req, res){
    res.send("Hello");
});



//modificar rating del guia
router.post('/submitRating', async (req, res) => {

    
    try{        
        const success = await Guide.find(
            {_id: req.body.id},
            function(err, Guide){
                Guide.rating = req.body.rating  
            }
        );
    }
    catch(error)
    {
        res.status(404).send("this shit doesnt work");
    }
})

module.exports = router;