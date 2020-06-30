# 008：JavaScript 之 function

## 一、属性

### 1.Function 构造函数

> new Function ([arg1[, arg2[, ...argN]],] functionBody)

```javascript
let func = new Function('a', 'b', 'return a+b');
func(1 + 2); // 3
```

直接调用此构造函数可用动态创建函数，但会遭遇来自  [`eval`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/eval)  的安全问题和相对较小的性能问题。然而，与 eval 不同的是，Function 构造函数只在全局作用域中运行。

使用  `Function`  构造器生成的  `Function`  对象是在函数创建时解析的。这比你使用[函数声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function)或者[函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function)并在你的代码中调用更为低效，因为使用后者创建的函数是跟其他代码一起解析的。

**函数声明**

```javascript
function func(type) {
  return type === 'Declaration';
}
```

**函数表达**

```javascript
let funExpression = function (type) {
  return type === 'Expression';
};
```

### 2.Function.arguments

已被废弃，用 arguments 对象替代

**arguments**

`arguments`对象是所有（非箭头）函数中都可用的**局部变量**。你可以使用`arguments`对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，第一个参数在索引 0 处。

```javascript
function func() {
  return arguments;
}
func(1, 2, 3, 4, 5);
// 类数组对象
// Arguments(5) [1,2,3,4,5, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

参数可以设置,且可被转化为数组

```javascript
function func() {
  arguments[0] = 'arguments_0';
  return arguments;
}
const retObj = func(1);
// Arguments ["arguments_0", callee: ƒ, Symbol(Symbol.iterator): ƒ]

// 转化为数组
let arr;
arr = Array.prototype.slice.call(retObj); // ['arguments_0']
arr = [].slice.call(retObj); // ['arguments_0']

// ES2015
arr = Array.from(retObj); // ['arguments_0']
arr = [...retObj]; // ['arguments_0']
```

```javascript
var args =
  arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
```

如果调用的参数多于正式声明接受的参数，则可以使用`arguments`对象。这种技术对于可以传递可变数量的参数的函数很有用。使用  [arguments.length](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Functions_and_function_scope/arguments/length)来确定传递给函数参数的个数，然后使用`arguments`对象来处理每个参数。要确定函数[签名](https://developer.mozilla.org/zh-CN/docs/Glossary/Signature/Function)中（输入）参数的数量，请使用[Function.length](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/length)属性。

**arguments.callee**

指向当前执行的函数

```javascript
function func(){
	return arguments.callee;
}

const funcCopy = func()

console.log(funcCopy);
// 输出结果
ƒ func(){
	return arguments.callee;
}
```

**arguments.caller**

> Tips:该 api 不能保证有用

指向调用当前函数的函数。

**arguments.length**

指向传递给当前函数的参数数量

**arguments[@@iterator]**

返回一个新的 Array 迭代器对象，该对象包含参数中每个索引的值。

```javascript
function func() {
  let args = arguments;
  for (let x of args) {
    console.warn(x);
  }
}
func(1, 2, 3, 4);
1;
2;
3;
4;
```

**定义连接字符串的函数**

```javascript
function stringConcat(separator) {
  let args = Array.prototype.slice.call(arguments, 1);
  return args.join(separator);
}
stringConcat('-', 1, 2, 3, 4, 5, 6); // 1-2-3-4-5-6
```

### 3.Function.name

**函数声明的名称**

```javascript
function thisFunc() {}
thisFunc.name; // 'thisFunc'

// 匿名函数名称
new Function().name; // "anonymous"
```

**绑定函数**

Function.bind() 所创建的函数将会在函数的名称前加上"bound " 。

```javascript
let obj = {
  x: 123,
  getX() {
    return this.x;
  },
};

let getXX = obj.getX;
getXX.name; // 'getX'

let bindGetXX = getXX.bind(obj);
bindGetXX.name; //'bound getX';
```

**类中的函数名称**

```javascript
function Foo() {}
var fooInstance = new Foo();
fooInstance.constructor.name; // "Foo"

fooInstance.constructor = function baz() {};

fooInstance.constructor.name; // "baz"

// ES2015
class person {}
person.name; // 'person'

class man extends person {
  static name = 'static name';
}

man.name; // 'static name'
```

**getters 和 setters 的函数名**

```javascript
var o = {
  get foo() {},
  set foo(x) {},
};

var descriptor = Object.getOwnPropertyDescriptor(o, 'foo');
descriptor.get.name; // "get foo"
descriptor.set.name; // "set foo";
```

**Symbol 作为函数名称**

```javascript
var sym1 = Symbol('foo');
var sym2 = Symbol();
var o = {
  [sym1]: function () {},
  [sym2]: function () {},
};

o[sym1].name; // "[foo]"
o[sym2].name; // ""
```

**JavaScript 压缩和 minifiers**

当使用`Function.name`和那些 JavaScript 压缩器（minifiers）或混淆器进行源码转换时要小心。这些工具通常用作 JavaScript 构建管道的一部分，以在程序部署到生产之前减少程序的大小。但这种转换通常会在构建时更改函数的名称

```javascript
function Foo() {}
var foo = new Foo();

if (foo.constructor.name === 'Foo') {
  console.log("'foo' is an instance of 'Foo'");
} else {
  console.log('Oops!');
}
```

压缩为

```javascript
function a() {}
var b = new a();
if (b.constructor.name === 'Foo') {
  console.log("'foo' is an instance of 'Foo'");
} else {
  console.log('Oops!');
}
```

如果您依赖于`Function.name`，就像上面的示例一样，确保您的构建管道不会更改函数名称，也不要假定函数具有特定的名称。

### 4.Function.length

`length`  属性指明函数的形参个数。

### 5.Function.prototype

`Function.prototype`  属性存储了  [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Function)  的原型对象。

## 二、方法

### 1. Function.prototype.bind()

> function.bind(thisArg[, arg1[, arg2[, ...]]])

`**bind()**`  方法创建一个新的函数，在  `bind()`  被调用时，这个新函数的  `this`  被指定为  `bind()`  的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```javascript
const obj = {
  x: 'x',
  getX() {
    return this.x;
  },
};

const unBindFunc = obj.getX;
unBindFunc(); // undefined

const bindFunc = unBindFunc.bind(obj);
bindFunc(); // 'x'
```

### 2. Function.prototype.call()

### 3. Function.prototype.apply()

### 4. Function.prototype.toString()

```javascript
function baz() {}
baz.toString(); // 'function baz(){}'
```
