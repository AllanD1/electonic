// electonic-cli

"use strict";

var electonic   = module.exports;
const colors    = require('colors'),
      minimist  = require('minimist'),
      COMMANDS  = require('./commands/list.js').COMMANDS,
      settings  = require('../package.json');

let debug = false;
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
      debug = true;
    }

    if (debug) stdout('\n args ==>'.blue.bold, argv, '\n\n');

    // --version, -v
    if ((argv.version || argv.v) && !argv._.length) {
      return electonic.version();
    }

    // --help, -h
    if ((argv.help || argv.h) && !argv._.length) {
      return electonic.printHelp();
    }

    // command (electonic a b)
    if (argv._.length > 1) {
      let commandModule = electonic.getCommand(argv);
      if (commandModule) {
        let commandInstance = new commandModule();
        return commandInstance.run();
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
    stderr('An error has occurred:'.error, err);
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
    else {
      stderr(` Error --> Cannot find command '${argv._[0]}'\n`.error.bold);
      return false;
    }
  }
};


/**
 * [printCommandHelp]
 */
electonic.printCommandHelp = function printCommandHelp(argv) {

  var command;

  for (var i = 0; i < COMMANDS.length; i++) {
    if (argv._[0] == COMMANDS[i].name) {
      command = COMMANDS[i];
      break;
    }
    else {
      stderr(` Error --> Unknown command '${argv._[0]}'\n`.error.bold);
      return electonic.printHelp(true);
    }
  }


  // print command help
  var dots = '';
  var commandSyntax = ` ${command.title}`;

  for (var arg in command.args) {
    commandSyntax += ` ${arg}`;
  }

  stdout(`\n Usage for ${command.title.toString()}\n`.bold);
  stdout(' ==============================\n\n');
  stdout((commandSyntax).bold.green);


  //   w(taskArgs.green.bold);

  //   while( (taskArgs + dots).length < rightColumn + 1) {
  //     dots += '.';
  //   }

  //   w(' ' + dots.grey + '  ');

  //   if(d.summary) {
  //     w(d.summary.bold);
  //   }

  //   for(arg in d.args) {
  //     if( !d.args[arg] ) continue;

  //     indent = '';
  //     w('\n');
  //     while(indent.length < rightColumn) {
  //       indent += ' ';
  //     }
  //     w( (indent + '    ' + arg + ' ').bold );

  //     var argDescs = d.args[arg].split('\n');
  //     var argIndent = indent + '    ';

  //     for(x=0; x<arg.length + 1; x++) {
  //       argIndent += ' ';
  //     }

  //     for(x=0; x<argDescs.length; x++) {
  //       if(x===0) {
  //         w( argDescs[x].bold );
  //       } else {
  //         w( '\n' + argIndent + argDescs[x].bold );
  //       }
  //     }
  //   }

  //   indent = '';
  //   while(indent.length < d.name.length + 1) {
  //     indent += ' ';
  //   }

  //   var optIndent = indent;
  //   while(optIndent.length < rightColumn + 4) {
  //     optIndent += ' ';
  //   }

  //   for(var opt in d.options) {
  //     w('\n');
  //     dots = '';

  //     var optLine = indent + '[' + opt + ']  ';

  //     w(optLine.yellow.bold);

  //     if(d.options[opt]) {
  //       while( (dots.length + optLine.length - 2) < rightColumn) {
  //         dots += '.';
  //       }
  //       w(dots.grey + '  ');

  //       var taskOpt = d.options[opt],
  //           optDescs;

  //       if (typeof taskOpt == 'string') {
  //         optDescs = taskOpt.split('\n');
  //       } else {
  //         optDescs = taskOpt.title.split('\n');
  //       }
  //       for(x=0; x<optDescs.length; x++) {
  //         if(x===0) {
  //           w( optDescs[x].bold );
  //         } else {
  //           w( '\n' + optIndent + optDescs[x].bold );
  //         }
  //       }
  //     }
  //   }

  //   w('\n');

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