// electonic-cli

"use strict";

var electonic   = module.exports;
const colors    = require('colors'),
      minimist  = require('minimist'),
      tasks     = require('./tasks/list.js').TASKS,
      settings  = require('../package.json');


let debug = false;


electonic.TASKS = tasks;

/**
 * takes process.argv arguments and filters them
 */
electonic.init = function init(processArgv) {
  
  try {

    var argv = minimist(process.argv.slice(2));
    if (debug) console.dir(argv);

    electonic.setupCLI();

    // -version -v
    if ((argv.version || argv.v) && !argv._.length) {
      return electonic.version();
    }

    // -verbose
    if (argv.verbose) {
      debug = true;
    }

    if (argv._.length > 1) {
      let taskModule   = electonic.getTask(argv);
      let taskInstance = new taskModule();
      taskInstance.run()
    }

  }

  catch (err) {

    console.error('An error has occurred:'.error, err);

  }
};

electonic.getTask = function getTask(argv) {
  for (var i = electonic.TASKS.length - 1; i >= 0; i--) {
    if (argv._[0] == electonic.TASKS[i].name) {
      return require(electonic.TASKS[i].module).task;
    }
    else {
      console.error(`Cannot find module ${argv._[0]}`.error);
    }
  }
};

/**
 * [version description]
 */
electonic.version = function version() { console.log(settings.version, '\n') };

/**
 * [setupCLI description]
 */
electonic.setupCLI = function setupCLI() {

  // set color theme
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

  // do anything else I'd like to here...

}