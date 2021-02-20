var express = require('express');
var router = express.Router();

/* POST user. */
router.post('/', function(req, res, next) {
	var email = req.body.email;
	var sex = req.body.sex;
	var birthDate = req.body.birthDate;
	var name = req.body.name;
	var language = req.body.language;
	var id = req.body.id;

	global.connection.query('update users set email="'+email+'",sex="'+sex+'",name="'+name+'",language="'+language+'",birthDate="'+new Date(birthDate).toISOString().split('T')[0]+'" where id='+id, function (error, results, fields) {
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
