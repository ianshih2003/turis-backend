const router = require('express').Router();
const Turista = require("../model/Turista");
const verify = require('./verifyToken');
const Guide = require("../model/Guides");
let totalRatings = null;
let i = null

//modificar rating del guia
router.post('/submitRating', verify ,async (req, res) => {
    const { id, rating } = req.body;
    if (!id) return res.status(400).send('id missing');
    if (!rating) return res.status(400).send('rating missing');
    try {
        const response = await Guide.updateOne({ _id: id }, {
            $push: {
                ratings: rating,
            },
        });
        if (response.nModified === 0) return res.status(400).send('user not found');
        res.send('success');
    } catch(err) {
        console.log(err);
        res.status(500).send("random error");
    }
})

router.get('/getRating', async (req, res) =>{
    const {id} = req.body;
    if (!id) return res.status(400).send('id missing');
    try{
        const response = await Guide.find(
            {_id: id}, {
            ratings: 1,
            
        });     
        

        
    }
    catch(err){
        console.log("invalid code")
    }
});

module.exports = router;