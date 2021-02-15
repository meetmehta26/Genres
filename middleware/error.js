const logger = require('winston');
module.exports = function(err,req,res,next){
logger.error(err.message);
return res.status(500).send('Some error occurred');

}