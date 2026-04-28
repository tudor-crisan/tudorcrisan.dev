const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('public/cv.pdf');

pdf(dataBuffer).then(function(data) {
    process.stdout.write(data.text);
}).catch(err => {
    process.stderr.write(err.toString());
});
