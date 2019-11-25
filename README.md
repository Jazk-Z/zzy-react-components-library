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

- [ x ] 处理样式
```
ESNext

babel 7 & @babel/typescript
"build": "tsc --emitDeclarationOnly && babel src --out-dir lib --extensions \".ts,.tsx\""

"check:ts": "tsc --noEmit --pretty",
    "check:ts:watch": "npm run check:ts -- --watch"

    1）Namespace
解决方案：不要用！它们已经是过时的了。改用标准的 ES6 module（import/export），在推荐的 tslint 规则中也建议不要使用 namesapce。
2）使用 <newtype>x 语法转换类型
解决方案：改用 x as newtype 。
3）const 枚举
这个锅没得甩，目前只能用常规的枚举，期待未来能够支持。
4）历史遗留风格的 import/export 语法
比如：import foo = require(...) 和 export = foo。
```