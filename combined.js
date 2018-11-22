//this loads the webshot library from program files
let webshot = require('webshot');
let Tesseract = require('tesseract.js');
let fs = require('fs');

//this defines the arrays
let clubs = ['pygmalion', 'diceys', 'coppers', 'house', 'opium rooms', 'krystle', 'dtwo'];
let dates = ['JT Pimms', 'pygmalion', 'the jar'];
let pints = ['toners', 'the living room', 'whelans'];
let sample = ['sams bar'];

let venueType = [ ];

//userChoice will have to be chosen client side. Here we are just using the sample one. 
let userChoice = sample;

//this allow us to push the choice into the functions.
// This should also probably be a function
venueType = userChoice;

// this is unnessecary
console.log(venueType);

//this tells the OCR webshot to imitate a mobile
let optionsMobile = {
	screenSize: {
		width: 414,
		height: 736
	},
	shotSize: {
		width: 414,
		height: 2100
	},
	userAgent: 'Mozilla/5.0 (iPhone9,4; U; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1'
};

// This is the tesseract function(?) that reads the file
// It works now IF there is only one entry in the sample array. If there are two it does not. 
// Note that the webshot uses venueType[i], whereas this just uses venueType. venueType[i] breaks this
function ts() {
	Tesseract.recognize(venueType+'.png')
  .then(function (result) {fs.writeFileSync(venueType+'.txt', result.text, function(err) {
		if (err) {
		    console.log(err);
		} else {
		    console.log("file written successfully"); // it does not console.log this for some reason
			}
		})
    process.exit(0) // if this is removed the command prompt runs forever, it doesn't stop
  })
};

//this for loop runs the webshot module for every value in the user's chosen venue type. 
// It then runs the ts function
// It works with just one value in the sample array
// There is probably  better way to do this.

var i;
for (i = 0; i < venueType.length; i++) { 
webshot('https://www.google.ie/search?q='+venueType[i]+'+dublin', 
	venueType[i]+'.png', optionsMobile, function(err) { 
		if (!err) {
			console.log('Screenshot taken!');
			ts(venueType[i]);
		}
	})
};

// this is unneccessary
console.log(venueType.length);