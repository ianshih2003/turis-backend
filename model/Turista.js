const mongoose = require('mongoose');


const GeoSchema = new mongoose.Schema({
    geometry:{
        type: String,
        default:"Point",
        required: true
    },
    coordinates:{
        type: [Number],
        index: "2dsphere",
        required: true
    }
});

const turistaSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
       

    },
    lastName:{
        type: String,
        required: true
       
    },

    country:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
        
    },
    password:{
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    language1:{
        type: String,
        required: true
        
    },
    language2:{
        type: String,
        required: false
        
    },
    language3:{
        type: String,
        required: false
    },
    
    photo:{
        type: String,
        required: true
    },

    hearing:{
        type: String,
        required: false
    },

    date:{
        type: Date, 
        default: Date.now
    },

    geometry: GeoSchema
});



module.exports = mongoose.model('Turista', turistaSchema);