const cronJob = require('cron').CronJob;
var mysql= require('mysql');

// process.env['MYSQL_HOST_IP'] = 'localhost';
// process.env['MYSQL_HOST_PORT'] = '6603';

const job = new cronJob('*/5 * * * * *', () => {
    global.connection = mysql.createConnection({ // global.connection = mysql.createPool({
        host     : process.env.MYSQL_HOST_IP,
        user     : 'root',
        password : 'babyhelp',
        database : 'babyhelp',
        port: process.env.MYSQL_HOST_PORT,
        insecureAuth : false,
      });
      connection.connect(function (err) {
      if (err) throw err;
      console.log ('Connected');
    });
    connection.query('SELECT * from users', function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            results.forEach(result => {
                // console.log(result.name);
            });
        }
    });
    console.log('This will get executed every 5 seconds');
}, null, true, 'Europe/London');

job.start();