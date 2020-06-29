# JavaScript 之数组

## 一、方法

### es5

#### 1. Array.prototype.pop()

> arr.pop();

**`pop()`** 方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
`返回值：` 删除最后一个元素的值，改变原数组。(当数组为空时返回 undefined)

```javascript
let arr = [1, 2, 3, 4];
arr.pop(); // 4
arr; // [1,2,3]

arr.pop(); // 3
arr.pop(); // 2
arr.pop(); // 1
arr; // []
arr.pop(); // undefined
arr; // []
```

**结合 call()、apply()一起使用时，可应用在类似数组的对象上**。

```javascript
let arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
};
Array.prototype.pop.call(arrayLike); // 'c'
Array.prototype.pop.call(arrayLike); // 'b'
Array.prototype.pop.call(arrayLike); // 'a'
Array.prototype.pop.call(arrayLike); // undefined
```

**根据 length 属性来确定最后一个元素，如果不包含 length 属性或 length 属性不能被转为一个数值，会将 length 置为 0，并返回 undefined。**

```javascript
let arrayLike = {
	0:'a',
  1:'b',
  2:'c',
};
Array.prototype.pop.call(arrayLike); // undefined
arrayLike; // {
	0:'a',
  1:'b',
  2:'c',
  length:0
};
```

#### 2. Array.prototype.push()

**`push()`方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。**

**语法:**

> arr.push(element1, ..., elementN)

`返回值：`当调用该方法时，新的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性值将被返回。

```javascript
let arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
};
Array.prototype.push.call(arrayLike, 'd'); // '1'
arrayLike; // {0: "d", 1: "b", 2: "c", length: 1}
```

```javascript
let arrayLike = {
  a: 'a',
  b: 'b',
  c: 'c',
};
Array.prototype.push.call(arrayLike, 'd'); // 1
arrayLike; // {0: "d", a: "a", b: "b", c: "c", length: 1}
```

tips：唯一的原生类数组对象是 Strings，尽管如此，他们并不适用该方法，因为字符串是不可改变的。
像数组一样使用对象

```javascript
let obj = {
  length: 0,

  addElem: function addElem(elem) {
    [].push.call(this, elem);
  },
};
obj.addElem({});
console.log(obj.length); // 1
```

#### 3. Array.prototype.unshift()

> **arr.unshift(element1, ..., elementN)**

**`unshift()` 方法将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。**

`返回值：`原有数组的新长度

```javascript
let array = [2, 3, 4];
array.unshift(1); // 4
array; // [1,2,3,4]
array.unshift(0); // 5
array; // [0,1,2,3,4]
```

当一个对象调用该方法时，返回其 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性值。

```javascript
let obj = {
  a: 'a',
};
Array.prototype.unshift.call(obj); // 0
obj; // {a:'a',length:0}
```

如果传入多个参数，他们会被以块的形式插入到对象的开始位置，他们的顺序和被作为参数传入时的顺序一致。

```javascript
let arr = [4, 5, 6];
arr.unshift(1, 2, 3); // 6
arr; // [1,2,3,4,5,6];

arr = [4, 5, 6];
arr.unshift(1); // 4
arr.unshift(2); // 5
arr.unshift(3); // 6
arr; // [3,2,1,4,5,6]
```

以数组形式传入

```javascript
let a = [4, 5, 6],
  b = [1, 2, 3];
[].unshift.apply(a, b); // 6
a; // [1,2,3,4,5,6]
```

#### 4. Array.prototype.shift()

`shift()` 方法从数组中删除**第一个**元素，并返回该元素的值。此方法更改数组的长度。

`返回值：`返回删除的元素，如果数组为空则返回[`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 。

```javascript
let arr = [1, 1, 2, 3, 4];
arr.shift(); // 1
arr;
[1, 2, 3, 4];
```

同样能够借助 call 或 apply 方法作用域类似数组的对象上。
Array.prototype.pop()有着和 shift 相似的行为，但是是作用在数组的最后一个元素上的。

#### 5. Array.prototype.concat ()

 `concat()` 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

`返回值：`新的数组实例

> var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])

`value_N_`可选将数组和/或值连接成新数组。如果省略了 valueN 参数参数，则 concat 会返回一个它所调用的已存在的数组的浅拷贝

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
arr1.concat(arr2); // [1,2,3,4,5,6];
```

`concat`方法不会改变`this`或任何作为参数提供的数组，而是返回一个浅拷贝，它包含与原始数组相结合的相同元素的副本。 原始数组的元素将复制到新数组中，如下所示：

- 对象引用（而不是实际对象）：`concat`将对象引用复制到新数组中。 原始数组和新数组都引用相同的对象。 也就是说，如果引用的对象被修改，则更改对于新数组和原始数组都是可见的。 这包括也是数组的数组参数的元素。
- 数据类型如字符串，数字和布尔（不是[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 和 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象）：`concat`将字符串和数字的值复制到新数组中。

```javascript
let arr1 = [{ a: 1, b: 2, c: 3 }];
let arr2 = [{ d: 4, e: 5, f: 6 }];
let arr3 = arr1.concat(arr2);
arr1[0].a = 'a';
arr3[0].a; // 'a';

arr3[0].a = 1;
arr1[0].a; // 1;
```

合并数组：

```javascript
let num1 = [1];
let num2 = [2, 3];
let num3 = [5, 6];

let nums = num1.concat(num2, num3); // [1,2,3,5,6]
```

#### 6. Array.prototype.splice()

>array.splice(start[, deleteCount[, item1[, item2[, _...]]]]\_)

`deleteCount` 可选整数，表示要移除的数组元素的个数。

**splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。**

`返回值：`由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

```javascript
let arr = [0, 1, 2, 3, 4, 5, 6];
arr.splice(1); // [1,2,3,4,5,6];
arr; // [0]

arr = [0, 1, 2, 3, 4, 5, 6, 7];
arr.splice(0, 1, 1); // 0
arr; // [1,1,2,3,4,5,6]
arr.splice(0); // [1,1,2,3,4,5,6]
arr; // []
arr.splice(0); // []
```

插入值

```javascript
let arr = [0, 1, 2, 4];
arr.splice(3, 0, 3); // []
arr; // [0,1,2,3,4]
```

#### 7. Array.prototype.slice()

> arr.slice([begin[, end]])

 `slice()` 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的浅拷贝（包括 `begin`，不包括`end`）。原始数组不会被改变。

`返回值:`一个含有被提取元素的新数组。

```javascript
let arr = [{ a: '1' }, { b: '2' }];
let arr1 = arr.slice(0, 1);
arr1; // [{a:'1'}];
arr[0].a = 'a';
arr1; // [{a:'a'}];
```

```javascript
let arr = [1, 2, 3, 4];
arr.slice(0, null); // []
arr.slice(0, undefined); // [1,2,3,4]
```

**类数组对象**

slice 可以用来将一个类数组对象/集合转换称一个新数组

```javascript
function list() {
  return Array.prototype.slice.call(arguments);
  // or
  // [].slice.call(arguments);
}
let list1 = list(1, 2, 3); // [1,2,3]
```

用 bind 来简化

```javascript
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);

function list() {
  return slice(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
```

#### 8. Array.prototype.sort()

> arr.sort([compareFunction])

 `sort()` 方法用[原地算法](https://en.wikipedia.org/wiki/In-place_algorithm)对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的。由于它取决于具体实现，因此无法保证排序的时间和空间复杂性

`compareFunction` 可选用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的 Unicode 位点进行排序。`firstEl`第一个用于比较的元素。`secondEl`第二个用于比较的元素。

`返回值：`排序后的数组。数组已原地排序，并且不进行复制。

```javascript
function compare(a, b) {
  if (a < b) {
    // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
  if (a > b) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
let arr = [1, 4, 6, 2, 56, 78];
arr.sort(compare); // [1,2,4,6,56,78];
```

#### 9. Array.prototype.reverse()

 `reverse()` 方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

`返回值：`颠倒后的数组。

```javascript
let str = 'abcdeffedcba';
let arr = str.split(''); // ["a", "b", "c", "d", "e", "f", "f", "e", "d", "c", "b", "a"]
arr === arr.reverse(); // true;
```

类数组

```javascript
let a = { 0: 1, 1: 2, length: 2 };
Array.prototype.reverse.call(a); // {0: 2, 1: 1, length: 2}
```

#### 10. Array.prototype.reduce()

> arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])

- Accumulator (acc) (累计器)
- Current Value (cur) (当前值)
- Current Index (idx) (当前索引)
- Source Array (src) (源数组)

```javascript
[0, 1, 2, 3, 4, 5].reduce((acc, cur) => acc + cur, 0);
// 15
```

#### 11. Array.prototype.reduceRight()

#### 12. Array.isArray()

>Array.isArray(obj)

`返回值：`如果值是 Array，则为 true,否则为 false

```javascript
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
Array.isArray(new Array('a', 'b', 'c', 'd'));
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype);
```

当检测 Array 实例时, `Array.isArray` 优于 `instanceof`,因为 Array.isArray 能检测`iframes`。每个`window`对象都是其页面包含或引用的脚本的全局对象。
polyfill

```javascript
if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

`Object.prototype.toString.call(o) === "[object Array]"`，它依赖`Object.prototype.toString`并且 `Function.prototype.call`没有改变

#### 13. Array.prototype.forEach()

> arr.forEach(callback(currentValue [, index [, array]])[, thisArg]);

`**forEach()**` 方法对数组的每个元素执行一次提供的函数。

`返回值：`undefined

注意：除了抛出异常以外，没有办法中止或跳出 `forEach()` 循环。如果你需要中止或跳出循环，`forEach()` 方法不是应当使用的工具。
需要提前终止循环，则

- 一个简单的 [for](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for) 循环
- [for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) / [for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环
- [`Array.prototype.every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [`Array.prototype.some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [`Array.prototype.find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [`Array.prototype.findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)``

**不对未初始化的值进行任何操作(稀疏数组)**

```javascript
let arr = [1,2,,4];
undefined
arr.forEach((item,index)=>{
    console.log(item,index);
});
1 0
2 1
4 3
```

**如果数组在迭代时被修改了，则其他元素会被跳过**

下面的例子会输出 "one", "two", "four"。当到达包含值 "two" 的项时，整个数组的第一个项被移除了，这导致所有剩下的项上移一个位置。因为元素 "four" 正位于在数组更前的位置，所以 "three" 会被跳过。 `forEach()` 不会在迭代之前创建数组的副本。

```javascript
var words = ['one', 'two', 'three', 'four'];
words.forEach(function (word) {
  console.log(word);
  if (word === 'two') {
    words.shift();
  }
});
// one
// two
// four
```

### 14. Array.prototype.filter()

>  var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])

`filter()` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

`返回值：`一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。

```javascript
let arr = [1,2,3,4,5,6];
arr.filter(item=>item%2===0)); // [2,4,6]
```

#### 15. Array.prototype.map()

> var new_array = arr.map(function callback(currentValue[, index[, array]]) {
> // Return element for new_array
> }[, thisArg])

 `map()` 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

`返回值：`回调函数的结果组成了新数组的每一个元素。

```javascript
var kvArray = [
  { key: 1, value: 10 },
  { key: 2, value: 20 },
  { key: 3, value: 30 },
];

var reformattedArray = kvArray.map(function (obj) {
  var rObj = {};
  rObj[obj.key] = obj.value;
  return rObj;
});
```

**获取字符串中每个字符所对应的 ASCII 码**

```javascript
var map = Array.prototype.map;
var a = map.call('Hello World', function (x) {
  return x.charCodeAt(0);
});
// a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
```

**querySelectorAll 应用**

```javascript
var elems = document.querySelectorAll('select option:checked');
var values = Array.prototype.map.call(elems, function (obj) {
  return obj.value;
});
```

**含 undefined 的数组**

```javascript
var numbers = [1, 2, 3, 4];
var filteredNumbers = numbers.map(function (num, index) {
  if (index < 3) {
    return num;
  }
});
filteredNumbers;
[1, 2, 3, undefined];
```

#### 16. Array.prototype.join()

>arr.join([separator])

`join()` 方法将一个数组（或一个[类数组对象]()）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。默认为“,”分割。

`返回值：`一个所有数组元素链接的字符串，如果 arr.length 为 0.则返回空字符串。
如果一个元素为 `undefined` 或 `null`，它会被转换为空字符串。

```javascript
let arr = [1, 2, 3, null, undefined, { a: 1 }, [1, 2, [3, 4]], NaN, false];
arr.join(','); // "1,2,3,,,[object Object],1,2,3,4,NaN,false"
```

连接类数组对象

```javascript
function f() {
  return Array.prototype.join.call(arguments);
}
f({}, [], 1, 'a'); // "[object Object],,1,a"
```

#### 17. Array.prototype.indexof()

>arr.indexOf(searchElement[, fromIndex]

`返回值：`首个被找到的元素在数组中的索引位置; 若没有找到则返回 -1

```javascript
let arr = [1, 2, 3, 4, 1, 2, 3, 4];
arr.indexOf(5); // -1
arr.indexOf(1); // 0
arr.indexOf(1, 1); // 4
```

#### 18. Array.prototype.lastIndexof()

>arr.lastIndexOf(searchElement[, fromIndex]

`返回值：`数组中该元素最后一次出现的索引，如未找到返回-1。

```javascript
let arr = [1, 2, 3, 4, 1, 2, 3, 4];
arr.lastIndexOf(5); // -1
arr.lastIndexOf(1); // 4
arr.lastIndexOf(1, 4); // 4
```

#### 19. Array.prototype.some()

>arr.some(callback(element[, index[, array]])[, thisArg])

`some()` 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。

`返回值：`数组中有至少一个元素通过回调函数的测试就会返回`true`；所有元素都没有通过回调函数的测试返回值才会为 false。

```javascript
[1, 2, 3, 4, 5].some((num) => num === 5); // true
[1, 2, 3, 4, 5].some((num) => {
  num === 5;
}); // false
```

**空数组进行测试，在任何情况下它返回的都是`false`**。

```javascript
[].some((item) => !item); // false;
```

#### 20. Array.prototype.every()

>arr.some(callback(element[, index[, array]])[, thisArg])

**方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。**

`返回值：`如果回调函数的每一次返回都为 [truthy](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy) 值，返回 `**true**` ，否则返回 `**false**`。

```javascript
[1, 2, 3, 4, 5].every((num) => num === 5); // false
[1, 2, 3, 4, 5].every((num) => num < 6); // true
```

**空数组进行测试，在任何情况下它返回的都是`true`。**

```javascript
[].every((item) => item); // true;
```

#### 21. Array.prototype.toLocaleString()

> arr.toLocaleString([locales[,options]]);

`**toLocaleString()**` 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 `toLocaleString` 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。

#### 22. Array.prototype.toSource()

>array.toSource()

**`toSource()`方法返回一个表示对象源代码的字符串。**

该特性是非标准的，请尽量不要在生产环境中使用它！

#### 23. Array.prototype.toString()

`返回值：`一个表示指定的数组及其元素的字符串。

`**toString()**` 返回一个字符串，表示指定的数组及其元素。[`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array)对象覆盖了[`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)的 `toString` 方法。对于数组对象，`toString` 方法连接数组并返回一个字符串，其中包含用逗号分隔的每个数组元素。

当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 `toString` 方法。

```javascript
[1, 2, 3, 4].toString(); // "1,2,3,4"
```

### es6

#### 1. 扩展运算符(spread)

##### 1.1 替代数组的 apply 方法

 ① 应用 Math.max 简化求数组最大元素**

```javascript
const arr = [2, 8, 24];
// ES5
Math.max.apply(null, arr);
// ES6
Math.max(...arr);
// 等同于
Math.max(2, 8, 24);
```

 ②push 函数将数组添加到另一个数组的尾部

```javascript
let arr1 = [2, 8, 24];
let arr2 = [10, 33];
// 通常用循环
arr2.forEach((el) => arr1.push(el));
// es5
arr1.push.apply(arr1, arr2); // 5
Array.prototype.push.apply(arr1, arr2); // 5
// es6
arr1.push(...arr2); // 5
```

 ③ 另一个例子

```javascript
// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))();
// ES6
new Date(...[2015, 1, 1]);
```

##### 1.2 扩展运算符的应用

① 合并数组

```javascript
let arr1 = [2, 8];
let arr2 = [10, 24, 33];
// es5
let mergeArr = arr1.concat(arr2);
// es6
let mergeArr = [...arr1, ...arr2];
```

② 与解构赋值结合
tips: 扩展运算符用于数组赋值只能放在参数的最后一位，否则会报错。

```javascript
// es5
let a = list[0],
  rest = list.slice1(1);
// es6
[a, ...rest] = list;
```

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first; // 1
rest; // [2,3,4,5,6]

const [first, ...rest] = [];
first; // undefined
rest; // []

const [first, ...rest] = ['foo'];
first; // "foo"
rest; // []
```

③ 函数的返回值
js 函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。
扩展运算符提供了解决这个问题的一种变通方法。

```javascript
let dateFields = readDateFields(dateBser);
let d = new Date(...dateFields);
```

④ 字符串
扩展运算符可以讲字符串转化为真正的数组

```javascript
[...'123456'] // [1,2,3,4,5,6]

...'123456' // 错误
```

能够正确识别 32 位的 Unicode 字符

```javascript
function length(str) {
  return [...str].length;
}
```

⑤ 实现了 Iterator 接口的对象
任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组。

```javascript
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
```

对于没有部署 Iterator 接口的类似数组的对象，可以使用 Array.form 转为真正的数组。

```javascript
let arrayLikes = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3,
};
let arr = [...arrayLikes]; // 错误
let arr = Array.from(arrayLikes); // ["a", "b", "c"]
```

⑥Map 和 Set 结构、Generator 函数
扩展运算符内部调用的是数据结构的 Iterator 接口。
Map

```javascript
let map = new Map([1, 'a'], [2, 'b'], [3, 'c']); // Map(3) {1 => "a", 2 => "b", 3 => "c"}
let arr = [...map]; //  [Array(2), Array(2), Array(2)]
let arr1 = [...map.keys()]; // [1,2,3];
```

Set

```javascript
let set = new Set([1, 2, 3, 4, 5]); // Set(3) {1, 2, 3}
let arr = [...set]; // [1,2,3,4,5,6]
```

Generator

```javascript
let go = function* () {
  yield 1;
  yield 2;
  yield 3;
};
let arr = [...go()]; // [1,2,3];
```

#### 2. Array.from() => 类数组转为数组

> Array.from(arrayLike [, mapFn [, thisArg]])

用于将两类对象转为真正的数组：

##### 2.1 类似数组的对象

```javascript
let arrayLikes = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3,
};
// es5
let arr = [].slice.call(arrayLikes); // ['a','b','c']
// es6
let arr = Array.from(arrayLikes); // ['a','b','c']
```

① 类似数组的对象，所谓类似数组的对象，本质特征只有一点，必须有 length 属性。

```javascript
Array.from({ length: 3 }); // [undefined,undefined,undefined]
```

② 对于没有部署该方法的浏览器，可用 Array.prototype.slice 方法替代

```javascript
const toArray = ()=>{
	return Array.from?Array.from：obj=>[].slice.call(obj);
}
```

##### 2.2 可遍历对象

只要部署了 Iterator 接口的数据结构，都能转为数组。实际应用中:
① 常见的类似数组的对象是 DOM 操作返回的 nodeList 集合

```javascript
// DOM
let nodeList = document.querySelectorAll('div');
let arr = Array.from(nodeList);
arr.forEach((div) => console.log(div));
```

② 再就是函数内部 arguments 对象。

```javascript
// arguments
const func = function () {
  const arr = Array.from(arguments);
  return arr.map((item) => item * 10);
};
func(0.1, 0.2, 0.3, 0.4, 0.5, 0.6); //[1,2,3,4,5,6]
```

##### 2.3 用法示例

①Array.from 接受第二个参数，作用类似于 map 方法

```javascript
Array.from(arrayLike, (x) => x * x);
Array.from(arrayLike).map((x) => x * x);

// DOM
let spans = document.querySelectorAll('span.name');

let names1 = Array.prototype.map.call(spans, (s) => {
  s.textContent;
});
let names1 = Array.from(spans, (s) => {
  s.textContent;
});
```

② 小用法

```javascript
// 将数组中布尔值为false的成员转为0
[1, , 2, , 3].map((n) => n || 0); // [1,emty,emty,3]
Array.from([1, , 2, , 3], (n) => n || 0); // [1,0,2,0,3]

// 返回各种数据的类型
function typesof() {
  return Array.from(arguments, (value) => typeof value);
}
```

③ 将字符串转为数组，返回字符串的长度。能正确处理各种 Unicode 字符，避免 js 将大于\uFFFF 的字符算作 2 个字符的 bug。

```javascript
function countSymbols(string) {
  return Array.from(string).length;
}
```

④map 函数中 this 指向的对象
可以将被处理的数据和处理对象分离，将各种不同的处理数据的方法封装到不同的的对象中去，处理方法采用相同的名字。在调用 Array.from 对数据对象进行转换时，可以将不同的处理对象按实际情况进行注入，以得到不同的结果，适合解耦。这种做法是**模板设计模式**的应用，有点类似于**依赖注入**。

```javascript
let count = {
  add2: function (n) {
    return n + 2;
  },
};
let arr = [1, 2, 3, 4];
Array.from(
  arr,
  function (x) {
    return this.add2(x);
  },
  count
);
```

#### 3. Array.of()

> Array.of(element0[, element1[, ...[, elementN]]])

Array.of()方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
主要目的是弥数组构造函数 Array()的不足，因为参数个数的不同会导致 Array()行为有差异，导致重载。

```javascript
Array(); // []
Array(3); // [,,]
Array(3, 5, 7);
[3, 5, 7];
```

##### 与 Array 构造函数的区别

区别在于处理整数参数:Array.of(7)创建一个具有单个元素 7 的数组，而 Array(7)创建一个长度为 7 的空数组（指一个有 7 个空位(empty)的数组，而不是由 7 个 undefined 组成的数组）

```javascript
Array(2); // [empty × 2]
Array.of(1); // [1]
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(undefined); // [undefined]
```

##### 兼容旧环境

```javascript
const arrayOf = () => {
  if (!Array.of) {
    return Array.prototype.slice.call(arguments);
  }
};

const arrayOf = () => {
  if (!Array.of) {
    return [].slice.call(arguments);
  }
};
```

#### 4. Array.prototype.copyWithin()

> arr.copyWithin(target[, start[, end]])

target 复制序列到该位置，若为负数，从末尾开始计算。
start 开始复制元素的起始位置，如果为负数，从末尾开始计算。
end 开始复制元素的结束位置，但不包括，若为负数，从末尾开始计算。被忽略的话回一直到数组结尾。

`返回值：`返回改变后的数组

```javascript
let arr = [1, 2, 3, 5, 4, 6];

arr.copyWithin(3, 4, 1); // [1, 2, 3, 5, 4, 6]

arr.copyWithin(-1, 4); // [1,2,3,5,4,4]
```

```javascript
// 将3号位复制到0号位
[].copyWithin.call({ length: 5, 3: 1 }, 0, 3);
// {0: 1, 3: 1, length: 5}
```

#### 5. Array.prototype.find()

> arr.find(callback[, thisArg])

`返回值：`返回查找项或者 undefined

#### 6. Array.prototype.findIndex()

弥补了数组 indexOf 方法的不足

`返回值：`返回索引或者 undefined

```javascript
[NaN].indexOf(NaN); //-1

[NaN].findIndex((y) => Object.is(NaN, y));
```

#### 7. Array.prototype.fill()

> arr.fill(value[, start[, end]])

`返回值：`填充后的是数组

```javascript
let arr = [];
arr.length = 2;
arr.fill(1); // [1,1]
```

```javascript
let arr = [1, 2, 3, 4, 5, 6];
arr.fill(7, 2, 3); // [1, 2, 7, 4, 5, 6]
```

#### 8. Array.prototype.entries()

返回一个遍历器对象

```javascript
let entries = ['a', 'b', 'c', 'd'].entries();
entries.next().value; //  [0, "a"]
entries.next().value; //  [1, "b"]
entries.next().value; //  [2, "c"]
entries.next().value; //  [3, "d"]
entries.next().value; //  undefined
```

```javascript
for (let [index, item] of ['a', 'b', 'c', 'd'].entries()) {
  console.log(index, item, typeof index, typeof item);
}
// 0 "a" "number" "string"
// 1 "b" "number" "string"
// 2 "c" "number" "string"
// 3 "d" "number" "string"
```

#### 9. Array.prototype.keys()

返回一个遍历器对象

```javascript
let keys = ['a', 'b', 'c', 'd'].keys();
keys.next().value; //  0
keys.next().value; //  1
keys.next().value; //  2
keys.next().value; //  3
keys.next().value; //  undefined
```

```javascript
for (let index of ['a', 'b', 'c', 'd'].keys()) {
  console.log(index);
}
// 0
// 1
// 2
// 3
```

#### 10. Array.prototype.values()

返回一个遍历器对象

```javascript
let values = ['a', 'b', 'c', 'd'].values();
values.next().value; //  'a'
values.next().value; //  'b'
values.next().value; //  'c'
values.next().value; //  'd'
values.next().value; //  undefined
```

```javascript
for (let index of ['a', 'b', 'c', 'd'].values()) {
  console.log(index);
}
// 'a'
// 'b'
// 'c'
// 'd'
```

#### 11. Array.prototype.includes()

> arr.includes(valueToFind[, fromIndex])

```javascript
let arr = [1, 2, 3, 4, 5, 6];
arr.includes(3); // true;
arr.includes(3, 2); // true;
arr.includes(3, 3); // fasle;
```

indexOf
① 不够语义化，含义是找到参数值出现的第一个位置，所以要比较是否不等于-1，表达不直观。
② 其内部使用严格相等运算符（===）进行判断，会导致对 NaN 的误判。

```javascript
// 严格相等运算符（===）
[NaN].indexOf(NaN); // -1

// 判断算法不一样
[NaN].includes(NaN); // true
```

简体替代

```javascript
const contains =()=>{
	Array.prototype.includes?(arr,value)=>arr.includes(value):(arr,value)=>arr.some(el=>el===value)
}();
contains([1,2,3,4],3); // true
```

#### 12. Array.prototype.flat()

> var newArray = arr.flat([depth])

`depth` 可选指定要提取嵌套数组的结构深度，默认值为 1。返回新数组。

`返回值：`新数组

```javascript
[1, 2, [3, [4, 5]]].flat(); // [1,2,3,[4,5]]

[1, 2, [3, [4, 5]]].flat(2); // [1,2,3,4,5]
```

如果不管有多少层嵌套，都要转成一维数组，可以用`Infinity`关键字作为参数。

```javascript
[1, [2, [3]]].flat(Infinity); // [1, 2, 3]
```

如果原数组有空位，`flat()`方法会跳过空位。

```javascript
[1, 2, , 4, 5].flat(); // [1, 2, 4, 5]
```

#### 13. Array.prototype.flatMap()

`**flatMap()**` 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 连着深度值为 1 的 [flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 几乎相同，但 `flatMap` 通常在合并成一种方法的效率稍微高一些。

`返回值：`新数组

```javascript
let arr = [1, 2, [3, 4]];
arr.flat().map((x) => x + 1); // [2,3,4,5]

let arr1 = ["it's Sunny in", '', 'California'];
arr1.map((x) => x.split(' ')); // [Array(3), Array(1), Array(1)]
arr1.flatMap((x) => x.split(' ')); //  ["it's", "Sunny", "in", "", "California"]
```

#### 14. 数组的空位

数组的空位指数组的某一个位置没有任何值，比如，Array 构造函数返回的数组都是空位。

```javascript
Array(3); /// [,,]
```

**空位不是 undefined,一个位置的值等于 undefined 依然是有值的。空位是没有任何值的。**

```javascript
0 in [undefined, undefined]; // true
0 in [, ,]; // false
```

es5
①forEach()\filter()\every()\some() => 跳过空位
②map()会跳过空位，但会保留这个值。
③join()和 toString()会将空位视为 undefined,而 undefined 和 null 会被理解成空字符串。

es6 明确将空位转为 undefined
由于空位的处理规则非常不统一，所以建议避免出现空位。

## 存在疑问

### 1. new （Date.bind.apply(Date,[null,2015,1,1])）?

### 2. [...string].length 能够正确识别 32 位的 Unicode 字符

### 3. Iterator

遍历器（Iterator）是一种接口，为各种不同的数据接口提供统一的访问机制，任何数据结构，只要部署了 Iterator 接口，就可以完成遍历操作。
原生具备 Iterator：

- **Array**
- **Map**
- **Set**
- **String**
- **TypeArray**
- **函数的 arguments 对象**
- **NodeList 对象**

### 4. Gemerator

### 5. Array.prototype.slice.call（）/[].slice.call(arrayLikes)

Array.prototype.slice.call 能将具有 length 属性的对象转为数组。
[]为数组实例

### 6. 模板设计模式/依赖注入

### 7. slice 用 bind 来转换类数组对象

### 8. 为什么 Array.prototype 是数组

## 文章链接

### 1. [绝对准确地确定 js 对象是否为数组](http://web.mit.edu/jwalden/www/isArray.html)
