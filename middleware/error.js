module.exports = function(req,res,next){
    if(req.error) return res.status(500).send('Some error occurred');

}