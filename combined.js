/*
time taken
2/2.5 days (~18hrs)
+ 6 hrs thur
+ 5 hrs fri
+ 2.5 sat
new
+2hrs
*/


//this loads the webshot library from program files
//
let webshot = require('webshot');
let Tesseract = require('tesseract.js');
let fs = require('fs'); 
//duplicated above with th html stuff in

//this defines the arrays
let clubs = ['pygmalion', 'diceys', 'coppers', 'house', 'opium rooms', 'krystle', 'dtwo'];
let dates = ['JT Pimms', 'pygmalion', 'the jar'];
let pints = ['toners', 'the living room', 'whelans'];
let sample2 = ['toners', 'diceys'];
let sample = ['manual'];
let scrape = ['pygmalion', 'diceys', 'coppers', 'house', 'opium rooms', 'krystle', 'dtwo', 'JT Pimms', 'the jar', 'toners', 'the living room', 'whelans']

let venueType = [ ];
let allResult = [ ];

//userChoice will have to be chosen client side. Here we are just using the sample one. 
venueType = sample2


//this tells the OCR webshot to imitate a mobile
let optionsMobile = {
	screenSize: {
		width: 414,
		height: 736
	},
	shotSize: {
		width: 414,
		height: 1400 //this controls how far down the page it scrolls
	},
	userAgent: 'Mozilla/5.0 (iPhone9,4; U; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1'
};


const ws = (venue) => {
	webshot('https://www.google.ie/search?q='+venue+'+dublin', 
	venue+'.png', optionsMobile, function(err) { 
		if (!err) {
			console.log(venue+' screenshot taken')
			ts(venue)
		}
	})
};


const ts = (venue) => {
		Tesseract.recognize(venue+'.png')
  		.then(function (result) {fs.writeFileSync(venue+'.txt', result.text)
  		console.log(venue+' text file created')
  		read(venue)
//    process.exit(0) // if this is removed the command prompt runs forever, it doesn't stop. 
//If it stays in, it stops after the first item in the array
  })
};

const read = (venue) => {
	fs.readFile(venue+'.txt', "utf8", function (err, data) {
	  if (err) throw err;
   		let venueResult = (venue+' - '+(data.slice(data.search("More"),data.search("More")+14))); // this seperates out the result
// Need to do error handling here. If Live is not returned it pushed venue name + 'no live information available' to all result   		
   		allResult.push(venueResult);
   		console.log(allResult); 		
	})
}


// this works but does not end the programme if tesseract is involved 
for (let i = 0; i < venueType.length; i++) {
	let venue = venueType[i]; // this takes the venueName variable from the venueType array and calls it venue
	ws(venue);	 // it then runs venue here through whatever function
	}
;



