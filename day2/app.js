var fs = require("fs");
var path = require('path');
var input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
var inputArray = input.split("\n")

// Part 1
const redCubes = 12, greenCubes = 13, blueCubes = 14;

function isPossible(pulls) {
    var reds = 0, greens = 0, blues = 0, valid = true;

    pulls.forEach(pull => {
        var hasReds = pull.match(/(\d+)( red)/);
        if (Array.isArray(hasReds)) {
            reds = parseInt(hasReds[1]);
        }
        var hasBlues = pull.match(/(\d+)( blue)/);
        if (Array.isArray(hasBlues)) {
            blues = parseInt(hasBlues[1]);
        }
        var hasGreens = pull.match(/(\d+)( green)/);
        if (Array.isArray(hasGreens)) {
            greens = parseInt(hasGreens[1]);
        }

        if (reds > redCubes || blues > blueCubes || greens > greenCubes) {
            valid = false;
        }
    });

    return valid;
}

var sum = 0;
inputArray.forEach(line => {
    var gameId = parseInt(line.match(/\d+/)[0]);
    var game = line.match(/(Game \d+:\s*)(.*)/).pop();
    var pulls = game.split('; ');
    
    var result = isPossible(pulls);
    if (result) {
        sum += gameId;
    }
});
console.log("Solution for Part 1 is: " + sum);

// Part 2
function getPower(pulls) {
    var reds = 0, greens = 0, blues = 0, minRedCubes = 0, minGreenCubes = 0, minBlueCubes = 0;

    pulls.forEach(pull => {
        var hasReds = pull.match(/(\d+)( red)/);
        if (Array.isArray(hasReds)) {
            reds = parseInt(hasReds[1]);
            if (minRedCubes < reds) {
                minRedCubes = reds;
            }
        }
        var hasBlues = pull.match(/(\d+)( blue)/);
        if (Array.isArray(hasBlues)) {
            blues = parseInt(hasBlues[1]);
            if (minBlueCubes < blues) {
                minBlueCubes = blues;
            }
        }
        var hasGreens = pull.match(/(\d+)( green)/);
        if (Array.isArray(hasGreens)) {
            greens = parseInt(hasGreens[1]);
            if (minGreenCubes < greens) {
                minGreenCubes = greens;
            }
        }
    });

    return minRedCubes * minBlueCubes * minGreenCubes;
}

var sum = 0;
inputArray.forEach(line => {
    var game = line.match(/(Game \d+:\s*)(.*)/).pop();
    var pulls = game.split('; ');
    
    sum += getPower(pulls);
});
console.log("Solution for Part 2 is: " + sum);