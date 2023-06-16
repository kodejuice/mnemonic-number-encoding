# Usage

## Command line

`python mnemonic.py [number | list of words...]`

```bash
python mnemonic.py 1142404700107262918407392145127590167800812000956
# recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags
```

```bash
python mnemonic.py recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags
# 1142404700107262918407392145127590167800812000956
```

## Module

```python
from mnemonic import encode, decode

print(encode("1142404700107262918407392145127590167800812000956"))
# => "recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags"

print(decode("recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags"))
# => "1142404700107262918407392145127590167800812000956"
```

### _You can also pass in a hex/octal/binary string_

```python
print(encode("0xc81b32ce5281c5C2b5a53F6bd2425350F081d6bC"))
// => "recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags"
```
