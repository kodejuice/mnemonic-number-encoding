#!/usr/bin/env python

# Mnemonic Number Encoding
#
# This project is licensed under the MIT license.
# For more information, see https://opensource.org/licenses/MIT.

import json
import re
from math import log2
from sys import argv

wordslist = json.loads(open('../words-list.json').read())
is_not_module = __name__ == '__main__'

# map each word to its index
words_index = {word: index for index, word in enumerate(wordslist)}

# check if a number is numeric and return its base
def isnumeric(number):
  number = str(number)
  if number.isnumeric():
    return 10
  
  regex = {
    2: r"^0b[01]+$",
    8: r"^0o[0-7]+$",
    16: r"^0x[0-9A-Fa-f]+$",
    32: r"^0v[0-9A-Z]+$",
    64: r"^0n[0-9A-Za-z+/]+$",
  }

  for base in regex:
    if re.match(regex[base], number):
      return base

  return False

# encode number into list of words
def encode(number):
  base = isnumeric(number)
  if not base:
    if is_not_module:
      print('Invalid number')
    return None

  words = []
  number_to_encode = int(number, base)
  # Calculate the maximum bit length of the binary representation
  # of the numbers in the wordslist
  max_bit_length = int(log2(len(wordslist)))

  binary_string = bin(number_to_encode)[2:]

  # Initialize the current string of bits with '1'
  # to avoid binary strings starting with '0'
  curr = '1'

  for bit in binary_string:
    top = bit
    # If the current string of bits is less than or equal the max bit length
    # and the current string plus the next bit can be converted to
    # a valid index for the wordslist array, append the next bit
    if len(curr) <= max_bit_length and int(curr + top, 2) < len(wordslist):
      curr += top
    # Otherwise, convert the current binary string to decimal and append the
    # word at that index then reset the current string with the next bit
    else:
      words.append(wordslist[int(curr, 2)])
      curr = '1' + top

  if len(curr):
    words.append(wordslist[int(curr, 2)])

  return ' '.join(words)

# decode list of words into a number
def decode(word_list):
  # Make sure the word_list argument is a valid array or string
  if not isinstance(word_list, (list, str)):
    if is_not_module:
      print('Invalid input')
    return None

  words = word_list
  # If the word_list argument is a string, split it by non-alphabetical characters
  if isinstance(word_list, str):
    words = re.split(r"[^a-z]+", word_list)
  words = [word.lower() for word in words]

  binary_string = ''
  for word in words:
    if word not in words_index:
      if is_not_module:
        print(f"'{word}' not found in word list")
      return None
    # convert to binary string and remove first bit
    word_index_bits = bin(words_index[word])[3:]
    binary_string += word_index_bits

  return int(binary_string, 2)


if is_not_module:
  if len(argv) < 2:
    print('Provide a number to encode, or a list of words to decode')
  else:
    args = argv[1:]
    if args[0].isalpha():
      res = decode(args)
    else:
      res = encode(args[0])

    if res:
      print(res)
