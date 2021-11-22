const schedule = require('node-schedule');

exports.schedulerMiddleware = () => {
  schedule.scheduleJob('0 0 12 * * ?', async () => {
    console.log('scheduler is running!');
  });
};
