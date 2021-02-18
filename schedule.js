const cronJob = require('cron').CronJob;
var mysql= require('mysql');

// process.env['MYSQL_HOST_IP'] = 'localhost';
// process.env['MYSQL_HOST_PORT'] = '6603';

 // SELECT * FROM helps WHERE ID IN ( SELECT b.ID FROM users a, helps b WHERE a.ID = 17 AND !FIND_IN_SET(b.ID, REPLACE(a.READ, ';', ',') ) ) AND ( WEEK LIKE CONCAT( "%;", CONCAT( ( SELECT CONCAT( TIMESTAMPDIFF(WEEK, u.birthDate, NOW()) + 1, ";") FROM users u WHERE id = 17 ), "%" ) ) OR MONTH LIKE CONCAT( "%;", CONCAT( ( SELECT CONCAT( TIMESTAMPDIFF(MONTH, u.birthDate, NOW()) + 1, ";") FROM users u WHERE id = 17 ), "%" ) ) ) LIMIT 1


const job = new cronJob('*/5 * 10 * * *', () => {
    var pool = mysql.createPool({ // global.connection = mysql.createPool({
        connectionLimit : 10,
        host     : process.env.MYSQL_HOST_IP,
        user     : 'root',
        password : 'babyhelp',
        database : 'babyhelp',
        port: process.env.MYSQL_HOST_PORT,
        insecureAuth : false,
      });
      pool.getConnection(function(err, connection) {
        connection.query('SELECT * from users', function (error, results, fields) {
            if (error) {
                console.log(error);
            } else {
                // console.log(results);
                results.forEach(result => {
                    console.log(result.id);
                    connection.query('SELECT * FROM helps WHERE ID IN ( SELECT b.ID FROM users a, helps b WHERE a.ID = '+result.id+' AND !FIND_IN_SET(b.ID, REPLACE(a.READ, ";", ",") ) ) AND ( week like CONCAT("%;", CONCAT((SELECT CONCAT(TIMESTAMPDIFF(WEEK, u.birthDate, NOW()) + 1, ";") FROM users u where id='+result.id+'), "%")) or month like CONCAT("%;", CONCAT((SELECT CONCAT(TIMESTAMPDIFF(MONTH, u.birthDate, NOW()) + 1, ";") FROM users u where id='+result.id+'), "%")) )', function(helpError, helpResults, helpFields) {
                        if (helpError) {
                            console.log(helpError);
                        } else {
                            helpResults.forEach(helpResult => {
                                console.log(helpResult.label);
                            });
                        }
                    });     
                });
            }
        });
      });
    console.log('This will get executed every 5 seconds');
}, null, true, 'Europe/London');

job.start();