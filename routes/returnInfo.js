const express = require('express');
const router = express.Router();
const Turista = require("../model/Turista");
const Guide = require("../model/Guides");

//Devuelve nombre del turista
router.get("/turista/name", async (req, res) => {

    try{
        const name = await Turista.find(
            {
                email:req.body.email
            }, 
            {
                name: 1, 
                lastName: 1, 
                photo: 1,
                _id: 0
            });
        res.send(name);
    }
    catch(error)
    {
        res.status(404).send("No Collections inserted yet");
    }    
})

//Devuelve el perfil del guia
router.get("/guia/info", async (req, res) => {

    try{
        const name = await Guide.find(
            {email:req.body.email}, 
            {
                name: 1, 
                lastName: 1, 
                description: 1, 
                rating: 1, 
                photo: 1,
                _id: 0
            });
        res.send(name);
    }
    catch(error)
    {
        res.status(404).send("No Collections inserted yet");
    }    
})

//modificar rating del guia
router.post("/turista/submitRating", async (req, res) => {
    try{
        const success = await Guide.updateOne({}, {rating: req.body.rating});
        res.send(success);
    }
    catch(error)
    {
        res.status(404).send("this shit doesnt work");
    }
})








module.exports = router;