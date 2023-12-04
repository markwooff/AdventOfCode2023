var fs = require("fs");
var path = require('path');
var input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
var inputArray = input.split("\n")

var sum = 0, copies = [], amountOfCards = 0;

inputArray.forEach((line, lineNum) => {
    var [cardId, body] = line.split(': ');
    var [winningNumbers, ourNumbers] = body.split(' | ').map(str => str.match(/\d+/g).map(Number));

    var score = -1;
    ourNumbers.forEach(number => {
        if (winningNumbers.includes(number)) {
            score++;
        }
    })

    if (score > -1) {
        sum += Math.pow(2, score);
    }

    if (copies[lineNum] === undefined) {
        copies[lineNum] = 1;
    }

    for (var x = 0; x < score + 1; x++) {
        if (copies[lineNum + x + 1] === undefined) {
            copies[lineNum + x + 1] = 1;
        }
        copies[lineNum + x + 1] += copies[lineNum];
    }
});

console.log("Solution for Part 1 is: " + sum);

amountOfCards = copies.reduce((sum, value) => sum + value, 0);
console.log("Solution for Part 2 is: " + amountOfCards);