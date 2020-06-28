# JavaScript 之对象

## 一、属性

### 1. Object.prototype.**proto**

###### 已废弃

该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。

### 2. Object.prototype.constructor

### 3. 属性的可枚举性

enumerable 称为"可枚举性"，若该属性为 false,表示某些操作忽略当前操作。
ES5 三个操作忽略 enumerable 为 false 属性

- for...in
- Object.keys
- JSON.stringify()

# 二、方法

### 1. Object.assign()

> ###### Object.assign(target, ...sources)

`Object.assign()`  方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

target：目标对象
sources：源对象
**返回值：**目标对象

```javascript
let obj = { a: 1 };
let objCopy = Object.assgin({}, obj);
objCopy; // {a:1}

obj.a = 'a';
objCopy; // {a:1}
```

拷贝的是属性值，加入源对象的属性值是一个对象的引用，那么它也指向那个引用。

```javascript
let deepObj = { a: 1 };
let obj = { a: 1, deepObj };
let objCopy = Object.assign({}, obj);
objCopy; // {a:1,deepObj:{a:1}}

obj.deepObj.a = 'a';
objCopy; // {a:1,deepObj:{a:"a"}}
```

##### 合并对象

```javascript
let o1 = { a: 1 };
let o2 = { b: 2 };
let o3 = { c: 3 };
let obj = Object.assign(o1, o2, o3);
obj; // {a:1,b:2,c:3}
o1; // {a:1,b:2,c:3}
```

##### 合并具有象通属性的对象

```javascript
let o1 = { a: 1, b: 1, c: 1 };
let o2 = { b: 2, c: 2 };
let o3 = { c: 3 };
let obj = Object.assign({}, o1, o2, o3);
obj; // {a: 1, b: 2, c: 3}
```

属性被后续参数重具有相同属性的其他对象覆盖

##### 继承属性和不可枚举属性是不能拷贝的

```javascript
const obj = Object.create(
  { foo: 1 },
  {
    // foo继承属性
    bar: {
      value: 2, // 不可枚举属性
    },
    baz: {
      value: 3,
      enumerable: true, // 可枚举属性
    },
  }
);
const copy = Object.assign({}, obj);
console.log(copy); // {baz:3}
```

##### 原始类型会被包装为对象

```javascript
let obj = Object.assign({}, 'abc', null, true, undefined, 10, Symbol('foo'));
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj); // { "0": "a", "1": "b", "2": "c" }

obj = Object.assign({}, 'abc', 'def');
console.log(obj); // { "0": "d", "1": "e", "2": "f" }
```

##### 异常会打断后续拷贝任务

```javascript
const target = Object.defineProperty({}, 'foo', { value: 1, writable: false });
Object.assign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 });

target; // {bar: 2, foo2: 3, foo: 1}
// foo为1,只读属性不能被覆盖，第二个源对象的第二个属性拷贝失败了
// foo3为不存在,baz为2,异常之后assign方法推出了,foo3以及第三个对象都不会被拷贝到
```

##### 拷贝访问器

```javascript
const obj = {
  foo: 1,
  get bar() {
    return 2;
  },
};

let copy = Object.assign({}, obj);
console.log(copy); // { foo: 1, bar: 2 } copy.bar的值来自obj.bar的getter函数的返回值
```

##### 传入一个参数

```javascript
let o = { a: 'a' };
let co = Object.assign(o);
co; // {a:'a'};
o.a = 1;
co; // {a:1};

Object.assign(1); // Number{1}
Object.assign('a'); // String{"a"}
Object.assign(null); // TypeError
Object.assign(undefined); // TypeError
```

##### 为对象添加属性

```javascript
class Point {
  constructor(x, y) {
    Object.assign(this, { x, y });
  }
}
```

##### 为对象添加方法

```javascript
Object.assign(subType.prototype, {
  getAge() {
    return this.age;
  },
});

// 替代
// Subtype.prototype.getAge = function(){return this.age;}
```

### 2. Object.create()

> Object.create(proto[, propertiesObject])

**Object.create()** 方法创建一个新对象，使用现有的对象来提供新创建的对象的**proto**。
**返回值：** 一个新对象，带着指定的原型对象和属性
Tips: 如果 propertiesObject 参数是 null 或非原始包装对象，抛出一个 TypeError 异常。
`proto`新创建对象的原型对象
使用 Object.create 的 propertyObject

```javascript
let o;
o = Object.create(null); // 创建一个原型为null的空对象,{}

o = {};
o = Object.create(Object.prototype); // 等同于字面量创建

o = Object.create(Object.prototype, {
  foo: { writable: true, configurable: true, value: 'hello!!!' },
  bar: {},
});

// 替代构造函数的方法
function Constructor() {}

o = new Constructor();
o = Object.create(Constructor.prototype); // 等同于上一句,若函数又初始化代码，则不能执行。

o = Object.create({}, { p: { value: 42 } }); // 创建一个以另一个空对象为原型,且拥有一个属性p的对象

// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p = 24;
o.p; // 42
```

### 3. Object.defineProperties()

> ###### Object.defineProperties(obj, props)

**Object.defineProperties()** 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
**返回值:** 传递给函数的对象
props:

- configurable => false
- enumerable => false
- writable => false
- value => undefined
- get => undefined
- set => undefined

```javascript
let obj = {a:1};
Object.defineProperties(obj,{
	'b':{
  	value:2,
    writable:true
  },
  'c':{
  	value:3,
  }
})
obj; {a:1,b:2,c:3};

obj.a = 'a';
obj.b = 'b';
obj.c = 'c';

obj; //{a: "a", b: "b", c: 3}

for(let key in obj){console.log(key)}
// a
```

### 4. Object.defineProperty()

> ###### Object.defineProperty(obj, prop,descriptor)

**Object.defineProperty()** 方法直接在一个对象上定义一个新的属性，或修改一个对象的现有属性，并返回该对象。
**返回值:** 传递给函数的对象
props:

- configurable => false
- enumerable => false
- writable => false
- value => false
- get => undefined
- set => undefined

##### 描述符可同时具有的键值

|            | configurable | enumerable | value | writable | get | set |
| :--------- | :----------- | :--------- | :---- | :------- | :-- | :-- |
| 数据描述符 | Yes          | Yes        | Yes   | Yes      | No  | No  |
| 存取描述符 | Yes          | Yes        | No    | No       | Yes | Yes |

```javascript
let o = {}; // 创建一个新对象

// 等同于下面定义 o.a = 37;
Object.defineProperty(o, 'a', {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true,
});

o; // {a:37}

let bValue;
Object.defineProperty(o, 'b', {
  get: function () {
    return bValue;
  },
  set: function (newValue) {
    bValue = newValue * 2;
  },
  enumerable: true,
  configurable: true,
});

o.b = 1;
o; // {a:37}
o.b; // 2

for (let key in o) {
  console.log(key);
}
// a
// b

// 数据描述符和存取描述符不能混合使用
Object.defineProperty(o, 'conflict', {
  value: 0x9f91102,
  get: function () {
    return 0xdeadbeef;
  },
}); // 报错
```

##### 修改属性

###### **Writable**

表示能否修改属性的值。

```javascript
let o = {};
Object.defineProperty(o,'a',{value: 1,writable:false});
o.a = 'a';
o.a; // 1

// 严格模式会报错
'use strict'
let o = {};
Object.defineProperty(o,'a',{value: 1,writable:false});
o.a = 'a'; // Uncaught TypeError: Cannot assign to read only property 'a' of object '#<Object>'
    at <anonymous>:9:5
```

###### **Enumerable**

表示能否通过  [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)  循环返回属性。在  [`Object.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)  中能否被枚举。

```javascript
let o = {};
Object.defineProperty(o, 'a', { value: 1, enumerable: false });
Object.defineProperty(o, 'b', { value: 2, enumerable: true });
o; // {a:1}

for (let key in o) {
  console.log(key);
}
// b

Object.keys(o); // ["b"]

o.propertyIsEnumerable('a'); // false
o.propertyIsEnumerable('b'); // true
```

###### **Configurable**

表示能否通过 delete 删除属性从而定义属性,能否修改属性的特性，或者能够把属性修改为访问器属性

```javascript
let o = {};
Object.defineProperty(o,'a',{value: 1,configurable:false});
Object.defineProperty(o,'b',{value: 2,configurable:true});
o; // {a:1,b:2}

Object.defineProperty(o,'a',{value:'a'}); // Uncaught TypeError: Cannot redefine property: a
    at Function.defineProperty (<anonymous>)
    at <anonymous>:1:8
Object.defineProperty(o,'b',{value: 'b'});
o; // {a:1,b:'b'}
```

###### **继承属性**

如果访问者的属性是被继承的，它的  `get`  和`set`  方法会在子对象的属性被访问或者修改时被调用。如果这些方法用一个变量存值，该值会被所有对象共享。

```javascript
function Point() {}
let value;
Object.defineProperty(Point.prototype, 'x', {
  get() {
    return value;
  },
  set(x) {
    value = x;
  },
});

let a = new Point(),
  b = new Point();
a.x = 1;
b.x; // 1
```

可以通过将值存储在另一个属性中解决。在 get 和 set 方法中，this 指向某个被访问和修改属性的对象。

```javascript
function Point() {}
Object.defineProperty(Point.prototype, 'x', {
  get() {
    return this.value;
  },
  set(x) {
    this.value = x;
  },
});

let a = new Point(),
  b = new Point();
a.x = 1;
b.x; // undefined
```

### 5. Object.entries()

**Object.entries()** 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用  [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)  循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）
**返回值：** 给定对象自身可枚举属性的键值对数组

```javascript
function Person() {
  this.age = 15;
}
Person.prototype.sex = 'girl';
let p = new Person();

for (let key in p) {
  console.log(key);
}
// age
// sex

// 配合for-of
Object.entries(p); // [["age",15]]
for (let [key, value] of Object.entries(p)) {
  console.log(key, value);
}
// age 15
```

**将 Object 转换为 Map**

```javascript
let obj = { a: 1, b: 2 };
let map = new Map(Object.entries(obj));
map; // Map{a:1,b:2}
```

**过滤属性名为 Symbol 值的属性**

```javascript
let o = { a: 1, [Symbol('b')]: 2 };
o; // {a: 1, Symbol(b): 2}
Object.entries(o); //  [["a", 1]]
```

###

### 6. Object.fromEntries()

> Object.fromEntries(iterable);

**iterable：** 可迭代对象，类似 Array、Map 或者其它实现了可迭代协议的对象
**返回值：** 一个由该迭代对象条目提供对应属性的新对象

```javascript
const entries = new Map([
  ['a', 1],
  ['b', 2],
]);

const obj = Object.fromEntries(entries);
obj; // {a:1,b:2}
```

**Array 转化为 Object**

```javascript
const arr = [
  ['0', 'a'],
  ['1', 'b'],
  ['2', 'c'],
];
const obj = Object.fromEntries(arr);
obj; //  { 0: "a", 1: "b", 2: "c" }
```

### 7. Object.keys()

**Object.keys()** 方法会返回一个由一个给定对象的自身**可枚举属性**组成的数组，数组中属性名的排列顺序和使用 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)  循环遍历该对象时返回的顺序一致 。
**返回值：** 一个表示给定对象的所有可枚举属性的字符串数组

```javascript
let o = {a:1,b(){console.log('hello,func 2')};
Object.defineProperty(o,'c',{
	value:3,
})
o; // {a:1,b:f,c:3}
Object.keys(o); // ['a','c'];
```

Tips: ES2015 中，非对象的参数将被强制转化为一个对象(ES5 排除 TypeError)

```javascript
Object.keys('abc'); // ["0","1","2"]
```

**过滤属性名为 Symbol 值的属性**

```javascript
let o = { a: 1, [Symbol('b')]: 2 };
o; // {a: 1, Symbol(b): 2}
Object.keys(o); // ["a"]
```

### 8. Object.values()

**Object.values()** 方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用[`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。
**返回值：** 一个包含自身对象的所有**可枚举属性值**的数组

```javascript
let obj = { a: 1, b: 2 };
Object.values(obj); // [1,2]

Object.defineProperty(o, 'c', {
  enumerable: true,
  get() {
    values;
  },
  set(x) {
    values = x;
  },
});

obj.c = 3;
obj; // {a:1,b:2}
Object.values(obj); // [1,2,3]
```

Tips: ES2015 中，非对象的参数将被强制转化为一个对象(ES5 排除 TypeError)

```javascript
Object.values('abc'); // ["a","b","c"]
```

过滤属性名为**Symbol**值的属性

```javascript
let o = { a: 1, [Symbol('b')]: 2 };
o; // {a: 1, Symbol(b): 2}
Object.values(o); // [1]
```

##

### 9. Object.getOwnPropertyDescriptor()

> Object.getOwnPropertyDescriptor(_obj_, _prop_)

**`Object.getOwnPropertyDescriptor()`**  方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
**返回值：** 如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回  [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

```javascript
var o, d;
o = {
  get foo() {
    return 17;
  },
};
d = Object.getOwnPropertyDescriptor(o, 'foo');
//{
//get: ƒ foo(),
//set: undefined,
//enumerable: true,
//configurable: true
//}
```

在 ES5 中，如果该方法的第一个参数不是对象（而是原始类型），那么就会产生出现  [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。而在  ES2015，第一个的参数不是对象的话就会被强制转换为对象。

```javascript
Object.getOwnPropertyDescriptor('foo', 0);
// 类型错误: "foo" 不是一个对象  // ES5 code

Object.getOwnPropertyDescriptor('foo', 0);
// Object returned by ES2015 code: {
//   configurable: false,
//   enumerable: true,
//   value: "f",
//   writable: false
// }
```

### 10. Object.getOwnPropertyDescriptors()

> Object.getOwnPropertyDescriptors(_obj_)

**Object.getOwnPropertyDescriptors()** 方法用来获取一个对象的所有自身属性的描述符。

**返回值：** 所指定对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。

```javascript
let o = {a:1};
Object.getOwnPropertyDescriptors( o );
{
    a:{
        value:1,
        writable:true,
        enumberable:true,
        configurable:true
    }
}
```

浅拷贝一个对象

```javascript
function createObj(obj) {
  return Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  );
}

let o = { a: 1, b: { b: 2 } };
let co = createObj(o); //  {a:1,b:{b:2}};
o.a = 'a';
co.a; // 1

o.b.b = 'b';
co.b.b; // 'b'
```

创建子类

```javascript
function superclass() {}
superclass.prototype = {
  // 在这里定义方法和属性
};
function subclass() {}
subclass.prototype = Object.create(
  superclass.prototype,
  Object.getOwnPropertyDescriptors({
    // 在这里定义方法和属性
  })
);
```

### 11. Object.getOwnPropertyNames()

**Object.getOwnPropertyNames()** 方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。
**返回值：** 在给定对象上找到的自身属性对应的字符串数组。

```javascript
let o = {
  a: 1,
  b: 2,
  c: function () {
    return 3;
  },
  [Symbol('d')]: 4,
};
Object.getOwnPropertyNames(o); // ['a','b','c']
```

如果你只要获取到可枚举属性，查看[`Object.keys`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)或用[`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)循环（还会获取到原型链上的可枚举属性，不过可以使用[`hasOwnProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)方法过滤掉）。

在 ES5 中，如果参数不是一个原始对象类型，将抛出一个  [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)  异常。在  ES2015  中，非对象参数被强制转换为对象  **。**

```javascript
Object.getOwnPropertyNames('foo');
// TypeError: "foo" is not an object (ES5 code)

Object.getOwnPropertyNames('foo');
// ['length', '0', '1', '2']  (ES2015 code)
```

### 12. Object.getOwnPropertySymbols()    

**Object.getOwnPropertySymbols()** 方法返回一个给定对象自身的所有 Symbol  属性的数组。

###### **返回值：** 在给定对象自身上找到的所有 Symbol  属性的数组。

```javascript
let o = {
  a: 1,
  b: 2,
  c: function () {
    return 3;
  },
  [Symbol('d')]: 4,
  [Symbol('e')]: 5,
};
Object.getOwnPropertySymbols(o); // [Symbol(d), Symbol(e)]
```

### 13. Object.freeze()

**Object.freeze()**  方法可以**冻结**一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。
**返回值：**`freeze()`  返回和传入的参数相同的对象。

```javascript
let obj = { a: 1 };
Object.freeze(obj); // {a:1}
obj.b = 2; // 严格模式下抛出typeError
obj; // {a:1}
```

### 14. Object.isFrozen()

**Object.isFrozen()** 方法判断一个对象是否被[冻结](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)。

###### **返回值：** 表示给定对象是否被冻结的[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)

一个对象是冻结的是指它不可[`扩展`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)，所有属性都是不可配置的，且所有数据属性（即没有 getter 或 setter 组件的访问器的属性）都是不可写的。

##### 不可扩展的空对象同时也是一个冻结对象

```javascript
Object.isFrozen({}); // false

let frozen = Object.preventExtensions({});
Object.isFrozen(frozen); // true
```

##### 不可扩展，但是 p 属性可以修改，不意味着这对象变成冻结对象

```javascript
// 不可扩展，但是p属性可以修改，并不意味着这个对象变成了冻结对象
let oneProp = { p: 24 };
Object.preventExtensions(oneProp);
Object.isFrozen(oneProp); // false

// 删除p属性,则成为一个冻结对象
delete oneProp.p;
Object.isFrozen(oneProp); // true
```

##### 一个不可扩展的对象,拥有一个不可写但可配置的属性,则它仍然是非冻结的

```javascript
let nonWritable = { e: 'plep' };
Object.preventExtensions(nonWritable);
Object.defineProperty(nonWritable, 'e', { writable: false }); // 变得不可写
Object.isFrozen(nonWritable); // false

Object.defineProperty(nonWritable, 'e', { configurable: false }); // 变得不可配置
Object.isFrozen(nonWritable); // true
```

##### 一个不可扩展的对象,拥有一个不可配置但可写的属性,则它仍然是非冻结的

```javascript
let nonConfigurable = { release: 'the kraken!' };
Object.preventExtensions(nonConfigurable);
Object.defineProperty(nonConfigurable, 'release', { configurable: false });
Object.isFrozen(nonConfigurable); // false

// 把这个属性改为不可写,会让这个对象成为冻结对象
Object.defineProperty(nonConfigurable, 'release', { writable: false });
Object.isFrozen(nonConfigurable); // true
```

##### 一个不可扩展的对象,值拥有一个访问器属性,则它仍然是非冻结的

```javascript
let accessor = {
  get food() {
    return 'yum';
  },
};
Object.preventExtensions(accessor);
Object.isFrozen(accessor); // false

// 但把这个属性改为不可配置,会让这个对象成为冻结对象
Object.defineProperty(accessor, 'food', { configurable: false });
Object.isFrozen(accessor); // true
```

##### Object.freeze 冻结对象最方便的方法

```javascript
let frozen = { a: 1 };
Object.isFrozen(fronzen); // false
Object.freeze(frozen);
Object.isFrozen(fronzen); // true

// 一个冻结对象也是一个密封对象
Object.isSealed(frozen); // rue

// 当然,更是一个不可扩展的对象.
Object.isExtensible(frozen); // false
```

### 15. Object.isExtensible()

##### `Object.isExtensible()`  方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）

**返回值:** 表示给定对象是否可扩展的一个[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean) 
对象是可扩展的：即可以为他们添加新的属性,以及他们的**proto**属性可以被更改。[`Object.preventExtensions`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)，[`Object.seal`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)  或  [`Object.freeze`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)  方法都可以标记一个对象为不可扩展（non-extensible）

```javascript
// 新对象默认是可扩展的
let empty = {};
Object.isExtensible(empty); // true

// 可以变的不可扩展
Object.preventExtensions(empty);
Object.isExtensible(empty); // false

// 密封对象是不可扩展的.
let sealed = Object.seal({});
Object.isExtensible(sealed); // false

// 冻结对象也是不可扩展
let frozen = Object.freeze({});
Object.isExtensible(frozen); // false
```

Tips：在 ES5 中，如果参数不是一个对象类型，将抛出一个  [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)  异常。在 ES6 中， non-object 参数将被视为一个不可扩展的普通对象，因此会返回 false 。

### 16. Object.seal()

**Object.seal()** 方法封闭一个对象，阻止**添加新属性**并将所有现有属性标记为**不可配置**。属性不可配置的效果就是属性变的不可删除，以及一个数据属性不能被重新定义成为访问器属性，或者反之。当前属性的值只要原来是**可写**的就可以改变。
**返回值：** 被密封的对象

```javascript
let obj = { a: 1 };
Object.seal(obj);

// 阻止添加新属性
Object.defineProperty(obj, 'b', {
  value: 1,
  writable: false,
}); // TypeError

// 不可定义为访问器属性
Object.defineProperty(obj, 'foo', {
  get: function () {
    return 'g';
  },
}); // TypeError

// 阻止删除
delete obj.a; // false

Object.defineProperty(obj, 'a', {
  value: 2,
  writable: true,
  enumerable: true,
  configureable: true,
});
obj.a; // 2
```

### 17. Object.isSealed()

**Object.isSealed()**  方法判断一个对象是否被密封。
**返回值：** 表示给定对象是否被密封的 Boolean

```javascript
let obj = {};
Object.isSealed(obj); // false;
Object.seal(obj); // {}
Object.isSealed(obj); // true;
```

##### 不可扩展对象也同时变为密封对象（一个密封对象也是不可扩展的）

```javascript
let obj = {};
Object.isExtensible(obj); // {}
Object.isSealed(obj); // true
Object.isExtensible(sealed); //false

// 但如果这个对象不是空对象,则它不会变成密封对象,因为密封对象的所有自身属性必须是不可配置的.
let hasProp = { fee: 'fie foe fum' };
Object.preventExtensions(hasProp);
Object.isSealed(hasProp); // false

// 如果属性变的不可配置，就成了蜜封对象
Object.defineProperty(hasProp, 'fee', { configurable: false });
Object.isSealed(hasProp); // true
```

Tips:在 ES5 中，如果这个方法的参数不是一个对象（一个原始类型），那么它会导致[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。在 ES2015 中，非对象参数将被视为是一个密封的普通对象，只返回`true`。

### 18. Object.prototype.propertyIsEnumerable()

**propertyIsEnumerable()**  方法返回一个布尔值，表示指定的属性是否可枚举。
**返回值：** 用来表示指定的属性名是否可枚举的[`布尔值`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)

##### 基本用法

```javascript
var o = {};
var a = [];
o.prop = 'is enumerable';
a[0] = 'is enumerable';

o.propertyIsEnumerable('prop'); // 返回 true
a.propertyIsEnumerable(0); // 返回 true
```

##### 自定义对象和内置对象

```javascript
let a = [1, 2];
a.propertyIsEnumerable(0); // true
a.propertyIsEnumerable('length'); // false

a.myage = 15;
a.propertyIsEnumerable('myage'); // true

Math.propertyIsEnumerable('random'); // false
this.propertyIsEnumerable('random'); // false
```

##### 自身继承和继承属性

```javascript
let a = [];
a.propertyIsEnumeable('constructor'); // false

function Person() {
  this.pAge = 42;
}
Person.prototype.getPAge = function () {
  return this.pAge;
};

function Son() {
  this.sAge = 18;
}
Son.prorotype = new Person();
Son.prototype.constructor = Son;
Son.prototype.getSAge = function () {
  return this.sAge;
};

let s = new Son();
s.propertyIsEnumerable('sAge'); // true

s.propertyIsEnumerable('getSAge'); // false
s.propertyIsEnumerable('pAge'); // false

s.pAge = 43;
s.propertyIsEnumerable('pAge'); // true

// 在原型链上 propertyIsEnumerable 不被考虑
s.propertyIsEnumerable('prototype'); // false
s.propertyIsEnumerable('constructor'); // false
s.propertyIsEnumerable('getPAge'); // false
```

### 19. Object.perventExtensions()

**Object.preventExtensions()** 方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。
**返回值：** 已经不可扩展的对象
`Object.preventExtensions()`仅阻止添加自身的属性。但属性仍然可以添加到对象原型。

```javascript
let nonExtensible = { removable: true };
Object.preventExtensions(nonExtensible); // { removable: true }
Object.defineProperty(nonExtensible, 'new', { value: 8675309 }); // TypeError
```

### 20. Object.prototype.hasOwnProperty()

**hasOwnProperty()**  方法会返回一个布尔值，指示对象**自身属性**中是否具有指定的属性（也就是，是否有指定的键）
**返回值：** 用来判断某个对象是否含有指定的属性的布尔值 Boolean
Tips:这个方法可以用来检测一个对象是否含有特定的自身属性；和  [`in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in)  运算符不同，该方法会**忽略**掉那些从**原型链上继承**到的属性。

```javascript
let obj = { a: 1 };
let eObj = { d: 2 };
Object.defineProperties(obj, {
  b: {
    value: 2,
    writable: true,
  },
  c: {
    value: 3,
  },
});
obj.hasOwnProperty('a'); // true
obj.hasOwnProperty('b'); // true
obj.hasOwnProperty('c'); // true

for (let key in obj) {
  console.log(key);
}
// 'a'
```

即使属性的值是  `null`  或  `undefined`，只要属性存在，`hasOwnProperty`  依旧会返回  `true`。

```javascript
o = new Object();
o.propOne = null;
o.hasOwnProperty('propOne'); // 返回 true
o.propTwo = undefined;
o.hasOwnProperty('propTwo'); // 返回 true
```

使用  `hasOwnProperty`  作为属性名

```javascript
let obj = {
  hasOwnProperty: function () {
    return false;
  },
  bar: 1,
};

// 应当使用
({}.hasOwnProperty.call(obj, 'bar')); // true
```

### 21. Object.getPrototypeOf()

**Object.getPrototypeOf()** 方法返回指定对象的原型（内部`[[Prototype]]`属性的值）。
**返回值：** 给定对象的原型。如果没有继承属性，则返回  [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)

```javascript
const prototype1 = {};
const object1 = Object.create(prototype1);

Object.getPrototypeOf(object1) === prototype1; // true

object1.prototype === prototype1; // false
```

**Object.getPrototypeOf(Object)  不是   Object.prototype**

```javascript
JavaScript中的 Object 是构造函数（创建对象的包装器）。
一般用法是：
var obj = new Object();

所以：
Object.getPrototypeOf( Object );               // ƒ () { [native code] }
Object.getPrototypeOf( Function );             // ƒ () { [native code] }

Object.getPrototypeOf( Object ) === Function.prototype;        // true

Object.getPrototypeOf( Object )是把Object这一构造函数看作对象，
返回的当然是函数对象的原型，也就是 Function.prototype。

正确的方法是，Object.prototype是构造出来的对象的原型。
var obj = new Object();
Object.prototype === Object.getPrototypeOf( obj );              // true

Object.prototype === Object.getPrototypeOf( {} );               // true
```

在 ES5 中，如果参数不是一个对象类型，将抛出一个[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)异常。在 ES2015 中，参数会被强制转换为一个  [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)**。**

```javascript
Object.getPrototypeOf('foo');
// TypeError: "foo" is not an object (ES5 code)
Object.getPrototypeOf('foo');
// String.prototype                  (ES2015 code)
```

### 22. Object.prototype.isPrototypeOf()

**isPrototypeOf()**  方法用于测试一个对象是否存在于另一个对象的原型链上。
**返回值：** 表示调用对象是否在另一个对象的原型链上

```javascript
function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

var baz = new Baz();

console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true
```

### 23. Object..setPrototypeOf()

**Object.setPrototypeOf()** 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)。
**警告:**   由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，更改对象的  `[[Prototype]]`在**_各个_**浏览器和 JavaScript 引擎上都是一个很慢的操作。其在更改继承的性能上的影响是微妙而又广泛的，这不仅仅限于  `obj.__proto__ = ...`  语句上的时间花费，而且可能会延伸到**_任何_**代码，那些可以访问**_任何_**`[[Prototype]]`已被更改的对象的代码。如果你关心性能，你应该避免设置一个对象的  `[[Prototype]]`。相反，你应该使用  [`Object.create()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)来创建带有你想要的`[[Prototype]]`的新对象。

```javascript
var dict = Object.setPrototypeOf({}, null);
```

### 24. Object.prototype.toLocaleString()

**toLocaleString()**  方法返回一个该对象的字符串表示。此方法被用于派生对象为了特定语言环境的目的（locale-specific purposes）而重载使用。

```javascript
let obj = {};
obj.toLocaleString(); // [object Object]
```

[`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) `toLocaleString`  返回调用  [`toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)  的结果。
覆盖 toLocaleString 的对象

- [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array)：[`Array.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
- [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)：[`Number.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
- [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Date)：[`Date.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)

### 25. Object.prototype.toString()

**toString()**  方法返回一个表示该对象的字符串。

###### **返回值：** 一个表示该对象的字符串

```javascript
let arr = [1, 2, 3, 4],
  obj = { a: 1 },
  str = 'str',
  num = 24,
  bol = true,
  und = undefined,
  nul = null,
  sym = Symbol('sym');
arr.toString(); // "1,2,3,4"
obj.toString(); // "[object Object]"
str.toString(); // "str"
num.toString(); // "24"
bol.toString(); // "true"
und.toString(); // TypeError
nul.toString(); // TypeError
sym.toString(); // "Symbol(sym)"
```

每个对象都有一个 `toString()` 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。默认情况下，`toString()` 方法被每个 `Object` 对象继承。如果此方法在自定义对象中**未被覆盖**，`toString()` 返回  "[object _type_]"，其中 `type` 是对象的类型。

```javascript
function typesOf(x) {
  return Object.prototype.toString.call(x);
}
let arr = [1, 2, 3, 4],
  obj = { a: 1 },
  str = 'str',
  num = 24,
  bol = true,
  und = undefined,
  nul = null,
  sym = Symbol('sym');
typesOf(arr); // "[object Array]"
typesOf(obj); // "[object Object]"
typesOf(str); // "[object String]"
typesOf(num); // "[object Number]"
typesOf(bol); // "[object Boolean]"
typesOf(und); // "[object Undefined]"
typesOf(nul); // "[object Null]"
typesOf(sym); // "[object Symbol]"
typesOf(typesOf); // "[object Function]"
typesOf(new Date()); // "[object Date]"
```

### 26. Object.prototype.toSource()

**非标准**
该特性是非标准的，请尽量不要在生产环境中使用它！
**返回值：** 一个表示对象的源代码的字符串。

### 27. Object.prototype.valueOf()

###### `valueOf()`  方法返回指定对象的原始值。

###### **返回值：**`valueOf()`  方法返回指定对象的原始值。

```javascript
let arr = [1,2,3,4],obj={a:1},str="str",num=24,bol=true,und=undefined,nul=null,sym=Symbol("sym");
arr.valueOf(); // [1, 2, 3, 4]
obj.valueOf(); // {a:1}
str.valueOf(); // "str"
num.valueOf(); // 24
bol.valueOf(); // true
und.valueOf(); // TypeError
nul.valueOf(); // TypeError
sym.valueOf(); // Symbol(sym)

(new Date()).valueOf(); // 1583565205880

typesOf.valueOf(); // ƒ typesOf(x){
	return Object.prototype.toString.call(x);
}


Math 和 Error 对象没有valueOf方法
```

```javascript
var newBool = new Boolean(true);
// valueOf()返回的是true，两者的值相等
newBool.valueOf() == newBool; // true

// 两者类型不相等，前者是boolean类型，后者是object类型
newBool.valueOf() === newBool; // false

// String：返回字符串值
var str = 'http://www.xyz.com';
str.valueOf() === str; // true

// new一个字符串对象
var str2 = new String('http://www.xyz.com');
// 但不全等，因为类型不同，前者为string类型，后者为object类型
str2.valueOf() === str2; // false
```

### 28. Object.is()

`Object.is()` 判断两个值是否[相同](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)。如果下列任何一项成立，则两个值相同：

- 两个值都是 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- 两个值都是 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)
- 两个值都是 `true` 或者都是 `false`
- 两个值是由相同个数的字符按照相同的顺序组成的字符串
- 两个值指向同一个对象
- 两个值都是数字并且
  - 都是正零 `+0`
  - 都是负零 `-0`
  - 都是 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)
  - 都是除零和 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 外的其它同一个数字

这种相等性判断逻辑和传统的 [`==`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality) 运算不同，[`==`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality) 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较，（所以才会有类似 `"" == false` 等于 `true` 的现象），但 `Object.is` 不会做这种类型转换。
这与 [`===`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity) 运算符的判定方式也不一样。[`===`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity) 运算符（和[`==`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality) 运算符）将数字值 `-0` 和 `+0` 视为相等，并认为 [`Number.NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN) 不等于 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)。
**ployill**

```javascript
if (!Object.is) {
  Object.is = function (x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  };
}
```

# 三、对象遍历

## 1. for-in

遍历输出的是**对象自身的属性**以及**原型链上可枚举**的属性(**不含 Symbol 属性**),原型链上的属性最后输出说明先遍历的是自身的可枚举属性,后遍历原型链上的

## 2. Object.keys(obj)

遍历对象返回的是一个包含对象**自身可枚举属性**的数组(不含 Symbol 属性).

## 3. Object.getOwnPropertyNames(obj)

###### 输出对象**自身的可枚举**和**不可枚举属性**的**数组**,不输出原型链上的属性

## 4. Object.getOwnPropertySymbols(obj)

## 5. Reflect.ownKeys(obj)

返回对象**自身的所有属性**,不管属性名是 S**ymbol 或字符串,也不管是否可枚举**.静态方法  `**Reflect**`**`.ownKeys()`**  返回一个由目标对象自身的属性键组成的数组。

## 6. for-of/Object.keys(o)

# 存在疑问

## 1. 0/0 为 NaN、NaN === NaN

## 2. **getPrototypeOf**

##

###
