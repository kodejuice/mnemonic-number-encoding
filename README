# Mnemonic Coding

A method of encoding numbers into a sequence of words.

The mnemonic coding system uses a dictionary of words to encode numbers. The binary representation of the number is divided into chunks, and each chunk is converted into a word from the dictionary. This allows for easy storage and reproduction of the encoded number, as it can be easily typed as a sequence of words.

One advantage of this system is that it allows for the encoding of numbers of any bit length, rather than just numbers with a bit length that is a multiple of 32, as is the case with [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).

Additionally, the words used in the mnemonic code do not need to be easy to remember, as the emphasis is on encoding the number in as short a sequence of words as possible.

## Motiviation

Mnemonic coding is useful when you want an easy way to encode and store a number in a format that is easy to reproduce.

For example, you might want to encode a secret key, an account number, a crypto wallet address or any other sensitive information into a sequence of words that is easy to type in.

## How it works

### Encoding

Mnemonic coding works by taking a number and converting it into a sequence of words. It does this by dividing the number into chunks of bits, and then converting each chunk into a word from a dictionary.

E.g

To encode `901198405855353948`

We'd take its binary representation which is
`110010000001101100110010110011100101001010000001110001011100`

Then in order to make the sequence of words as short as possible we dont split the bits into a specific number of chunks rather we split it into chunks where every chunk is less than our wordlist length.

So if our wordlist length is `610_000`

We'd split into chunks where the decimal representation of each is less than that:

**1**110010000001101100  _(467\_052)_

**1**110010110011100101  _(470\_25)_

**1**0010100000011100010 _(606\_434)_

**1**11100  _(60)_

If you notice, a bit '**`1`**' has been added to the beginning of every chunk, this is to prevent chunks to begin with a `0`.

Since the decimal representation of these chunks are indexes to a word in a dictionary, they must not start with a `0`. If they did we wont be able to recover the original bit string from a word that it maps to.

If a chunk was `0010` which is `2` in decimal, we can't recover the original bitstring if we had just the number `2`, because it could also have been `010`, `00010` or even just `10` which are all `2` in decimal, so we prefix each chunk with a `1` to avoid this.

Finally we use the chunks as indexes into our wordslist dictionary.

Sample output:
`art bondig binas amalgamater`

### Decoding

To decode a mnemonic code, the process is simply reversed. We take the index of each word in our wordslist dictionary, get its binary representation, then we remove the first bit we added in the encoding stage, and concatenate these binary strings together and convert the resulting string to decimal which would be the same as the original number that was encoded.

```python
# Function to decode a mnemonic code
def decode(mnemonic):
    # Convert the mnemonic code into a list of words
    words = mnemonic.split()
    
    # Convert each word into its corresponding index in the wordslist dictionary
    indices = [wordslist.index(word) for word in words]
    
    # Convert each index into its binary representation
    binary_strings = [bin(index)[2:] for index in indices]
    
    # Remove the first bit that was added during the encoding process
    binary_strings = [s[1:] for s in binary_strings]

    # Concatenate the binary strings into a single string
    binary_string = ''.join(binary_strings)

    # Convert the binary string into a decimal number
    decoded_number = int(binary_string, 2)
    
    return decoded_number
```

## Wordlist

A large word dictionay is used, this makes the sequence of words outputted small. There are no constraints on the word selection, so the words are not necessarily easy to remember, some words aren't even in the english dictionary.

The only constraint on the word selection is that each word must have less than 13 letters and must be easily reproducible. This allows for a compact representation of the encoded number, but it also means that the encoded number may not be easy to remember for some users. It is important to keep this in mind when using the mnemonic coding system.

There are currently over 600k words in the [dictionary](./words-list.json).

The words have been collated from several sources:

- <https://github.com/dariusk/corpora/tree/master/data/words>
- <https://github.com/aruljohn/popular-baby-names/>
- <https://github.com/dwyl/english-words/blob/master/words_alpha.txt>
- <https://sourceforge.net/projects/cracklib/files/cracklib-words/>

## Usage

It is important to note that the mnemonic coding system is not designed to provide security, but rather to make it easy to encode and store numbers in a way that is easy to reproduce. It is not intended to be used as a secure method of encrypting sensitive information.

> Sample usage in JavaScript

```javascript
const {encode, decode} = require('./javascript/mnemonic.js');

console.log(encode("1142404700107262918407392145127590167800812000956"))
// => "art bondig binas semien dendrology completion hirudinize fortitude armatured"

console.log(decode("art bondig binas semien dendrology completion hirudinize fortitude armatured"))
// => "1142404700107262918407392145127590167800812000956"
```

The implementation of the mnemonic coding system is available in several different programming languages in this repository.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.
