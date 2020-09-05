const express = require('express');
const chalk = require('chalk');
const app = express();

const config = require('./config.json');

require('./app/services/database.service')();
require('./app/routes/apis')(app);


app.set('port', process.env.APP_PORT || config.appPort);

app.listen(app.get('port'), function() {
    console.log(chalk.green('Server is listening on port '),
        chalk.red.bold(app.get('port')));
  });
  
