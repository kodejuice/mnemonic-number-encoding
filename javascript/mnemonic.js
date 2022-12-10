#!/usr/bin/env node

// Mnemonic Number Encoding
//
// This project is licensed under the MIT license.
// For more information, see https://opensource.org/licenses/MIT.

const wordslist = require("../words-list.json");

const isModule = require.main !== module;
// map each word to its index
const wordsindex = {};
wordslist.map((word, index) => {
  wordsindex[word] = index;
});

// encode number into list of words
const encode = (number) => {
  if (!Number.isInteger(+number)) {
    if (!isModule) console.log("Invalid number");
    return null;
  }

  const words = [];
  const number_to_encode = BigInt(number);

  // Calculate the maximum bit length of the binary representation
  // of the numbers in the wordslist
  const maxBitLength = Number(Math.log2(wordslist.length));

  const binary_string = number_to_encode.toString(2).split("");

  // Initialize the current string of bits with '1'
  // to avoid binary strings starting with '0'
  let curr = "1";

  for (let i = 0; i < binary_string.length; i++) {
    const top = binary_string[i];

    // If the current string of bits is less than the max bit length
    // and the current string plus the next bit can be converted to
    // a valid index for the wordslist array, append the next bit
    if (
      curr.length < maxBitLength &&
      parseInt(curr + top, 2) < wordslist.length
    ) {
      curr += top;
    }
    // Otherwise, convert the current binary string to decimal and append the
    // word at that index then reset the current string with the next bit
    else {
      words.push(wordslist[parseInt(curr, 2)]);
      curr = "1" + top;
    }
  }

  if (curr.length) {
    words.push(wordslist[parseInt(curr, 2)]);
  }

  return words.join(" ");
};

// decode list of words into a number
const decode = (word_list) => {
  // Make sure the word_list argument is a valid array or string
  if (!Array.isArray(word_list) && typeof word_list !== "string") {
    if (!isModule) console.log("Invalid input");
    return null;
  }

  // If the word_list argument is a string, split it by non-alphabetical characters
  let words = (
    Array.isArray(word_list) ? word_list : word_list.split(/[^a-z]+/i)
  ).map((w) => w.toLowerCase());

  let binary_string = "";
  for (const word of words) {
    if (!(word in wordsindex)) {
      if (!isModule) console.error(`'${word}' not found in word list`);
      return null;
    }
    const wordIndexBits = wordsindex[word].toString(2).slice(1);
    binary_string += wordIndexBits;
  }

  return BigInt(`0b${binary_string}`).toString();
};

module.exports = {
  encode,
  decode,
};

(function main(argv) {
  if (isModule) return;
  if (argv.length < 3) {
    return console.error(
      `Provide a number to encode, or a list of words to decode`
    );
  }

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
