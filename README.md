# Mnemonic Number Encoding

A method of encoding numbers into a sequence of words.

The mnemonic coding system uses a dictionary of words to encode numbers, this allows for easy storage and reproduction of the encoded number, as it can be easily typed as a sequence of words.

One advantage of this system is that it allows for the encoding of numbers of any bit length, rather than just numbers with a bit length that is a multiple of 32, as is the case with [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).

Additionally, the words used in the mnemonic code do not need to be easy to remember, as the emphasis is on encoding the number in as short a sequence of words as possible.

## Motiviation

Mnemonic number encoding is useful when you want an easy way to encode and store a number in a format that is easy to reproduce.

For example, you might want to encode a secret key, an account number, a crypto wallet address or any other sensitive information into a sequence of words that is easy to type in.

## How it works

The encoding process treats the number as if it were in base `n`, where `n` is the number of words in the list. Each digit in this base `n` number corresponds to a word from the words list.

The decoding process reverses this operation by converting each word back into its corresponding "digit" and treating the sequence of "digits" as a number in base `n`.

This process allows any integer to be represented as a sequence of words, and any sequence of words (that are all in the words list) to be represented as an integer.

## Wordlist

A large word dictionay is used, this makes the sequence of words outputted small. There are no much constraints on the word selection, so the words are not necessarily easy to remember, some words aren't even in the english dictionary.

The only constraint on the word selection is that each word must have less than 13 letters and must be easily reproducible. This allows for a compact representation of the encoded number, but it also means that the encoded number may not be easy to remember for some users. It is important to keep this in mind when using the mnemonic coding system.

There are currently over 600k words in the [dictionary](./words-list.json).

The words have been collated from several sources:

- <https://github.com/dariusk/corpora/tree/master/data/words>
- <https://github.com/aruljohn/popular-baby-names/>
- <https://github.com/dwyl/english-words/blob/master/words_alpha.txt>
- <https://sourceforge.net/projects/cracklib/files/cracklib-words/>
- Pythons nltk package `nltk.corpus.words.words()`

## Usage

It is important to note that the mnemonic coding system is not designed to provide security, but rather to make it easy to encode and store numbers in a way that is easy to reproduce. It is not intended to be used as a secure method of encrypting sensitive information.

### Command Line

When running the script from the command line, you should provide either a number to encode or a list of words to decode as arguments:

`node mnemonic.js [number | list of words...]`

```bash
node mnemonic.js 1142404700107262918407392145127590167800812000956
# recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags
```

```bash
node mnemonic.js recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags
# 1142404700107262918407392145127590167800812000956
```

### Importing as a module

```javascript
const { encode, decode } = require("./javascript/mnemonic.js");

console.log(encode("1142404700107262918407392145127590167800812000956"));
// => "recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags"

console.log(
  decode(
    "recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags"
  )
);
// => "1142404700107262918407392145127590167800812000956"
```

<!-- The implementation of the mnemonic coding system is available in several different programming languages in this repository. -->

## Contributing

If you have implemented a version of the mnemonic coding system in a language that is not already present in this repository, you can submit a pull request to add your implementation. If you find a bug, please don't hesitate to create an issue.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.
