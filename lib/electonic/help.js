// help command: displays useful information regarding usage of electonic cli
"use strict";

let ElectonicCommand = function() {};

ElectonicCommand.prototype.run = function run(electonic, argv) {

  return electonic.printHelp();

};


exports.command = ElectonicCommand;