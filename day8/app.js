var fs = require("fs");
var path = require('path');
var input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
var inputArray = input.split("\r\n");

// Part 1
var directions = inputArray[0].split("");
var map = inputArray.slice(2).map(line => {
  var [start, left, right] = line.match(/[A-Z]+/g);
  return [start, [left, right]];
});
var directionsObject = Object.fromEntries(map);
var starts = map.filter(i => (i[0][2] === "A")).map(person => person[0]);

function solve(word = "AAA", checkLastLetter = true) {
  var steps = 0;
  while (true) {
    var direction = directions[steps++ % directions.length];
    word = directionsObject[word][direction === "L" ? 0 : 1];
    if (!checkLastLetter && word === "ZZZ") {
      break;
    }

    if (checkLastLetter && word[2] === "Z") {
      break;
    }
  }
  return steps;
}

var result = solve("AAA", false);
console.log("Solution for Part 1 is: " + result);

// Part 2
function gcd(a, b) {
  for (var temp = b; b !== 0;) {
    b = a % b;
    a = temp;
    temp = b;
  }
  return a;
}

function lcm(a, b) {
  var gcdValue = gcd(a, b);
  return (a * b) / gcdValue;
}

result = starts.map(solve).reduce(lcm);
console.log("Solution for Part 2 is: " + result);