const cronJob = require('cron').CronJob;

const job = new cronJob('*/5 * * * * *', () => {
    console.log('This will get executed every 5 seconds');
}, null, true, 'Europe/London');

job.start();