# Electonic
_a boilerplate combining electron, ionic2 and cordova for creating truly cross platform apps using web technologies._
<p align="center">
  <img src="https://raw.githubusercontent.com/callodacity/electonic/files/img/electron-final.png" width="78"/>
  <img src="https://raw.githubusercontent.com/callodacity/electonic/files/img/ionic-final.png" width="70"/>
  <img src="https://raw.githubusercontent.com/callodacity/electonic/files/img/cordova-final.png" width="70"/>
</p>




## Setup
1. Make sure you have `electron-prebuilt` installed globally with `npm`.  
`npm install -g electron-prebuilt`
2. You will also need to have Ionic2 installed  
`npm install -g ionic@beta`
3. clone this repo 
4. run `npm install`

## Usage

**developing for mobile platforms**  

Use the [ionic CLI](http://ionicframework.com/docs/v2/getting-started/installation/) as normal i.e. `ionic serve`, `ionic build`, `ionic run`, etc.  

**developing for desktop platforms**  

Run the scripts inside `package.json`:
- `npm run dev` will enable dev mode, using ionic's gulp watch process and automatically opening an electron app directed towards your development livereload server.
- `npm run test` will only open your app in its current state. No watching/livereloading here.

## Distribution and Packaging  
I recommend using [electron-packager](https://github.com/electron-userland/electron-packager) - it has great features and is quite stable.  
`electron-prebuilt` and `electron-packager` are both installed as `devDependencies` so if you want to package your app run:  
`electron-packager . --all`

- for more building and distribution information read [electron-packager](https://github.com/electron-userland/electron-packager).
- for creating installation wizards see [electron-builder](https://www.npmjs.com/package/electron-builder)


### TODO
- [x] configure electron packaging (e.g., building into `.exe`, `.app`, etc.
- [ ] improve electron packaging with local npm scripts 
- [ ] think of other improvements for this boilerplate
