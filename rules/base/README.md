# 規則

此份文件為規則詳述，每一個區塊對照到同路徑下的 JS 配置檔，你可以根據你的需求做修改：

## [Base](./base.js)

### `no-var`

盡量使用 `let` 與 `const` 宣告變數，而非使用 `var`


**不好的範例 [X]：**
```javascript
// Bad
var foo = 1
```

**好的範例 [O]：**
```javascript
// Good
let foo = 1
const bar = 'hello'
```

`const` 與 `let` 使用 block 作為變數的生存範圍，能更有效的避免變數間的相互污染，而 `var` 則是以 function 作為變數的生存範圍，舉個例子：

**不好的範例 [X]：**
```js
const i = 'hi'

for (var i = 0; i < 3; i++) {

}

console.log(i) 
// SyntaxError: Identifier 'i' has already been declared
```

出現錯誤，使用 `const` 宣告的 `i` 與使用 `var` 宣告的 `i` 處於同一作用域，造成衝突與污染。


**好的範例 [O]：**
```js
const i = 'hi'

for (let i = 0; i < 3; i++) {

}

console.log(i) // -> 'hi'
```


正確印出 `hi`，使用 `const` 宣告的 `i` 與使用 `let` 宣告的 `i` 處於不同的作用域，`let` 使用最近的 block 區分作用域，造成兩個 `i` 變數彼此不造成污染。


參見：https://eslint.org/docs/rules/no-var

---

### `accessor-pairs`

對於構造函式，需同時設置 getter/setter，setter 應該有一 getter 與其做搭配，他們需要同時存在


**不好的範例 [X]：**
```javascript
// Bad
const obj = {
    set a(value) {
        this.val = value
    }
}
```
**好的範例 [O]：**
```javascript
// Good
const obj = {
    set a(value) {
        this.val = value
    }

    get a() {
        return this.val
    }
}
```
在上述的範例中，儘管你可以不靠 getter 來直接取得 `obj.val` 的值，如 `console.log(obj.val)`，但仍不建議如此做。

參見：https://eslint.org/docs/rules/accessor-pairs

---

### `array-bracket-spacing`

表達陣列時，禁止在 `[]` 內添加空格


**不好的範例 [X]：**
```javascript
// Bad
const arr = [ 'a']
const arr = ['a', 'b' ] 
```

**好的範例 [O]：**
```javascript
// Good
const arr = ['a']
const arr = ['a', 'b']
const arr = [
    'a',
    'b'
]
```
當陣列中有兩個兩個元素以上時，`,` 後方加空格是好的習慣，但元素後方不建議加空格。

參見：https://eslint.org/docs/rules/array-bracket-spacing

---

### `array-callback-return`

在 `Array.prototype` 相關需要回傳值的 method，需要有明確回傳值：


**不好的範例 [X]：**
```javascript
// Bad
const arr = [1,2,3]
const newArr = arr.map(element => {
    element + 1
})

const newArr = arr.map(element => {
    if(element > 1) {
        return element + 1
    } 
})

const newArr = arr.filter(element => {
    if(element > 2) {
        return element
    } else {
        return
    }
})
```

**好的範例 [O]：**
```javascript
// Good
const arr = [1,2,3]
const newArr = arr.map(element => {
    return element + 1
})

const newArr = arr.map(element => {
    if(element > 1) {
        return element + 1
    } else {
        return element
    }
})

const newArr = arr.filter(element => {
    if(element > 2) {
        return element
    } 
})
```
以 `Array.prototype.map` 來說，此方法會回傳相同長度的陣列，如果沒有正確對於每個元素做處理，則會回傳 `undefined`，這樣做是不好的

而以 `Array.prototype.filter` 來說，符合條件的元素才會被回傳至新產生的陣列之中，在錯誤範例中，對於不符合條件的回傳值沒有特別指定，這樣的做法會導致回傳 `undefined`，同樣不被允許。

參見：https://eslint.org/docs/rules/array-callback-return

---

### `arrow-spacing`

表達箭頭函式時，須在符號之間以空格區隔，以增加可讀性

**不好的範例 [X]：**
```javascript
// Bad
()=> {}
() =>{}
(a)=> {}
(a) =>{}
a =>a
a=> a
(val)=> { console.log(val) }
(val) =>{ console.log(val) }
(val)=>{ console.log(val) }
```

**好的範例 [O]：**
```javascript
// Good
() => {}
(a) => {}
a => a
(val) => { console.log(val) }
```
參見：https://eslint.org/docs/rules/arrow-spacing

---

### `block-spacing`

花括弧 `{ }` 旁邊需要以空格區隔，增加可讀性

**不好的範例 [X]：**
```javascript
// Bad
function a() {return true}

if (a) { b = 0}

function b() {let a = 0
    return a
}
```

**好的範例 [O]：**
```javascript
// Good
function a() { return true }

if (a) { b = 0 }

function b() {
    let a = 0
    return a
}
```
參見：https://eslint.org/docs/rules/block-spacing

---

### `comma-spacing`

逗號 `,` 後方需要以空格區隔，並且 `,` 前方不可有空格，增加可讀性

**不好的範例 [X]：**
```javascript
// Bad
var a = 1 ,b = 2

var arr = [1 , 2]

var obj = { "foo": "bar" ,"baz": "qur" }

foo(a ,b)

new Foo(a ,b)

function foo(a ,b) { }

a ,b
```

**好的範例 [O]：**
```javascript
// Good
var a = 1, b = 2

var arr = [1, 2]

var obj = { "foo": "bar", "baz": "qur" }

foo(a, b)

new Foo(a, b)

function foo(a, b) { }

a, b
```

參見：https://eslint.org/docs/rules/comma-spacing

---

### `computed-property-spacing`

在表示物件屬性的 `[]` 方式中強制添加空格或絕不添加空格，此份標準為不添加空格 (`'never'`)

**不好的範例 [X]：**
```javascript
// Bad
let obj = {
    a: 1,
    b: 2
}

obj[ a]
obj['b' ]
obj[ 'b' ]
obj[ a ]
```

**好的範例 [O]：**
```javascript
// Good
let obj = {
    a: 1,
    b: 2
}

obj[a]
obj['b']
obj['b']
obj[a]
```

附帶一提，若設定為 `'always'`，則將強制檢測格式如下：

```javascript
let obj = {
    a: 1,
    b: 2
}

obj[ a ]
obj[ 'b' ]
obj[ 'b' ]
obj[ a ]
```

參見：https://eslint.org/docs/rules/computed-property-spacing

---

### `func-call-spacing`

在函式呼叫時，強制或禁止函式名稱與 `()` 的間隔。此份 config 設置為 `'never'`。

**不好的範例 [X]：**
```javascript
// Bad
function doSomething() {
    ...
}

doSomething ()

doSomething
()
```

**好的範例 [O]：**
```javascript
// Good
function doSomething() {
    ...
}

doSomething()
```

參見：https://eslint.org/docs/rules/func-call-spacing

---

### `brace-style`

括號分行樣式，此份 `config` 採用的預設樣式為 `1tbs`，下列的範例故以 `1tbs` 樣式風格評斷：

**不好的範例 [X]：**
```javascript
// Bad
if(a) {
    ...
}
else {
    ...
}

try
{
  ...
} catch(e)
{
  ...
}

function a()
{
    ...
}
```

**好的範例 [O]：**
```javascript
// Good
if(a) {
    ...
} else {
    ...
}

try {
  ...
} catch(e) {
  ...
}

function a() {
    ...
}
```

上述的錯誤範例反而是屬於另一種樣式 `'stroustrup'` 的正確表現方式，詳細了解可透過下方連結參照

參見：https://eslint.org/docs/rules/brace-style

---

### `camelCase`

JavaScript 的慣例命名風格，另一種樣式則是下劃線的 `snake_case` 形式，此份標準則以 camelCase 為主

在此份標準中，將此規則參數 `properties` 設為 `never`，表現不檢查屬性的名稱，另外當變數名稱皆為大寫時，使用下劃線命名是允許的，因為這種用途常見於常數變數，例如 `BASE_URL` 

此規則僅檢查變量名稱「中間」是否有下劃線，`_bar` 這種命名方式是合法的。

**不好的範例 [X]：**
```javascript
// Bad
const base_url = 'http://123.com'

let phone_number = '0988xxxxxx'

function do_something() {
    ...
}
```

**好的範例 [O]：**
```javascript
// Good
const BASE_URL = 'http://123.com'

let phoneNumber = '0988xxxxxx'

function doSomething() {
    ...
}
```

其餘更詳細的內容，請參見官方文件敘述

參見：https://eslint.org/docs/rules/camelcase

---

### `comma-dangle`

在陣列的最後一個元素或物件的最後一個屬性後方是否加上逗號 `,`，此份標準預設為不加結尾逗號 (`never`)，反之 `always` 則是必須加上結尾逗號

以下範例以不加結尾逗號作為評斷：

**不好的範例 [X]：**
```javascript
// Bad
const array = [1, 2, 3,]

const obj = {
    a: 1,
    b: 2,
    c: 3,
}
```

**好的範例 [O]：**
```javascript
// Good
const array = [1, 2, 3]

const obj = {
    a: 1,
    b: 2,
    c: 3
}
```

根據 ECMAScript 5 規範，即使結尾加上逗號也是合法的，除此之外，對於是否加上結尾逗號仍有許多不同的意見與理由，詳情可參照下方官方規則敘述

參見：https://eslint.org/docs/rules/comma-dangle

---

### `comma-style`

逗號分行樣式，此份 `config` 採用的預設樣式為 `last`，下列的範例故以 `last` 樣式風格評斷：

**不好的範例 [X]：**
```javascript
// Bad
let a = 1
,
b = 2
,
c = 3

const obj = {
    a: 1
    ,b: 2
    ,c: 3
}

const arr = [
    1
    ,2
    ,3
]
```

**好的範例 [O]：**
```javascript
// Good
let a = 1,
    b = 2,
    c = 3

const obj = {
    a: 1,
    b: 2,
    c: 3
}

const arr = [
    1,
    2,
    3
]
```

上述的錯誤範例反而是屬於另一種樣式 `"first"` 的正確表現方式，詳細了解可透過下方連結參照

參見：https://eslint.org/docs/rules/brace-style

---

### `constructor-super`

繼承需要使用關鍵字 `super()`，無效的繼承或者在沒有繼承的狀況下使用關鍵字 `super()` 將會報錯

下方取自官方範例：

**不好的範例 [X]：**
```javascript
// Bad
class A {
    constructor() {
        super()  // This is a SyntaxError.
    }
}

class A extends B {
    constructor() { }  // Would throw a ReferenceError.
}

// Classes which inherits from a non constructor are always problems.
class A extends null {
    constructor() {
        super()  // Would throw a TypeError.
    }
}

class A extends null {
    constructor() { }  // Would throw a ReferenceError.
}
```

**好的範例 [O]：**
```javascript
// Good
class A {
    constructor() { }
}

class A extends B {
    constructor() {
        super()
    }
}
```

參見：https://eslint.org/docs/rules/constructor-super

---

### `curly`

JavaScript 允許在編寫時省略花括號，省略花括號雖然方便書寫，但可讀性可能會因此下降。

所以這條規範可以讓我們選擇強制書寫花括號，或者，可以參考此份 config 所採用的標準：**當有多行敘述時才需要加上花括號**，參數為 `'multi-line'`

下方範例以 `'multi-line'` 作為評斷標準：

**不好的範例 [X]：**
```javascript
// Bad
if (a)
  doSomething()
else
  doSomethingElse()

if (foo) foo(
  bar,
  baz)
```

**好的範例 [O]：**
```javascript
// Good
if (foo) foo++; else doSomething()

if (foo) foo++
else if (bar) baz()
else doSomething()

// 即使單行，也可以選擇加上花括弧
if (foo) { foo++ } 

if (foo) {
    foo++
}

do something()
while (foo)

while (foo
  && bar) baz()

// 多行內容必須添加花括弧
while (true) {
    doSomething()
    doSomethingElse()
}
```

至於其他選項，如 `'all'`、`'multi'` 與 `'multi-or-nest'` 等，可參照官方文件敘述

參見：https://eslint.org/docs/rules/curly

---

### `default-case-last`

在撰寫 `switch...case` 語法時，`default` 其實在 `case` 之前。或是 `case` 與 `case` 之間，都可以讓程式按照預期的執行 (甚至連 `default` 都可以不用撰寫)，但上述案例對可讀性來說未必是一件好事。

此規則強制若存在 `default`，則必為所有 `case` 的下方。

**不好的範例 [X]：**
```javascript
// Bad
switch(foo) {
    default
        ...
        break
    case 1:
        ...
        break
    case 2:
        ...
        break
}

switch(foo) {
    case 1:
        ...
        break
    default
        ...
        break
    case 2:
        ...
        break
}
```

**好的範例 [O]：**
```javascript
// Good
switch(foo) {
    case 1:
        ...
        break
    case 2:
        ...
        break
    default
        ...
        break
}

// or
switch(foo) {
    case 1:
        ...
        break
    case 2:
        ...
        break
}
```

參見：https://eslint.org/docs/rules/default-case-last

---

### `dot-location`

關於 `.` 分行樣式，此份 `config` 採用的預設樣式為 `'property'`，代表 `.` 必與屬性處於同一行，另外一種樣式 `'object'` 則相反，必與物件在同一行。

以下範例以樣式 `property` 為評斷基準：

**不好的範例 [X]：**
```javascript
// Bad
const a = obj.
property
```

**好的範例 [O]：**
```javascript
// Good
const a = obj
.property

const a = obj.property
```

上述的錯誤範例反而是屬於另一種樣式 `'object'` 的正確表現方式，詳細了解可透過下方連結參照

參見：https://eslint.org/docs/rules/dot-location

---

### `dot-notation`

當物件的屬性為變數形式時，鼓勵使用 `.` 表示法，若為方括號 `[]` 表示法時，則不允許使用字串 `""` 表示。

**不好的範例 [X]：**
```javascript
// Bad
const obj = {
    name: 'huli'
}

obj["name"]
```

**好的範例 [O]：**
```javascript
// Good
const obj = {
    name: 'huli',
    "age": 18
}

obj.name
obj[name]
obj["age"]
```

上述的 `obj["age"]` 則是規則參數 `'allowKeywords': true` 所允許的，當屬性名稱為關鍵字時允許在方括號中使用字串表示。

參見：https://eslint.org/docs/rules/dot-notation

---

### `eol-last` (待補充)

在檔案末端強制換行做為結尾，在使用的編輯器為 vscode 時，windows 作業系統預設可能會導致這個錯誤出現。

**不好的範例 [X]：**
```javascript
// Bad
...

function doSomething() {
    console.log(foo)
}
```

**好的範例 [O]：**
```javascript
// Good
...

function doSomething() {
    console.log(foo)
}

```

參見：https://eslint.org/docs/rules/eol-last

---

### `generator-star-spacing`

設置 Generators 的 `*` 號空格位置，此份 config 採用的參數為 `'before': true`

關於 Generators 的介紹，請參考 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

**不好的範例 [X]：**
```javascript
// Bad
function* generator() {}

var anonymous = function* () {}

var shorthand = { * generator() {} }
```

**好的範例 [O]：**
```javascript
// Good
function *generator() {}

var anonymous = function *() {}

var shorthand = { *generator() {} }

```

上述的錯誤範例反而是屬於另一種樣式 `'after'` 的正確表現方式，詳細了解可透過下方連結參照

參見：https://eslint.org/docs/rules/generator-star-spacing

---

### `key-spacing`


強制物件的 key 空格位置，此規則以 Colon `:` 為基準點，決定是否空格。
此份 config 設置的參數為 `{ 'beforeColon': false, 'afterColon': true }`，即 key 與 `:` 不允許空格，而在 `:` 與 value 之間強制空格。

**不好的範例 [X]：**
```javascript
// Bad
const obj = {
    a : 1,
    b :2,
    c:3
}
```

**好的範例 [O]：**
```javascript
// Good
const obj = {
    a: 1,
    b: 2,
    c: 3
}

```

參見：https://eslint.org/docs/rules/key-spacing

---

### `keyword-spacing`

處理一些關鍵字之後的換行，如 `try` 與 `catch`，`switch` 與 `case` ，或是 `if` 與 `else` 等族繁不及備載，更多 keyword 請參閱官方文件。

此份 config 的設置是前後都須空格 (`{ 'before': true, 'after': true }`)，前後都須空格的案例可參照下方 `else`：

**不好的範例 [X]：**
```javascript
// Bad
try{
    ...
} catch(err) {

}

if(a) {
    ...
}else {
    ...
}
```

**好的範例 [O]：**
```javascript
// Good
try {
    ...
}catch(err) {

}

if (a) {
    ...
} else {
    ...
}
```

參見：https://eslint.org/docs/rules/keyword-spacing

---

### `indent`

強制規定縮排的格數，此份 config 預設格數為 `2`

關於 Generators 的介紹，請參考 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

**不好的範例 [X]：**
```javascript
// Bad
const obj = {
    a: 1,
    b: 2
}
```

**好的範例 [O]：**
```javascript
// Good
const obj = {
  a: 1,
  b: 2
}

```

補充：除了預設格數可以帶入數字之外 (如 `2` 與 `4` 代表兩格與四格)，也可以以 `tab` 或 `space` (分別代表 Tab 與空白鍵) 來定義縮排格數。

另外，還可以針對細項來分別決定縮排格數，如 `SwitchCase` 或是 `VariableDeclarator`，他們的定義即是參數名稱，更多資訊請參考官方文件

參見：https://eslint.org/docs/rules/indent

---

### `lines-between-class-members`

類別中各成員間禁止或強制空行，本 config 設置為 `'always'`

**不好的範例 [X]：**
```javascript
// Bad
class A {
    a() {
        ...
    }
    b() {
        ...
    }
}
```

**好的範例 [O]：**
```javascript
// Good
class A {
    a() {
        ...
    }

    b() {
        ...
    }
}

// 'exceptAfterSingleLine': true 允許單行成員後不換行
class A {
    a() { ... }
    b() { ... }
}

// or

class A {
    a() { ... }

    b() { 
        ... 
    }
}
```
參見：https://eslint.org/docs/rules/lines-between-class-members

---

### `multiline-ternary`

當撰寫三元運算子時，若採取多行形式，則強制於 `:` 後換行。

此 config 設置參數 `always-multiline`，即當三元運算子採取多行形式撰寫時才強制換行規則，這代表你也可以選擇單行寫法。

以下範例以參數 `'always-multiline'` 為基準：

**不好的範例 [X]：**
```javascript
// Bad
a > b ? val1 :
    val2

a > b ? 
    val1 : val2
```

**好的範例 [O]：**
```javascript
// Good
a > b ? val1 : val2

a > b ? 
    val1 :
    val2
```
參見：https://eslint.org/docs/rules/multiline-ternary

---

### `new-cap`

要求構造函式必須以大寫開頭。

**不好的範例 [X]：**
```javascript
// Bad
let foo = new dog()
```

**好的範例 [O]：**
```javascript
// Good
let foo = new Dog()
```

參見：https://eslint.org/docs/rules/new-cap

---

### `new-parens`

當自構造函式 `new` 一個新的物件時，即使沒有代入參數的必要，也需要強制撰寫 `()`，因為在 JavaScript 中，在上述情況下省略括號也能正常執行。

**不好的範例 [X]：**
```javascript
// Bad
let foo = new Dog
```

**好的範例 [O]：**
```javascript
// Good
let foo = new Dog()
```

參見：https://eslint.org/docs/rules/new-parens

---

### `object-curly-newline`

在花括號 `{}` 內設置換行的風格，使風格一致。此 config 設置參數 `{ 'multiline': true, 'consistent': true }`，代表允許花括弧內單行或多行換行，並且一旦換行就統一換行。

以下範例來自官方文件：

**不好的範例 [X]：**
```javascript
// Bad
let a = {
}
let b = {
    foo: 1
}
let c = {
    foo: 1, bar: 2
}
let d = {foo: 1,
    bar: 2}
let e = {foo: function() {
    doSomething()
}}

let {
} = obj
let {
    f
} = obj
let {
    g, h
} = obj
let {i,
    j} = obj
let {k = function() {
    doSomething()
}} = obj
```

**好的範例 [O]：**
```javascript
// Good
let a = {}
let b = {foo: 1}
let c = {foo: 1, bar: 2}
let d = {
    foo: 1,
    bar: 2
}
let e = {
    foo: function() {
        doSomething()
    }
}

let {} = obj
let {f} = obj
let {g, h} = obj
let {
    i,
    j
} = obj
let {
    k = function() {
        doSomething()
    }
} = obj
```

參見：https://eslint.org/docs/rules/object-curly-newline

---

### `object-curly-spacing`

強制花括號 `{}` 內保持同樣的間距。

**不好的範例 [X]：**
```javascript
// Bad
const obj = {a: 1, b: 2 }

const obj = { a: 1, b: 2}

const obj = {a: 1, b: 2}

const {a } = obj

const { b} = obj
```

**好的範例 [O]：**
```javascript
// Good
const obj = { a: 1, b: 2 }

const { a } = obj

const { b } = obj

const { a, b } = obj
```

參見：https://eslint.org/docs/rules/object-curly-spacing

---

### `object-property-newline`

強制規範物件中的屬性呈現單行或多行表示。此 config 設置參數 `allowAllPropertiesOnSameLine` 為 `false`，代表各屬性強制非單行表示。

**不好的範例 [X]：**
```javascript
// Bad
const obj = { a: 1, b: 2, c: 3 }

const obj = { 
    a: 1, b: 2, c: 3 
}

const obj = { a: 1, b: 2, 
    c: 3 
}
```

**好的範例 [O]：**
```javascript
// Good
const obj = { 
    a: 1, 
    b: 2, 
    c: 3 
}

const obj = { 
    a: 1, 
    b: 2, 
    c: 3,
    d: {
        e: '1',
        f: '2'
    }
}
```

參見：https://eslint.org/docs/rules/object-property-newline

---

### `one-var`

關於在函式中的變數宣告風格，可以決定或禁止是否允許同時宣告與相關細項。

此 config 設置參數 `{ 'initialized': 'never' }`，即當變數初始化時，不得同時宣告，反之則可以。

**不好的範例 [X]：**
```javascript
// Bad
function() {
    let a = 1
        b = 2
        c = 3
}
```

**好的範例 [O]：**
```javascript
// Good
function() {
    let a = 1
    let b = 2
    let c = 3
    let d, e
}
```

此規則還有其餘細項，可參閱官方文件

參見：https://eslint.org/docs/rules/one-var

---

### `operator-linebreak`

運算子換行規範，決定換行行為位於運算子的前面 (before) 或之後 (after)

此 config 設置參數 `'after'`，即換行需要位於運算子的後方，但參數另外設置 `?`、`:` 與 `|>` 為 `'before`，故不在此限。

以下範例以設置參數 `'after'` 為基準：

**不好的範例 [X]：**
```javascript
// Bad
a = 1
+
2

b = 1
    + 2

b
    = 5

if (someCondition
    || otherCondition) {
}

answer = isTrue ? 
    1 : 
    2
```

**好的範例 [O]：**
```javascript
// Good
a = 1
+ 2

b = 1
+ 2

b = 
5

if (someCondition || 
    otherCondition) {

}

answer = isTrue
  ? 1
  : 2
```

此規則還有其餘細項，可參閱官方文件

參見：https://eslint.org/docs/rules/operator-linebreak

---

### `padded-blocks`

即要求在 block 中的起始與結尾是否空行，此 config 設置為 `'never'`，包含 `switch...case` 與 `class` 的區塊皆是。

**不好的範例 [X]：**
```javascript
// Bad
function() {

    a()

    b()

}

switch(a) {

    case 1:
        ...
    default:
        ...

}

class A {

    a() {
        ...
    }

}
```

**好的範例 [O]：**
```javascript
// Good
function() {
    a()
    b()
}

switch(a) {
    case 1:
        ...
    default:
        ...
}

class A {
    a() {
        ...
    }
}
```

參見：https://eslint.org/docs/rules/padded-blocks

---

### `prefer-const`

如果宣告的變數未曾重新賦值，則建議改使用 `const` 做宣告。

**不好的範例 [X]：**
```javascript
// Bad
var a = 0
let b = 1

function doSomething() {
    console.log(a)
}

console.log(b)

for(let i of arr) {
    console.log(i)
}
```

**好的範例 [O]：**
```javascript
// Good
const a = 0
const b = 1

function doSomething() {
    console.log(a)
}

console.log(b)

for(const i of arr) {
    console.log(i)
}
```

參見：https://eslint.org/docs/rules/prefer-const

---

### `prefer-promise-reject-errors`

規範使用 `Error` 或 `TypeError` 物件作為 Promise 中 `reject` 的參數，確保僅對 Error 做出 reject 聲明。

**不好的範例 [X]：**
```javascript
// Bad
Promise.reject("wrong")

Promise.reject(3)

Promise.reject()

new Promise(function(resolve, reject) {
  reject("something is not good")
})

new Promise(function(resolve, reject) {
  reject()
})
```

**好的範例 [O]：**
```javascript
// Good
Promise.reject(new Error("wrong"))

Promise.reject(new TypeError("wrong")))

Promise.reject()

new Promise(function(resolve, reject) {
  reject(new Error("something is not good"))
})
```

參見：https://eslint.org/docs/rules/prefer-promise-reject-errors

---

### `prefer-regex-literals`

禁止使用 RegExp 建構子來建構表達式文字，其應用於動態表達，以下範例取自官方文件：

**不好的範例 [X]：**
```javascript
// Bad
new RegExp("abc")

new RegExp("abc", "u")

RegExp("abc")

RegExp("abc", "u")

new RegExp("\\d\\d\\.\\d\\d\\.\\d\\d\\d\\d")

RegExp(`^\\d\\.$`)

new RegExp(String.raw`^\d\.$`)
```

**好的範例 [O]：**
```javascript
// Good
/abc/

/abc/u

/\d\d\.\d\d\.\d\d\d\d/

/^\d\.$/

// RegExp constructor is allowed for dynamically generated regular expressions

new RegExp(pattern)

RegExp("abc", flags)

new RegExp(prefix + "abc")

RegExp(`${prefix}abc`)

new RegExp(String.raw`^\d\. ${suffix}`)
```

參見：https://eslint.org/docs/rules/prefer-regex-literals

---

### `quote-props`

規範或禁止屬性名稱是否需要以引號包覆，此 config 設置參數為 `as-needed`，即當屬性名稱無法以變數形式表示時，則需要以引號，即 keyword 方式表示：

**不好的範例 [X]：**
```javascript
// Bad
const obj = {
    'a': 1,
    'b': 2,
    'c-3': 3,
    '0x0': 4
}
```

**好的範例 [O]：**
```javascript
// Good
const obj = {
    a: 1,
    b: 2,
    'c-3': 3,
    '0x0': 4
}
```

參見：https://eslint.org/docs/rules/quote-props

---

### `quotes`

規範雙引號 `"` 或單引號 `'` 的一致性。此 config 以單引號 `'` 為標準。

**不好的範例 [X]：**
```javascript
// Bad
let str = "Hello world"
```

**好的範例 [O]：**
```javascript
// Good
let str = 'Hello world'
```

參見：https://eslint.org/docs/rules/quotes

---

### `semi`

強制規範程式碼尾端是否要加上分號 `;` 以表示結束。此 config 以不加上分號為標準。

**不好的範例 [X]：**
```javascript
// Bad
let a = 1;
function doSomething() {
    console.log(a);
};

doSomething();
```

**好的範例 [O]：**
```javascript
// Good
let a = 1
function doSomething() {
    console.log(a)
};

doSomething()
```

參見：https://eslint.org/docs/rules/semi

---

### `semi-spacing`

強制規範程式碼中分號 `;` 與周邊程式碼的空格。此 config 以參數 `{ 'before': false, 'after': true }` 為標準。

**不好的範例 [X]：**
```javascript
// Bad
var a ;

var a;var b;

throw new Error("error") ;

while (a) { break ; }

for (i = 0 ; i < 10 ; i++) {}

for (i = 0;i < 10;i++) {}
```

**好的範例 [O]：**
```javascript
// Good
var a;

var a; var b;

throw new Error("error");

while (a) { break; }

for (i = 0; i < 10; i++) {}

for (;;) {}

if (true) {;}

;foo();
```

參見：https://eslint.org/docs/rules/semi-spacing

---

### `space-before-blocks`

強制或禁止 block `{}` 前方的空格

**不好的範例 [X]：**
```javascript
// Bad
if (a){
    ...
}

function(){
    ...
}

class A{
    ...
}
```

**好的範例 [O]：**
```javascript
// Good
if (a) { 
    ...
}

function() {
    ...
}

class A {
    ...
}
```

參見：https://eslint.org/docs/rules/space-before-blocks

---

### `space-before-function-paren`

強制或禁止函式括號 `()` 前是否有空格。此份 config 設置參數為 `'never'`，以下範例以此為評斷基準：

**不好的範例 [X]：**
```javascript
// Bad
function () {
    ...
}

function foo () {
    ...
}

const foo = function () {
    ...
}

class A {
    constructor () {
        ...
    }
}
```

**好的範例 [O]：**
```javascript
// Good
function() {
    ...
}

function foo() {
    ...
}

const foo = function() {
    ...
}

class A {
    constructor() {
        ...
    }
}
```

參見：https://eslint.org/docs/rules/space-before-function-paren

---

### `space-in-parens`

強制或禁止在括號 `()` 內使用空格。此份 config 設置參數為 `'never'`，以下範例以此為評斷基準：

**不好的範例 [X]：**
```javascript
// Bad
function foo(a) {
    console.log(a)
}

foo( )
foo( 1 )
foo(1 )
foo( 1)
```

**好的範例 [O]：**
```javascript
// Good
function foo(a) {
    console.log(a)
}

foo()
foo(1)
```

參見：https://eslint.org/docs/rules/space-in-parens

---

### `space-infix-ops`

強制在中間運算子周圍加上空格。

**不好的範例 [X]：**
```javascript
// Bad
let a = 1+ 2
let a = 1 +2
let a = 1+2
let a =1 + 2

const obj= {
    b: 1,
    c: 2
}
```

**好的範例 [O]：**
```javascript
// Good
let a = 1 + 2

const obj=  {
    b: 1,
    c: 2
}
```

參見：https://eslint.org/docs/rules/space-infix-ops

---

### `space-unary-ops`

強制規範或禁止一元運算子的之前或之後是否存在空格，此份 config 的參數設置為 `{ 'words': true, 'nonwords': false }`，下列範例取自官方文件：

**不好的範例 [X]：**
```javascript
// Bad
typeof!foo

new[foo][0]

delete(foo.bar)

+ "123"

++ a

a --

- a

async function foo() {
    await(bar)
}

```

**好的範例 [O]：**
```javascript
// Good
typeof foo //TODO: 待確認

new [foo][0]

delete foo.bar

+"123"

++a

a--

-a

async function foo() {
    await (bar)
}
```

參見：https://eslint.org/docs/rules/space-unary-ops

---

### `spaced-comment`

強制規範或禁止註解開頭加上空格。此 config 設置的參數為總是加上空格。

**不好的範例 [X]：**
```javascript
//Bad

//This is a function.

/**
 * This is a comment block.
 */
```

**好的範例 [O]：**
```javascript
// Good
 
// This is a function.

/**
 *  This is a comment block.
 */
```

此條規則還有還有其他參數可以設置，請參閱官方文件。

參見：https://eslint.org/docs/rules/spaced-comment

---

### `template-tag-spacing`

在 ES6 中，Function 有一種呼叫形式是可以於 function name 後方直接加上 template tag 作為參數代入。

此規則強制或禁止 template tag ` `` ` 周圍是否加上空格。此 config 設置參數為 '`never`'

**不好的範例 [X]：**
```javascript
// Bad
function foo(str) {
    console.log(str)
}

foo `Hello World`
```

**好的範例 [O]：**
```javascript
// Good
function foo(str) {
    console.log(str)
}

foo`Hello World`
```

參見：https://eslint.org/docs/rules/template-tag-spacing

---

### `wrap-iife`

要求 IIFEs 須以 `()` 包覆。此 config 設置參數為 `'any'`，意即 `'inside'` 或 `'outside'` 兩種形式都是允許的，範例如下所示：

**不好的範例 [X]：**
```javascript
// Bad

function (val) { console.log(val) }()
```

**好的範例 [O]：**
```javascript
// Good

(function (val) { console.log(val) })()
(function (val) { console.log(val) }())
```

參見：https://eslint.org/docs/rules/wrap-iife
---

### `unicode-bom`


參見：https://eslint.org/docs/rules/unicode-bom

---

### `yoda`

比較變數或值時，變數與值在比較運算子兩側的位置。此規則名稱之所以為 yoda，是因為當此規則設置為 `'always'` 時，程式碼的讀法會類似星際大戰中尤達大師的說話方式。

此 config 將其設置為 `'never'`，範例如下：

**不好的範例 [X]：**
```javascript
// Bad

if ('red' === color) {
    ...
} else if ('black' === color) {
    ...
}

if (5 === num) {
    ...
} else if (5 === num) {
    ...
}

if (0 <= num && num < 1) {
    ...
}
```

**好的範例 [O]：**
```javascript
// Good

if (color === 'red') {
    ...
} else if (color === 'black') {
    ...
}

if (num === 5) {
    ...
} else if (num === 3) {
    ...
}

if (num >= 0 && num < 1) {
    ...
}
```

參見：https://eslint.org/docs/rules/wrap-iife

---

### `unicode-bom`


參見：https://eslint.org/docs/rules/yoda

---
## [Errors](./errors.js)

## [ES6](./es6.js)

## [Imports](./imports.js)

## [Node](./node.js)

## [Strict](./strict.js)
