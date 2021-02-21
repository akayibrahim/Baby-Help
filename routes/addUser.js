var express = require('express');
var router = express.Router();

/* POST user. */
router.post('/', function(req, res, next) {
	var email = req.body.email;
	var sex = req.body.sex;
	var birthDate = req.body.birthDate;
	var name = req.body.name;
	var language = req.body.language;
	var pushToken = req.body.pushToken;

	global.connection.query('INSERT INTO users (email, sex, name, birthDate, createDate, language, pushToken) VALUES ("'+email+'","'+sex+'","'+name+'","'+birthDate+'", now(), "'+language+'", "'+pushToken+'")', function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
			//If there is error, we send the error in the error section with 500 status
		} else {
		  res.id = results.id;			
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

module.exports = router;
