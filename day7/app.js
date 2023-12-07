var fs = require("fs");
var path = require('path');
var input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
var inputArray = input.split("\n")

function getCardFrequency(cards) {
  var frequencies = {};
  for (var x = 0; x < cards.length; x++) {
    var card = cards[x];
    if (frequencies[card]) {
      frequencies[card]++;
    } else {
      frequencies[card] = 1;
    }
  }

  return frequencies;
};

function sortHand(a, b) {
  for (var x = 0; x < a.length; x++) {
    if (a[x] !== b[x]) {
      return b[x] - a[x];
    }
  }
  return 0;
}

// Part 1
var ordering = "23456789TJQKA";
var result = inputArray.map(line => {
  var [cards, bid] = line.split(" ");
  var cardValues = cards.split("").map(card => ordering.indexOf(card));
  var frequencies = getCardFrequency(cardValues);

  var handHashmap = Object.values(frequencies).sort((a, b) => b - a);

  return { sort: handHashmap.concat(cardValues), bid: Number(bid) }
}).sort((a, b) => {
  return sortHand(b.sort, a.sort);
}).map((hand, index) => {
  return hand.bid * (index + 1);
}).reduce((sum, a) => sum + a, 0);

console.log("Solution for Part 1 is: " + result);

// Part 2
var ordering = "J23456789TQKA";
var result = inputArray.map(line => {
  var [cards, bid] = line.split(" ");
  var cardValues = cards.split("").map(card => ordering.indexOf(card));
  var frequencies = getCardFrequency(cardValues);

  var jokers = frequencies["0"];
  delete frequencies["0"];

  var handHashmap = Object.values(frequencies).sort((a, b) => b - a);
  if (jokers) {
    if (handHashmap[0] == null || handHashmap[0] == undefined) {
      handHashmap[0] = 0;
    }
    handHashmap[0] += jokers;
  }

  return { sort: handHashmap.concat(cardValues), bid: Number(bid) }
}).sort((a, b) => {
  return sortHand(b.sort, a.sort);
}).map((hand, index) => {
  return hand.bid * (index + 1);
}).reduce((sum, a) => sum + a, 0);

console.log("Solution for Part 2 is: " + result);