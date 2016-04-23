// create command: starts an electonic project
"use strict";

const colors = require('colors');

let ElectonicCommand = function() {};
let stdout = function(s) { process.stdout.write(s); };
let stderr = function(s) { process.stderr.write(s); };


ElectonicCommand.prototype.run = function run(electonic, argv) {

  let path = argv._[1] ? argv._[1] : null;
  let type = argv._[2] ? argv._[2] : null;

  if (!path || !type) {
    stderr('Error --> Cannot create project!\n'.red.bold);
    stderr('You must provide both a path and a name for your project\n'.red);
    return electonic.printCommandHelp(argv);
  }

  // do something here
  stdout('this is the create task!\n'.yellow.bold);

};


exports.command = ElectonicCommand;