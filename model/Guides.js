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

const GuideSchema = new mongoose.Schema({
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

    rating:{
        type: Number,
        default: 0
    },
    available:{
        type: Boolean,
        default: false
    },
    
    photo:{
        type: String,
        required: true
    },

    geometry: GeoSchema
});



module.exports = mongoose.model('Guide', GuideSchema);