//this loads the webshot library from program files
let webshot = require('webshot');

//this defines the arrays
let clubs = ['pygmalion', 'diceys', 'coppers', 'house', 'opium rooms', 'krystle', 'dtwo'];
let dates = ['JT Pimms', 'pygmalion', 'the jar',];
let pints = ['toners', 'the living room', 'whelans'];

let venueType = [ ];

//userChoice will have to be choses client side
let userChoice = dates;

//this allow us to push the choice into the screenshot function.
// This should also probably be a function
venueType = userChoice;

// this is unnessecary
console.log(venueType);

//this tells it to imitate a mobile
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

/*this for loop runs the webshot module for every value in the user's chosen venue type.
There is probably  better way to do this.
Also, when there are more arrays I'd need to put the below code in 3 times
Or use some sort of master argument feed in thing 
*/
var i;
for (i = 0; i < venueType.length; i++) { 
webshot('https://www.google.ie/search?q='+venueType[i]+'+dublin', 
	venueType[i]+'.png', optionsMobile, function(err) { //should probably create subfolders for wach type
		if (!err) {
			console.log('Screenshot taken!');
		}
	})
};

// this is unneccessary
console.log(venueType.length);

