var Tesseract = require('tesseract.js');
var filename = 'manual.png';
const fs = require('fs');

Tesseract.recognize(filename)
  .then(function (result) {fs.writeFileSync('vianodejs.txt', result.text, function(err) {
		if (err) {
		    console.log(err);
		} else {
		    console.log("file written successfully");
			}
		})

    process.exit(0)
  })