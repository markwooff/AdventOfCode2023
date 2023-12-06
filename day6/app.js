var fs = require("fs");
var path = require('path');
var input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
var inputArray = input.split("\n")

function getRacePermutations(raceArray) {
  var time = raceArray[0];
  var distance = raceArray[1];

  var permutations = 0;
  for (var x = 0; x < time; x++) {
    var mmPerS = x;
    var timeLeft = time - x;
    if (mmPerS * timeLeft > distance) {
      permutations++;
    }
  }

  return permutations;
}

// Part 1
var times = inputArray[0].split(":")[1].trim().split(/\s+/);
var distances = inputArray[1].split(":")[1].trim().split(/\s+/);

var races = [];
for (var x = 0; x < times.length; x++) {
  races[x] = [times[x], distances[x]];
}

var permutationsArray = [];
races.forEach(race => {
  var total = getRacePermutations(race);
  permutationsArray.push(total);
});

var multiplied = permutationsArray.reduce( (a, b) => a * b );
console.log("Solution for Part 1 is: " + multiplied);

// Part 2
var time = inputArray[0].split(":")[1].trim().replace(/\s+/g, "");
var distance = inputArray[1].split(":")[1].trim().replace(/\s+/g, "");

var permutations = getRacePermutations([time, distance]);
console.log("Solution for Part 2 is: " + permutations);