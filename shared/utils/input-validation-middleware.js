module.exports = () => {
    const validateInput = (req, res, next)=>{
        if(!req.body.message){
            res.status(400);
            return next(`message is missing`)
        }
        next();
    };

    return validateInput;
}