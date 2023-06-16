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

const wordsCount = BigInt(wordslist.length);

// encode number into list of words
const encode = (number) => {
  if (!Number.isInteger(+number)) {
    if (!isModule) console.log("Invalid number");
    return null;
  }

  const words = [];
  let number_to_encode = BigInt(number);

  while (number_to_encode) {
    words.push(wordslist[number_to_encode % wordsCount]);
    number_to_encode /= wordsCount;
  }

  return words.reverse();
};

// decode list of words into number
const decode = (word_list) => {
  // Make sure the word_list argument is a valid array or string
  if (!Array.isArray(word_list) && typeof word_list !== "string") {
    if (!isModule) console.log("Invalid input");
    return null;
  }

  let number = 0n;
  let l = BigInt(word_list.length - 1);
  for (let i = 0; i < word_list.length; ++i) {
    const word = word_list[i];

    if (!(word in wordsindex)) {
      if (!isModule) console.error(`'${word}' not found in word list`);
      return null;
    }

    const v = wordsindex[word];
    number += BigInt(v) * wordsCount ** l;
    l -= 1n;
  }

  return number;
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
