const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = data => {
    const schema ={
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().required(),
        language1: Joi.string(). required(),
        language2: Joi.string().required(),
        language3: Joi.string().required(),
        country: Joi.string().required(),
        photo: Joi.string().required(),
        description: Joi.string().required(),
        hearing: Joi.string().required()
        
    };

    return Joi.validate(data, schema);
};

const loginValidation = data => {
    const schema ={        
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()  
        
    };

    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;