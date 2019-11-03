const jwt = require('jsonwebtoken');



module.exports = function(req,res,next){
    
    const authtoken = req.header('token');
    if(!authtoken) return res.status(401).send('Missing token header');
    
    try{
        const verified = jwt.verify(authtoken, process.env.JWT_KEY);    
        
        next();
    }catch(err){
        res.send("Wrong Token");
    }   
}