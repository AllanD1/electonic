# electonic
_a boilerplate combining electron, ionic2 and cordova for creating truly cross platform apps using web technologies._

## Setup
1. Make sure you have `electron-prebuilt` installed globally with `npm`.  
`npm install -g electron-prebuilt`
2. clone this repo 
3. run `npm install`

## Usage

**developing for mobile platforms**  

Use the ionic CLI as normal i.e. `ionic serve`, `ionic build`, `ionic run`, etc.  

**developing for desktop platforms**  

Run the scripts inside `package.json`:
- `npm run dev` will enable dev mode, using ionic's gulp watch process and automatically opening an electron app directed towards your development livereload server.
- `npm run test` will only open your app in its current state. No watching/livereloading here.


### TODO
* configure electron packaging (e.g., building into `.exe`, `.app`, etc.
* think of other improvements for this boilerplate
