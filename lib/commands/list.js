


var COMMANDS = [
  {
    title: 'create',
    name: 'create',
    summary: 'Starts a new Electonic project in the specified PATH',
    args: {
      '[options]': 'any flags for the command',
      '<PATH>': 'directory for the new project',
      '[template]': 'Starter templates can either come from a named template, \n' +
                    '(ex: tabs, sidemenu, blank),\n' +
                    'a Github repo, a Codepen url, or a local directory.\n' +
                    'Codepen url, ex: http://codepen.io/ionic/pen/odqCz\n' +
                    'Defaults to Ionic "tabs" starter template'
    },
    options: {
      '--appname|-a': 'Human readable name for the app (Use quotes around the name)',
      '--id|-i': 'Package name for <widget id> config, ex: com.mycompany.myapp',
      '--no-cordova|-w': {
        title: 'Create a basic structure without Cordova requirements',
        boolean: true
      },
      '--sass|-s': {
        title: 'Setup the project to use Sass CSS precompiling',
        boolean: true
      },
      '--list|-l': {
        title: 'List starter templates available',
        boolean: true
      },
      '--io-app-id': 'The Ionic.io app ID to use',
      '--template|-t': 'Project starter template',
      '--zip-file|-z': 'URL to download zipfile for starter template'
    },
    module: './commands/create'
  },
  {
    title: 'help',
    name: 'help',
    summary: 'Displays useful information regarding use of the Electonic CLI'
  }
];


exports.COMMANDS = COMMANDS;