const cronJob = require('cron').CronJob;
var mysql= require('mysql');
const { Expo } = require('expo-server-sdk');

// process.env['MYSQL_HOST_IP'] = 'localhost';
// process.env['MYSQL_HOST_PORT'] = '6603';

 // SELECT * FROM helps WHERE ID IN ( SELECT b.ID FROM users a, helps b WHERE a.ID = 17 AND !FIND_IN_SET(b.ID, REPLACE(a.READ, ';', ',') ) ) AND ( WEEK LIKE CONCAT( "%;", CONCAT( ( SELECT CONCAT( TIMESTAMPDIFF(WEEK, u.birthDate, NOW()) + 1, ";") FROM users u WHERE id = 17 ), "%" ) ) OR MONTH LIKE CONCAT( "%;", CONCAT( ( SELECT CONCAT( TIMESTAMPDIFF(MONTH, u.birthDate, NOW()) + 1, ";") FROM users u WHERE id = 17 ), "%" ) ) ) LIMIT 1

let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

const job = new cronJob('*/5 * 10 * * *', () => {    
    sendPush();
    /*
    var pool = mysql.createPool({ // global.connection = mysql.createPool({
        connectionLimit : 10,
        host     : process.env.MYSQL_HOST_IP,
        user     : 'root',
        password : 'babyhelp',
        database : 'babyhelp',
        port: process.env.MYSQL_HOST_PORT,
        insecureAuth : false,
        queueLimit : 0, // unlimited queueing
        connectionLimit : 0 // unlimited connections
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
    */
}, null, true, 'Europe/London');

const sendPush = () => {
    let messages = [];
    let pushToken = 'ExponentPushToken[kTcgYUJs0n1VaPBOuZd8xp]';
    if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);    
        return
    }
    messages.push({
        to: pushToken,
        sound: 'default',
        body: 'This is a test notification',
        data: { withSome: 'data' },
    })
    const chunks = expo.chunkPushNotifications(messages);
    (async () => {
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        for (let chunk of chunks) {
          try {
            let receipts = await expo.sendPushNotificationsAsync(chunk);
            console.log(receipts);
          } catch (error) {
            console.error(error);
          }
        }
      })();
}

job.start();