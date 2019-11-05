const jwt = require('jsonwebtoken');



module.exports = function(req,res,next){
    
    const authtoken = req.body.token
    if(!authtoken) return res.status(401).send('Access Denied');
    
    try{
        const verified = jwt.verify(authtoken, process.env.JWT_KEY);
        
        
        next();
    }catch(err){
        res.send("Wrong Token");
    }   
}