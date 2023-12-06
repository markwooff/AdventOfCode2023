var fs = require("fs");
var path = require('path');
var input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

// Part 1
const parseNumbers = (str) => {
  return str.split(' ').filter(x => x !== '').map(x => parseInt(x));
};

const groupNumbers = (numbers, grouping) => {
  return Array.from(
    { length: numbers.length / grouping },
    (_, x) => numbers.slice(x * grouping, x * grouping + grouping)
  )
};

function getSeedLocation(step) {
  for (almanacEntry of almanac) {
    for ([destination, source, length] of almanacEntry) {
      if (source <= step && source + length > step) {
        step = destination + step - source;
        break;
      }
    }
  }

  return step;
}

var inputArray = input.replaceAll(/\r\n(\d)/g, ' $1')
  .split("\r\n")
  .filter(x => x !== '')
  .map(x => parseNumbers(x.split(':')[1]));
var seeds = inputArray[0];
var almanac = inputArray.slice(1).map(y => groupNumbers(y, 3));

var location = Math.min(...seeds.map(z => getSeedLocation(z)));
console.log("Solution for Part 1 is: " + location);

// Part 2
var seedRanges = groupNumbers(seeds, 2);
const checkForSeed = (seed) => {
  return seedRanges.some(([seedStart, length]) => seedStart <= seed && seedStart + length >= seed);
};

function getSeedGivenLocation(step) {
  for (almanacEntry of almanac.slice().reverse()) {
    for ([destination, source, length] of almanacEntry) {
      if (destination <= step && destination + length > step) {
        step = source + step - destination;
        break;
      }
    }
  }

  return step;
}

var result = 0;
for (var x = 0; x < 1000000000; x++) {
  var seed = getSeedGivenLocation(x);

  if (checkForSeed(seed)) {
    result = x;
    break;
  }
}
console.log("Solution for Part 2 is: " + result);