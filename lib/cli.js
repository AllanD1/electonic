// electonic-cli

"use strict";

var electonic   = module.exports;
const fs        = require('fs'),
      colors    = require('colors'),
      minimist  = require('minimist'),
      COMMANDS  = require('./commands/list.js').COMMANDS,
      childProc = require('child_process'),
      settings  = require('../package.json');

let debug = false;
let verbose = false;
let stdout = function(s) { process.stdout.write(s); };
let stderr = function(s) { process.stderr.write(s); };

/**
 * takes process.argv arguments and filters them
 */
electonic.init = function init(processArgv) {
  
  try {

    var argv = minimist(process.argv.slice(2));
    electonic.setupCLI();

    // --verbose
    if (argv.verbose) {
      verbose = true;
    }
    if (argv.debug) {
      debug = true;
    }

    if (debug) console.log('\n args ==>', argv, '\n');

    // --version, -v
    if ((argv.version || argv.v) && !argv._.length) {
      return electonic.version();
    }

    // --help, -h
    if ((argv.help || argv.h) && !argv._.length) {
      return electonic.printHelp();
    }

    // command (electonic a b)
    if (argv._.length) {
      let commandModule = electonic.getCommand(argv);
      if (commandModule) {
        let commandInstance = new commandModule();
        return commandInstance.run(electonic, argv);
      }
    }

    // command help
    if ((argv.help || argv.h) && argv._.length == 1) {
      return electonic.printCommandHelp(argv);
    }

    // argv not compatible with any commands
    stderr(' Error --> Invalid input\n'.error.bold);
    return electonic.printHelp(true);

  }

  catch (err) {
    stderr('An error has occurred:'.error);
    if (debug) console.dir(err);
  }
};

/**
 * [getCommand description]
 * @param  {Object} argv CLI arguments from process.argv
 */
electonic.getCommand = function getCommand(argv) {
  for (var i = 0; i < COMMANDS.length; i++) {
    if (argv._[0] == COMMANDS[i].name) {
      return require(COMMANDS[i].module).command;
    }
  }
  // no command found
  stderr(` Error --> Cannot find command '${argv._[0]}'\n`.error.bold);
  return false;
};


/**
 * [printCommandHelp]
 */
electonic.printCommandHelp = function printCommandHelp(argv) {
  // find command
  var command;
  for (var i = 0; i < COMMANDS.length; i++) {
    if (argv._[0] == COMMANDS[i].name) {
      command = COMMANDS[i];
      break;
    }
  }
  if (!command) {
    stderr(` Error --> Unknown command '${argv._[0]}'\n`.error.bold);
    return electonic.printHelp(true);
  }
  
  // print command help
  var arg, i, opt, dots, optIndent, indent;
  var rightColumn = 45;
  var commandSyntax = ` ${command.title}`;

  for (arg in command.args) commandSyntax += ` ${arg}`;

  stdout(`\n Usage for ${command.title.toString().bold}\n`);
  stdout(` ${'='.repeat(rightColumn + 1)}\n`);
  stdout((commandSyntax).bold.green);

  dots = '.'.repeat((rightColumn + 1) - commandSyntax.length);
  stdout(` ${dots.grey}  `);

  if (command.summary) {
    stdout(command.summary.bold);
  }

  // each argument in command
  for (arg in command.args) {
    if (!command.args[arg]) continue;

    indent = ' '.repeat(rightColumn + 1);
    stdout(`\n${indent}   ${arg} `.bold);

    let argInfo   = command.args[arg].split('\n');
    let argIndent = ' '.repeat(indent.length + arg.length + 4);

    for (i = 0; i < argInfo.length; i++) {
      if (i === 0) stdout(argInfo[i]);
      else stdout(`\n${argIndent}${argInfo[i]}`);
    }
  }

  indent = ' '.repeat(command.name.length + 1);
  optIndent = ' '.repeat(indent.length + rightColumn + 2);

  // each option in command
  for (opt in command.options) {
    let optLine = `${indent}[${opt}]  `;
    stdout('\n'+optLine.yellow.bold);

    if (command.options[opt]) {
      dots = '.'.repeat((rightColumn - optLine.length) + 2);
      stdout(`${dots}  `.grey);

      let commandOption = command.options[opt];
      let optionInfo = (typeof commandOption == 'string')
        ? commandOption.split('\n')
        : commandOption.title.split('\n');

      for (i = 0; i < optionInfo.length; i++) {
        if (i === 0) stdout(optionInfo[i].bold);
        else stdout(`\n ${optIndent}${optionInfo[i]}`.bold);
      }
    }
  }
  stdout('\n\n');
};

/**
 * [printHelp description]
 */
electonic.printHelp = function printHelp(err) {
  electonic.printLogo(err);

  // log to stderr if displaying as error
  let print;
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

electonic.printLogo = function printLogo(err) {
  let p = function(s) {
    process.stdout.write(err ? (s.red+'\n') : (s.green+'\n'));
  };

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
electonic.version = function version() { stdout(settings.version, '\n') };

/**
 * Creates a directory if it doesn't exist
 * @param  {String} path for the directory
 * @return {Boolean} Returns true if dir was created, false if already exists
 */
electonic.createDir = function createDir(path) {
  try {
    fs.mkdirSync(path);
    return true;
  }
  catch(err) {
    if ( err.code != 'EEXIST' ) throw err;
    return false;
  }
}; 

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