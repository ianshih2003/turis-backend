const mongoose = require('mongoose');


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
        required: false
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
        required: false
        
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
        required: false
    },
    available:{
        type: Boolean,
        default: false
    },
    
    photo:{
        type: String,
        required: false
    },

    description:{
        type: String,
        required: false
    },

    dni:{
        type:Number,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    },

    ratings: {
        type: [Number],
        default: []
    },

    token:{
        type:String,
        required:false
    }

    
});



module.exports = mongoose.model('Guide', GuideSchema);