#!/usr/bin/env python3

# This is a script for a Mnemonic Number Encoding system
# The MIT License (MIT) - https://opensource.org/licenses/MIT

import re
import sys
import json

# Load word list
wordslist = json.loads(open('../words-list.json').read())
words_count = len(wordslist)
is_not_module = __name__ == '__main__'

# Create word to index mapping
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

def encode(number):
  """Encode a number into a list of words"""
  base = isnumeric(number)
  if not base:
    if is_not_module:
      print('Invalid number')
    return None

  # Convert the number to a list of words
  words = []
  number_to_encode = int(number, base)
  while number_to_encode > 0:
    words.append(wordslist[number_to_encode % words_count])
    number_to_encode //= words_count

  # Return the encoded words list
  return " ".join(reversed(words))


def decode(word_list):
  """Decode a list of words into a number"""

  # Make sure the word_list argument is a valid array or string
  if not isinstance(word_list, (list, str)):
    if is_not_module:
      print('Invalid input')
    return None

  number = 0
  for i, word in enumerate(reversed(word_list)):
    if word not in words_index:
      print(f"'{word}' not found in word list")
      return None

    v = words_index[word]
    number += v * (words_count ** i)

  return number


# Check if the first argument is a number or string
# And encode or decode accordingly
if __name__ == "__main__":
  if len(sys.argv) < 2:
    print('Provide a number to encode, or a list of words to decode')
    sys.exit(1)

  res = None
  args = sys.argv[1:]
  if args[0].isalpha():
    res = decode(args)
  else:
    res = encode(args[0])
  if res:
    print(res)
