var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// SELECT * FROM helps WHERE week like "%" || (SELECT CONCAT(TIMESTAMPDIFF(WEEK, u.birthDate, NOW()) + 1, ";") FROM users u where id=25) || "%" or month like "%" || (SELECT CONCAT(TIMESTAMPDIFF(MONTH, u.birthDate, NOW()) + 1, ";") FROM users u where id=25) || "%"
	// SELECT * FROM helps WHERE week like CONCAT("%", CONCAT((SELECT CONCAT(TIMESTAMPDIFF(WEEK, u.birthDate, NOW()) + 1, ";") FROM users u where id=25), "%")) or month like CONCAT("%", CONCAT((SELECT CONCAT(TIMESTAMPDIFF(MONTH, u.birthDate, NOW()) + 1, ";") FROM users u where id=25), "%"))
	const query = 'SELECT * FROM helps WHERE week like CONCAT("%;", CONCAT((SELECT CONCAT(TIMESTAMPDIFF(WEEK, u.birthDate, NOW()) + 1, ";") FROM users u where id='+req.query.id+'), "%")) or month like CONCAT("%;", CONCAT((SELECT CONCAT(TIMESTAMPDIFF(MONTH, u.birthDate, NOW()) + 1, ";") FROM users u where id='+req.query.id+'), "%"))';
	connection.query(query, function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

module.exports = router;
