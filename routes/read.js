var express = require('express');
var router = express.Router();

/* POST read. */
router.post('/', function(req, res, next) {
	var read = req.body.read;
	var id = req.body.id;	
	//update users a set a.read=CONCAT(CONCAT(a.read, "1"), ";") where id=4
	//update users a set a.read=CONCAT(CONCAT(a.read, "1"), ";") where id=4 and a.read not like '%1;%'
	connection.query('update users a set a.read=CONCAT(CONCAT(a.read, "'+read+'"), ";") where id='+id+' and a.read not like CONCAT(CONCAT("%", "'+read+'"), "%")', function (error, results, fields) {
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
