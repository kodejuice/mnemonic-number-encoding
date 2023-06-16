#!/usr/bin/env node

// This is a script for a Mnemonic Number Encoding system
// The MIT License (MIT) - https://opensource.org/licenses/MIT

// Import words list JSON and check whether script is run as a module or standalone
const wordslist = require("../words-list.json");
const isModule = require.main !== module;

// Map each word in the words list to its respective index
const wordsindex = {};
wordslist.map((word, index) => {
  wordsindex[word] = index;
});

// Count the total number of words in the words list
const wordsCount = BigInt(wordslist.length);

// Function to encode a number into a list of words
const encode = (number) => {
  // Check if input is a number
  if (!Number.isInteger(+number)) {
    if (!isModule) console.log("Invalid number");
    return null;
  }

  const words = [];
  let number_to_encode = BigInt(number);

  // Convert the number to a list of words
  while (number_to_encode) {
    words.push(wordslist[number_to_encode % wordsCount]);
    number_to_encode /= wordsCount;
  }

  // Return the encoded words list
  return words.reverse();
};

// Function to decode a list of words back into a number
const decode = (word_list) => {
  // Check if input is a string or array
  if (!Array.isArray(word_list) && typeof word_list !== "string") {
    if (!isModule) console.log("Invalid input");
    return null;
  }

  let number = 0n;
  let l = BigInt(word_list.length - 1);
  for (let i = 0; i < word_list.length; ++i) {
    const word = word_list[i];

    // Check if word exists in the word index
    if (!(word in wordsindex)) {
      if (!isModule) console.error(`'${word}' not found in word list`);
      return null;
    }

    // Convert the list of words back into a number
    const v = wordsindex[word];
    number += BigInt(v) * wordsCount ** l;
    l -= 1n;
  }

  // Return the decoded number
  return number;
};

// Export the functions for usage in other scripts if this script is used as a module
module.exports = {
  encode,
  decode,
};

// Main function for command line usage
(function main(argv) {
  if (isModule) return;
  if (argv.length < 3) {
    return console.error(
      `Provide a number to encode, or a list of words to decode`
    );
  }

  // Check if the first argument is a number or string
  // And encode or decode accordingly
  let res;
  const args = argv.slice(2);
  if (isNaN(args[0])) {
    res = decode(args);
  } else {
    res = encode(args[0]);
  }

  if (res) {
    console.log(res);
  }
})(process.argv);
