const router = require('express').Router();
const Turista = require("../model/Turista");
const verify = require('./verifyToken');
const Guide = require("../model/Guides");

let i = 0

//modificar rating del guia
router.post('/submitRating', verify ,async (req, res) => {
    const { id, rating } = req.body;
    if (!id) return res.status(400).send('Id missing');
    if (!rating) return res.status(400).send('Rating missing');
    try {
        const response = await Guide.updateOne({ _id: id }, {
            $push: {
                ratings: rating,
            },
        });
        if (response.nModified === 0) return res.status(400).send('Guide not found');
        res.send('Rating submitted succesfully');
    } catch(err) {
        console.log(err);
        res.status(500).send("random error");
    }
})

router.get('/getRating', verify, async (req, res) =>{
    const {id} = req.body;
    if (!id) return res.status(400).send('Id missing');
    try{
        const response = await Guide.find(
            {_id: id}, {
            ratings: 1,
            _id: 0
            
        });
        
        
        if(response[0].ratings == "") return res.status(400).send("Guide has no ratings submitted yet")

        let ratingAmount = response[0].ratings.length 
        let x = ratingAmount;
        let sumOfRatings = 0

        while(ratingAmount > 0)
        {
            sumOfRatings = sumOfRatings + response[0].ratings[i];
            i++
            ratingAmount--
        }        
        sumOfRatings = sumOfRatings / x;
        
        res.send("Guide rating " + sumOfRatings);            
    }
    catch(err){
        res.send("Guide not found in database")
    }
});

module.exports = router;