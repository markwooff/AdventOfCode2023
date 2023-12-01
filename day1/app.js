var fs = require("fs");
var path = require('path');
var input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
var inputArray = input.split("\n")

// Part 1
var numberArray = [];
inputArray.forEach(line => {
    first = line.match(/\d/).pop();
    last = line.match(/\d/g).slice(-1);

    output = parseInt(first + '' + last);
    numberArray.push(output);
});

var total = 0;
numberArray.forEach(number => {
    total = total + number;
});
console.log("Solution for Part 1 is: " + total);

// Part 2
const wordToNum = (str) => {
    const legend = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    return str.toLowerCase().split(" ").reduce((acc, val) => {
        const index = legend.indexOf(val);
        return (acc * 10 + index);
    }, 0);
};

function is_numeric(str) {
    return /^\d+$/.test(str);
}

var numberArray = [];
inputArray.forEach(line => {
    captures = line.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/g);
    first = captures[0];
    if (!is_numeric(first)) {
        first = wordToNum(first);
    }
    last = captures.pop();
    if (!is_numeric(last)) {
        last = wordToNum(last);
    }
    
    output = parseInt(first + '' + last);
    numberArray.push(output);
});

var total = 0;
numberArray.forEach(number => {
    total = total + number;
});
console.log("Solution for Part 2 is: " + total);