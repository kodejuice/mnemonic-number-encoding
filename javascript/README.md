# Usage

## Command line

`node mnemonic.js [number | list of words...]`

```bash
node mnemonic.js 1142404700107262918407392145127590167800812000956
# recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags
```

```bash
node mnemonic.js recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags
# 1142404700107262918407392145127590167800812000956
```

## Module

```javascript
const {encode, decode} = require('./mnemonic.js');

console.log(encode("1142404700107262918407392145127590167800812000956"))
// => "recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags"

console.log(decode("recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags"))
// => "1142404700107262918407392145127590167800812000956"
```

### _You can also pass in a hex/octal/binary string_

```javascript
console.log(encode("0xc81b32ce5281c5C2b5a53F6bd2425350F081d6bC"))
// => "recombining mantech vituline intenseness hankard dispondaic crenna baguettes kags"
```
