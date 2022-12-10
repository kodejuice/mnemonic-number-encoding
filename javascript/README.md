# Usage

## Command line

`node mnemonic.js [number | list of words...]`

```bash
node mnemonic.js 1142404700107262918407392145127590167800812000956
# art bondig binas semien dendrology completion hirudinize fortitude armatured
```

```bash
node mnemonic.js "art bondig binas semien dendrology completion hirudinize fortitude armatured"
# 1142404700107262918407392145127590167800812000956
```

## Module

```javascript
const {encode, decode} = require('./mnemonic.js');

console.log(encode("1142404700107262918407392145127590167800812000956"))
// => "art bondig binas semien dendrology completion hirudinize fortitude armatured"

console.log(decode("art bondig binas semien dendrology completion hirudinize fortitude armatured"))
// => "1142404700107262918407392145127590167800812000956"
```

### _You can also pass in a hex/octal/binary string_

```javascript
console.log(encode("0xc81b32ce5281c5C2b5a53F6bd2425350F081d6bC"))
// => "art bondig binas semien dendrology completion hirudinize fortitude armatured"
```
