主要记录自己不常见或者比较重要的一些内容

完整指南👉请戳这里直达[《airbnb-javascript-style-guide》](https://github.com/airbnb/javascript)

## 对象

- 在创建具有动态属性名的对象时，使用计算属性名。

> 为什么？它们允许您在一个地方定义对象的所有属性。

```javascript
function getKey(k) {
  return `a key named ${k}`;
}

// bad
const LAL = {
  id: 5,
  name: 'Los Angeles Lakers',
};

obj[getKey('enabled')] = true;

// good
const LAL = {
  id: 5,
  name: 'Los Angeles Lakers',
  [getKey('enabled')]: true,
};
```

- 使用对象方法时简写。eslint:[ object-shorthand](https://eslint.org/docs/rules/object-shorthand.html)

```javascript
// bad
const scoreBar = {
  score: 1,

  addScore: function (score) {
    return scoreBar.score + score;
  },
};

// good
const scoreBar = {
  score: 1,

  addScore(score) {
    return scoreBar.score + score;
  },
};
```

- 使用属性值时简写。eslint:[ object-shorthand](https://eslint.org/docs/rules/object-shorthand.html)

> 为什么？它更简短，更有描述性。

```javascript
const kobeBryant = 'Kobe Bryant';

// bad
const obj = {
  kobeBryant: kobeBryant,
};

// good
const obj = {
  kobeBryant,
};
```

- 在对象声明的开头对快捷属性进行分组。

> 为什么？使用简写更容易区分哪些属性。

```javascript
const losAngelesLakers = 16;
const sanFranciscoSpurs = 5;

// bad
const NBA_CHAMPIONSHIPS = {
  bostonCeltics: 17,
  losAngelesLakers,
  chicagoBulls: 6,
  goldenStateWarriors: 6,
  sanFranciscoSpurs,
  houstonRockets: 2,
};

const NBA_CHAMPIONSHIPS = {
  losAngelesLakers,
  sanFranciscoSpurs,
  bostonCeltics: 17,
  chicagoBulls: 6,
  goldenStateWarriors: 6,
  houstonRockets: 2,
};
```

- 仅引用无效标识符的属性。 eslint: [quote-props](https://eslint.org/docs/rules/quote-props.html)

> 为什么？一般来说，我们主观地认为它更容易阅读。它改进了语法突出显示，也更容易被许多 JS 引擎优化。

```javascript
// bad
const PLAYER_STATS = {
  'backboard': 10,
  'block': 3,
  'three-pointer': 5,
};

// good
const PLAYER_STATS = {
  backboard: 10,
  block: 3,
  'three-pointer': 5,
};
```

- 不要直接调用对象原型方法，如`hasOwnProperty`、`propertyIsEnumerable`和`isPrototypeOf`。eslint: [no-prototype-builtins](https://eslint.org/docs/rules/no-prototype-builtins)

>为什么？这些方法可能被问题对象的属性隐藏-考虑{hasOwnProperty: false} -或者，对象可能是一个空对象(object .create(null))。

```javascript
// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
console.log(has.call(object, key));
/* or */
import has from 'has'; // https://www.npmjs.com/package/has
console.log(has(object, key));
```

- 使用展开操作符(spread)胜于`Object.assign`浅拷贝对象。使用对象剩余操作符(rest)获取一个省略某些属性的新对象。

```javascript
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
delete copy.a; // so does this

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```

## 数组

- 使用扩展操作符去复制数组

```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

- 要将可迭代对象转换为数组，请使用spread…而不是Array.from。

```javascript
const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];
```

- 使用Array.from将类数组对象转换为数组。

```javascript
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };

// bad
const arr = Array.prototype.slice.call(arrLike);

// good
const arr = Array.from(arrLike);
```

- 使用Array.from代替spread…用于遍历映射，因为它避免创建中间数组。

```javascript
// bad
const baz = [...foo].map(bar);

// good
const baz = Array.from(foo, bar);
```

- 在数组方法回调中使用return语句。如果函数体由一条语句组成，返回一个没有副作用的表达式，那么省略返回值是可以的。eslint: [array-callback-return](https://eslint.org/docs/rules/array-callback-return)

```javascript
// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => x + 1);

// bad - no returned value means `acc` becomes undefined after the first iteration
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
});

// good
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
  return flatten;
});

// bad
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  } else {
    return false;
  }
});

// good
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});
```

- 如果数组有多行，则在数组的开括号和闭括号之前使用换行符

```javascript
// bad
const arr = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];

// good
const arr = [[0, 1], [2, 3], [4, 5]];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [
  1,
  2,
];
```

## 解构

- 当访问和使用一个对象的多个属性时，使用对象的解构。eslint: [prefer-destructuring](https://eslint.org/docs/rules/prefer-destructuring)

> 为什么？析构可以避免为这些属性创建临时引用。

```javascript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

- 使用数组解构。eslint: [prefer-destructuring](https://eslint.org/docs/rules/prefer-destructuring)

```javascript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

- 对多个返回值使用对象解构，而不是数组解构。

>为什么？您可以随着时间的推移添加新的属性，或者在不破坏调用站点的情况下更改事情的顺序。

```javascript
// bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom];
}

// the caller needs to think about the order of return data
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom };
}

// the caller selects only the data they need
const { left, top } = processInput(input);
```

## 字符串

- 不要对字符串中的字符进行不必要的转义。eslint: [no-useless-escape](https://eslint.org/docs/rules/no-useless-escape)

>为什么？反斜杠会损害可读性，因此它们只应该在必要时出现。

```javascript
// bad
const foo = '\'this\' \i\s \"quoted\"';

// good
const foo = '\'this\' is "quoted"';
const foo = `my name is '${name}'`;
```

## 函数

- ECMA-262将块定义为一组语句。函数声明不是语句。

```javascript
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
```

- 使用默认参数语法，而不是改变函数参数。

```javascript
// really bad
function handleThings(opts) {
  // No! We shouldn’t mutate function arguments.
  // Double bad: if opts is falsy it'll be set to an object which may
  // be what you want but it can introduce subtle bugs.
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

## 箭头函数

- 避免将箭头函数语法(=>)与比较运算符混淆

```javascript
// bad
const itemHeight = (item) => item.height <= 256 ? item.largeSize : item.smallSize;

// bad
const itemHeight = (item) => item.height >= 256 ? item.largeSize : item.smallSize;

// good
const itemHeight = (item) => (item.height <= 256 ? item.largeSize : item.smallSize);

// good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item;
  return height <= 256 ? largeSize : smallSize;
};
```

## 类&构造函数

- 总是使用class。避免直接操作原型。

>为什么?类语法更简洁，更容易推理。

```javascript
// bad
function Queue(contents = []) {
  this.queue = [...contents];
}
Queue.prototype.pop = function () {
  const value = this.queue[0];
  this.queue.splice(0, 1);
  return value;
};

// good
class Queue {
  constructor(contents = []) {
    this.queue = [...contents];
  }
  pop() {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  }
}
```

- 使用extends继承。

> 为什么?它是在不破坏instanceof的情况下继承原型功能的内置方法。

```javascript
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function () {
  return this.queue[0];
};

// good
class PeekableQueue extends Queue {
  peek() {
    return this.queue[0];
  }
}
```

## 模块

- 总是在非标准模块系统上使用模块(import/export)。您总是可以转到您喜欢的模块系统。

> 为什么?模块是未来，让我们现在开始使用未来。

```javascript
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

- 不要使用通配符导入。

>为什么?这确保您有一个默认导出。

```javascript
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// good
import AirbnbStyleGuide from './AirbnbStyleGuide';
```

- 不要直接从导入导出。

> 为什么?尽管单行程序很简洁，但是拥有一种清晰的导入方法和一种清晰的导出方法可以使事情保持一致。

```javascript
// bad
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide';

// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

- 不要导出可变绑定。

>为什么?通常应该避免突变，但在导出可变绑定时尤其如此。虽然在某些特殊情况下可能需要这种技术，但通常只应该导出常量引用。

```javascript
// bad
let foo = 3;
export { foo };

// good
const foo = 3;
export { foo };
```

- 将所有导入置于非导入声明之上。

>为什么?由于导入被提升，保持它们都在顶部可以防止意外行为。

```javascript
// bad
import foo from 'foo';
foo.init();

import bar from 'bar';

// good
import foo from 'foo';
import bar from 'bar';

foo.init();
```

## 属性

- 计算幂时使用求幂运算符**。

```javascript
// bad
const binary = Math.pow(2, 10);

// good
const binary = 2 ** 10;
```

## 变量

- 将所有的const分组，然后将所有的let分组。

```javascript
// bad
let i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;

// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```

- 避免在赋值的=之前或之后换行。如果你的赋值违反了max-len，那么就用括号括起来

> 为什么?环绕=的换行符会混淆赋值的值。

```javascript
// bad
const foo =
  superLongLongLongLongLongLongLongLongFunctionName();

// bad
const foo
  = 'superLongLongLongLongLongLongLongLongString';

// good
const foo = (
  superLongLongLongLongLongLongLongLongFunctionName()
);

// good
const foo = 'superLongLongLongLongLongLongLongLongString';
```

## 比较运算符与等式

- 使用大括号在case和default子句中创建块，这些子句包含词法声明(例如let、const、function和class)

> 为什么?词法声明在整个开关块中是可见的，但只有在赋值时才会初始化，而赋值只有在达到它的case时才会发生。当多个case子句试图定义相同的东西时，这会导致问题。

```javascript
// bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {
      // ...
    }
    break;
  default:
    class C {}
}

// good
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {
      // ...
    }
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
}
```
- 避免不必要的三元语句

```javascript
// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;
```

### 条件语句

- 如果控制语句(if, while等)太长或超过最大行长度，可以将每个(分组)条件放入新行。逻辑运算符应该从行开始。

> 为什么?在行首要求操作符可以保持操作符对齐，并遵循类似于方法链接的模式。这也提高了可读性，使复杂的逻辑更容易在视觉上理解。

```javascript
// bad
if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
  thing1();
}

// bad
if (foo === 123 &&
  bar === 'abc') {
  thing1();
}

// bad
if (foo === 123
  && bar === 'abc') {
  thing1();
}

// bad
if (
  foo === 123 &&
  bar === 'abc'
) {
  thing1();
}

// good
if (
  foo === 123
  && bar === 'abc'
) {
  thing1();
}

// good
if (
  (foo === 123 || bar === 'abc')
  && doesItLookGoodWhenItBecomesThatLong()
  && isThisReallyHappening()
) {
  thing1();
}

// good
if (foo === 123 && bar === 'abc') {
  thing1();
}
```

- 不要使用选择操作符代替控制语句。

```javascript
// bad
!isRunning && startRunning();

// good
if (!isRunning) {
  startRunning();
}
```

## 注释

- 使用 /** ... */ 作为多行注释。包含描述、指定所有参数和返回值的类型和值。

```javascript
// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {

  // ...stuff...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed in tag name
 *
 * @param {String} tag
 * @return {Element} element
 */
function make(tag) {

  // ...stuff...

  return element;
}
```

- 使用 // 作为单行注释。在评论对象上面另起一行使用单行注释。在注释前插入空行。

```javascript
// bad
var active = true;  // is current tab

// good
// is current tab
var active = true;

// bad
function getType() {
  console.log('fetching type...');
  // set the default type to 'no type'
  var type = this.type || 'no type';

  return type;
}

// good
function getType() {
  console.log('fetching type...');

  // set the default type to 'no type'
  var type = this.type || 'no type';

  return type;
}
```

- 给注释增加 FIXME 或 TODO 的前缀可以帮助其他开发者快速了解这是一个需要复查的问题，或是给需要实现的功能提供一个解决方式。这将有别于常见的注释，因为它们是可操作的。使用 FIXME -- need to figure this out 或者 TODO -- need to implement。

- 使用 // FIXME: 标注问题。

```javascript
function Calculator() {

  // FIXME: shouldn't use a global here
  total = 0;

  return this;
}
```

- 使用 // TODO: 标注问题的解决方式。

```javascript
function Calculator() {

  // TODO: total should be configurable by an options param
  this.total = 0;

  return this;
}
```

## 类型转换

- 字符串

```javascript
// => this.reviewScore = 9;

// bad
const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"

// bad
const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

// bad
const totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string

// good
const totalScore = String(this.reviewScore);
```

- 使用 parseInt 转换数字时总是带上类型转换的基数

```javascript
var inputValue = '4';

// bad
var val = new Number(inputValue);

// bad
var val = +inputValue;

// bad
var val = inputValue >> 0;

// bad
var val = parseInt(inputValue);

// good
var val = Number(inputValue);

// good
var val = parseInt(inputValue, 10);
```

- 布尔

```javascript
var age = 0;

// bad
var hasAge = new Boolean(age);

// good
var hasAge = Boolean(age);

// good
var hasAge = !!age;
```

## 命名规则

- 首字母缩略词和首字母缩略词应该总是大写或小写。

>为什么?名称是为了可读性，而不是为了满足计算机算法。

```javascript
// bad
import SmsContainer from './containers/SmsContainer';

// bad
const HttpRequests = [
  // ...
];

// good
import SMSContainer from './containers/SMSContainer';

// good
const HTTPRequests = [
  // ...
];

// also good
const httpRequests = [
  // ...
];

// best
import TextMessageContainer from './containers/TextMessageContainer';

// best
const requests = [
  // ...
];
```

## You may optionally uppercase a constant only if it (1) is exported, (2) is a const (it can not be reassigned), and (3) the programmer can trust it (and its nested properties) to never change.

>Why? This is an additional tool to assist in situations where the programmer would be unsure if a variable might ever change. UPPERCASE_VARIABLES are letting the programmer know that they can trust the variable (and its properties) not to change.

* What about all const variables? - This is unnecessary, so uppercasing should not be used for constants within a file. It should be used for exported constants however.

* What about exported objects? - Uppercase at the top level of export (e.g. EXPORTED_OBJECT.key) and maintain that all nested properties do not change.

```javascript
// bad
const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';

// bad
export const THING_TO_BE_CHANGED = 'should obviously not be uppercased';

// bad
export let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';

// ---

// allowed but does not supply semantic value
export const apiKey = 'SOMEKEY';

// better in most cases
export const API_KEY = 'SOMEKEY';

// ---

// bad - unnecessarily uppercases key while adding no semantic value
export const MAPPING = {
  KEY: 'value'
};

// good
export const MAPPING = {
  key: 'value'
};
```

## 🔗Links

- [Airbnb JavaScript Style Guide](https://github.com/sivan/javascript-style-guide)
