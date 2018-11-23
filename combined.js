/*
2/25 days (~18hrs)
+ 6 hrs thur


*/

//this loads the webshot library from program files
let webshot = require('webshot');
let Tesseract = require('tesseract.js');
let fs = require('fs');

//this defines the arrays
let clubs = ['pygmalion', 'diceys', 'coppers', 'house', 'opium rooms', 'krystle', 'dtwo'];
let dates = ['JT Pimms', 'pygmalion', 'the jar'];
let pints = ['toners', 'the living room', 'whelans'];
let sample = [
		{venueName: 'toners', status: 'none' },
		{venueName: 'diceys', status: 'none' }
]

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
		height: 1400
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
//If it stays in, it stops after the first (sams bar)
  })
};

const read = (venue) => {
	fs.readFile(venue+'sample.txt', "utf8", function (err, data) {
	  if (err) throw err;
   		let alltext = data;
   		console.log(venue+' '+(alltext.slice(alltext.search("Live:"),alltext.search("Live:")+15)));
})
}




// this works but does not end the programme if tesseract is involved 
for (let i = 0; i < venueType.length; i++) {
	let venue = venueType[i].venueName; // this takes the venueName variable from the venueType array and calls it venue
	read(venue) // it then runs venue here through whatever function
};




// this runs both the webshot and ocr
// the ocr only wiorks here bc it is part of the if !err clause in the above function
// it does not end the process. No matter where I put process.exit(0) there is a problem
/*
for (let i = 0; i < venueType.length; i++) {
	webshot('https://www.google.ie/search?q='+venueType[i]+'+dublin', 
	venueType[i]+'.png', optionsMobile, function(err) { 
		if (!err) {
			console.log('Screenshot taken!');
	Tesseract.recognize(venueType[i]+'.png')
    .then(function (result) {fs.writeFileSync(venueType[i]+'.txt', result.text, function(err) {
		if (!err) {
		    console.log(err);
		} else {
		    console.log("file written successfully"); // it does not console.log this for some reason
			}
		})
//    process.exit(0) // if this is removed the command prompt runs forever, it doesn't stop. 
//If it stays in, it stops after the first (sams bar)
  		});
		}
	})
};
*/


// this is unneccessary
console.log(venueType.length);

/*
functions in old sytax
function ts(venue) {
		Tesseract.recognize(venue+'.png')
  		.then(function (result) {fs.writeFileSync(venue+'.txt', result.text)
//    process.exit(0) // if this is removed the command prompt runs forever, it doesn't stop. 
//If it stays in, it stops after the first (sams bar)
  })
};


function ws (venue) {
	webshot('https://www.google.ie/search?q='+venue+'+dublin', 
	venue+'.png', optionsMobile, function(err) { 
		if (!err) {
			console.log('Screenshot taken!');
		}
	})
};
*/