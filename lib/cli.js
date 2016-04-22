// electonic-cli

"use strict";

var electonic   = module.exports;
const colors    = require('colors'),
      minimist  = require('minimist'),
      COMMANDS     = require('./commands/list.js').COMMANDS,
      settings  = require('../package.json');


let debug = false;


electonic.COMMANDS = COMMANDS;

/**
 * takes process.argv arguments and filters them
 */
electonic.init = function init(processArgv) {
  
  try {

    var argv = minimist(process.argv.slice(2));
    if (debug) console.dir(argv);

    electonic.setupCLI();

    // --version, -v
    if ((argv.version || argv.v) && !argv._.length) {
      return electonic.version();
    }

    // --verbose
    if (argv.verbose) {
      debug = true;
    }

    // --help, -h
    if (argv.help || argv.h) {
      return electonic.printHelp();
    }

    // command (electonic a b)
    if (argv._.length > 1) {
      let commandModule   = electonic.getCommand(argv);
      let commandInstance = new commandModule();
      commandInstance.run()
    }

  }

  catch (err) {

    console.error('An error has occurred:'.error, err);

  }
};

/**
 * [getCommand description]
 * @param  {Object} argv CLI arguments from process.argv
 */
electonic.getCommand = function getCommand(argv) {
  for (var i = COMMANDS.length - 1; i >= 0; i--) {
    if (argv._[0] == COMMANDS[i].name) {
      return require(COMMANDS[i].module).command;
    }
    else {
      console.error(`Cannot find module ${argv._[0]}`.error);
      return electonic.printHelp(true);
    }
  }
};

/**
 * [printHelp description]
 */
electonic.printHelp = function printHelp(err) {
  electonic.printLogo();

  var print;
  if (err)  print = function(s) { process.stderr.write(s); };
  else      print = function(s) { process.stdout.write(s); };

  print('\nAvailable commands:\n'.bold);
  print('(use --help or -h on each command for more info)\n\n');

  // print commands and their summaries
  for (var i = 0; i < COMMANDS.length; i++) {
    let command = COMMANDS[i];
    if (command.summary) {
      let name = '   ' + command.name + '  ';
      let dots = '';
      while ((name + dots).length < 20) {
        dots += '.';
      }
      print(name.green.bold + dots.grey + '  ' + command.summary.bold + '\n');
    }
  }

  print('\n');
};

electonic.printLogo = function printLogo() {
  var p = function(s) { process.stdout.write(s.green + '\n'); };
  p('  _____ _           _              _      ');
  p(' | ____| | ___  ___| |_ ___  _ __ (_) ___ ');
  p(' |  _| | |/ _ \\/ __| __/ _ \\| \'_ \\| |/ __|');
  p(' | |___| |  __/ (__| || (_) | | | | | (__ ');
  p(' |_____|_|\\___|\\___|\\__\\___/|_| |_|_|\\___| CLI v'+settings.version);
  // p(' =========================================');
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