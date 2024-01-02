const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try {
         const token = req.headers.authorization.split(" ")[1];
        //const token = req.headers.authorization;
        console.log('R4x',token);
        const decoded = jwt.verify(token, ' this is dummy secret key');
        console.log('R4x ',decoded);
        if(decoded.userType === 'admin'){
            next();
        }else{
            return res.status(401).json({
                msg:'you are not admin'
            })
        }
        
    } catch (error) {
        return res.status(401).json({
            msg:'invalid Token'
        })
    }
}