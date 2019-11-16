#### 参考
- [typescript 结合eslint和prettier](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)

"test": "echo \"Error: run tests from root\" && exit 1",
    "build": "npm run build:es2015 && npm run build:esm && npm run build:cjs",
    "build:es2015": "tsc --module es2015 --target es2015 --outDir dist/es2015",
    "build:esm": "tsc --module es2015 --target es5 --outDir dist/esm",
    "build:cjs": "tsc --module commonjs --target es5 --outDir dist/cjs",
    "lint": "eslint . --color",
    "lint:fix": "eslint . --fix"

####  alloy团队 typescript react eslint
```
'alloy',
'alloy/react',
'alloy/typescript',
```
#### jest enzyme -> eslint-config-jest-enzyme

#### eslint关于ts的错误
[数字、字符串或布尔值自动推导](https://hexuanzhang.com/2316520030.html)
```
Type string trivially inferred from a string literal, remove type annotation (no-inferrable-types)
```