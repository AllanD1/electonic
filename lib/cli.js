// electonic-cli

var electonic  = module.exports;
const colors   = require('colors')
      minimist = require('minimist');



/**
 * takes process.argv arguments and filters them
 * @return {[type]} [description]
 */
electonic.init = function init(processArgv) {
  
  try {

    var argv = minimist(process.argv.slice(2));
    console.log(cyan(argv));

  }

  catch {
    console.error('An error has occurred');
  }
};
