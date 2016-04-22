// electonic-cli

var electonic  = module.exports;
const colors   = require('colors')
      minimist = require('minimist');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

/**
 * takes process.argv arguments and filters them
 * @return {[type]} [description]
 */
electonic.init = function init(processArgv) {
  
  try {

    var argv = minimist(process.argv.slice(2));
    console.dir(argv);

  }

  catch (err) {

    console.error('An error has occurred:'.error, err);

  }
};
