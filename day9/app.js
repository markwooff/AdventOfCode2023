var fs = require("fs");
var path = require('path');
var input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
var inputArray = input.split("\n");

var values = [], extrapolations = [], result = 0;

// Part 1
const getValuesArray = (values) => {
  return values.split(" ").map(x => parseInt(x));
};

const getDifferences = (values) => {
  var differences = [values];

  while (differences[differences.length - 1].some(n => n !== 0)) {
    var tempArray = differences[differences.length - 1];
    var lineDifferences = [];
    for (var x = 1; x < tempArray.length; x++) {
      lineDifferences.push(tempArray[x] - tempArray[x - 1]);
    }
    differences.push(lineDifferences);
  }

  return differences;
};

values = inputArray.map(getValuesArray).map(getDifferences);

const extrapolate = (values) => {
  var differences = values.map(i => [...i]);

  differences[differences.length - 1].push(0);
  for (var x = differences.length - 2; x >= 0; x--) {
    differences[x].push(
      differences[x][differences[x].length - 1] + differences[x + 1][differences[x + 1].length - 1]
    );
  }

  return differences[0][differences[0].length - 1];
};

extrapolations = values.map(extrapolate);
result = extrapolations.reduce((a, b) => a + b);
console.log("Solution for Part 1 is: " + result);

// Part 2
const extrapolateBackwards = (values) => {
  var differences = values.map(i => [...i]);

  differences[differences.length - 1] = [0, ...differences[differences.length - 1]];
  for (var x = differences.length - 2; x >= 0; x--) {
    differences[x] = [differences[x][0] - differences[x + 1][0], ...differences[x]];
  }

  return differences[0][0];
};

extrapolations = values.map(extrapolateBackwards);
result = extrapolations.reduce((a, b) => a + b);
console.log("Solution for Part 2 is: " + result);