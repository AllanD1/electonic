// create command: starts an electonic project
"use strict";

const colors = require('colors'),
      childProc = require('child_process');

let ElectonicCommand = function() {};
let stdout = function(s) { process.stdout.write(s); };
let stderr = function(s) { process.stderr.write(s); };


ElectonicCommand.prototype.run = function run(electonic, argv) {

  var name, type, desktop, mobile;

  name = argv._[1] ? argv._[1] : null;
  type = argv._[2] ? argv._[2] : 'all';

  if (!name) {
    stderr('Error --> Cannot create project!\n'.red.bold);
    stderr('You must provide a name for your project\n'.red);
    return electonic.printCommandHelp(argv);
  }

  // set default value for type
  if (type != "desktop" && type != "mobile" && type != "all") {
    type = "all";
  }
  stdout(`\nCreating project: '${name.bold}' for ${type.bold} platforms...\n`
          .yellow.bold);

  // prepare vars
  if (type == 'desktop') desktop = true;
  if (type == 'mobile') mobile = true;
  if (type == 'all') desktop = mobile = true;


  // install ionic
  var spawn = require('child_process').spawn,
      ionic,
      flags = [];

  flags.push('start');
  flags.push(name);
  flags.push('blank');
  flags.push('--v2');
  flags.push('--skip-npm');
  if (!mobile) flags.push('--no-cordova');
  if (argv.ts) flags.push('--ts');
  
  if (process.platform == 'win32') {
    ionic = spawn('cmd', ['/c', 'ionic'].concat(flags));
  }
  else {
    ionic = spawn('ionic', flags);
  }

  ionic.stdout.on("data", function(data) {
    // if (data.toString().trim()) {
    //   stdout(`${data.toString().trim()}\n`.cyan);
    // }
  });

  stdout('Adding ionic project...'.blue.bold);
  var dots = '.', 
      msg = 'Adding ionic project',
      interval = setInterval(function() {

        //if (dots.length == 3) dots = '.';
        //else dots += '.';
        // process.stdout.clearLine(0);
        // process.stdout.cursorTo(0);
        // process.stdout.write(msg+dots);
        
        process.stdout.write('.'.blue.bold);
      }, 300);

  ionic.stderr.on("data", function(data) {
    if (data.toString().trim()) {
      stderr(`Ionic: ${data.toString().trim()}\n`.red);
    }
  });

  ionic.on("close", function(code) {
    // clear dots
    clearInterval(interval);

    if (code) {
      stderr(`\nIonic errored with code ${code}\n`.red);
    }
    else {
      stdout('\nIonic created successfully!!\n'.green.bold);
    }

    // install electron
    if (desktop) addElectron();
  });

  function addElectron() {
    stdout(`\nAdding electron requirements... \n`.yellow.bold);
    stdout(`\nDo something here!! \n`.red.bold);
  }

};


exports.command = ElectonicCommand;