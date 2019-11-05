const mongoose = require('mongoose');



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
    
    photo:{
        type: String,
        required: false
    },

    hearing:{
        type: String,
        required: false
    },

    

    date:{
        type: Date, 
        default: Date.now
    }
});



module.exports = mongoose.model('Turista', turistaSchema);