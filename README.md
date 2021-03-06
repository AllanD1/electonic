# Electonic

## **Please note this repo is not under active development.**

<p align="center">
  <i>
  a boilerplate combining electron, ionic2 and cordova for creating truly cross platform apps using web technologies.
  </i>
</p>  

<p align="center">
  <img src="https://raw.githubusercontent.com/callodacity/electonic/files/img/electron-final.png" width="78"/>
  <img src="https://raw.githubusercontent.com/callodacity/electonic/files/img/ionic-final.png" width="70"/>
  <img src="https://raw.githubusercontent.com/callodacity/electonic/files/img/cordova-final.png" width="70"/>
</p>

<p align="center">
  <a href="http://electron.atom.io/">electron</a> &#8226;
  <a href="http://ionicframework.com/">ionic</a> &#8226;
  <a href="https://cordova.apache.org/">cordova</a> 
</p>


<p align="center">
  <strong>
    Please note that this is a current work in progress! I'm currently devoting my time to improving the electonic CLI (see branch CLI)
  </strong>
</p>


## Setup
1. Make sure you have `ionic@beta` installed globally with `npm`.  
--> `npm install -g ionic@beta`
2. clone this repo `git clone https://github.com/callodacity/electonic.git`
3. run `npm install`

## Usage

**Developing for mobile platforms**  

Use the [ionic CLI](http://ionicframework.com/docs/v2/getting-started/installation/) as normal i.e. `ionic serve`, `ionic build`, `ionic run`, etc.  

**Developing for desktop platforms**  

Run the scripts inside `package.json`:
- `npm run dev` will enable dev mode, using ionic's gulp watch process and automatically opening an electron app directed towards your development livereload server.
- `npm run test` will only open your app in its current state. No live watching/reloading here.

## Distribution and Packaging  

**Building with electron (desktop)**  

I recommend using [electron-packager](https://github.com/electron-userland/electron-packager) - it has great features and is quite stable.  
`electron-prebuilt` and `electron-packager` are both included as `devDependencies`.  

If you want to package your app run you can use these npm scripts:  
--> **Before you package your app your must run either `npm run dev` or `npm run test` at least once!!**  
--> _Please note that these scripts will overwrite old packaged apps in the same directory_

- `npm run pack:osx` --> packages into `.app` for osx. Both Darwin and MAS.
- `npm run pack:win` --> packages into `.exe` (`ia32` and `x64`) for Windows.
- `npm run pack:nix` --> packages into both `ia32` and `x64` for Linux.

_If you plan to use your own parameters for `electron-packager` make sure the `<sourcedir>` is set to `./www/`._
 
- for more building and distribution information read [electron-packager](https://github.com/electron-userland/electron-packager).
- for creating installation wizards see [electron-builder](https://www.npmjs.com/package/electron-builder)

**Building with ionic (mobile)**  

This repository is really just an ionic project with electron built into it. So if you're building for mobile follow ionic's or cordova's tutorials on that.  
- `ionic build` will build your app.  
- Remember to add desired platforms `ionic platform add android`.  
- Go here for more information on [ionic build](http://ionicframework.com/docs/v2/cli/build/).

### TODO
- [x] configure electron packaging (e.g., building into `.exe`, `.app`, etc.
- [ ] attempt to find a fix for readline.js on windows systems (you won't be able to input into command prompt, just terminate with crtl+c)
- [ ] remove unnecessary files from final packaged app
  - [x] include only pertinent files of final app
  - [ ] exclude desktop files on mobile production apps and vice versa
- [ ] Make an electonic CLI
  - [ ] Be able to choose desktop / mobile / all as production platforms
  - [ ] Make a wrapper for Ionic (for choosing TypeScript/JavaScript projects and their starter templates)
  - [ ] Be able to choose vanilla AngularJS / Ionic / no library
    - [ ] perhaps adding support for adding library of choice?

- [x] think of other improvements for this boilerplate
