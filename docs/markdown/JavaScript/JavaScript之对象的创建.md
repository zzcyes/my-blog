# JavaScript 之对象的创建

**属性类型**

在定义内部才用的特性时，描述了属性的各种特征。这些特性是为了实现 js 引擎用的，在 js 无法直接访问。表示特性是内部值，该规范把它们放在了两队方括号中，例如，[[Enumerable]]

## 工厂模式

解决了创建多个相似对象的问题，但是没有解决对象识别的问题（怎样知道一个对象的类型）

```javascript
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    alert('hello~');
  };
  return o;
}
let o = createPerson('zzc', '23', 'front');
```

## 构造函数模式

```javascript
function Person(name,age,job){
	this.name = name;
  this.age = age;
	this.job = job;
	this.sayName = function(){
  	console.log(this.name;)
  }
}
let person1 = new Person('zzc','23','front');
let person2 = new Person('zh','23','student');
person1.constructor === Person;
person2.constructor === Person;
```

**与工厂模式不同之处：**

- 没有显示地创建对象
- 直接将属性和方法赋给了 this 对象
- 没有 return 语句

构造函数试中都应该以一个大写字母开头，非构造函数则应该以一个小写字母开头。因为构造函数本身也是函数，用于区分。

**创建 Person 的新实例，必须使用 new 操作符。**

1. 创建一个新对象
2. 将构造函数的作用域赋给新对象（this 指向了这个新对象）
3. 执行构造函数中的代码（为新对象添加属性）
4. 返回新对象

**constructor**

最初该属性用来标识对象类型的。但是，提到检测对象类型，instanceof 更可靠点。

**总结**

1. 特点

创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型，这正是构造函数模式胜过工厂模式的地方。

2. 问题

每个方法都要在每个实例上重新创建一遍。不同实例上的同名函数是不相等的。

```javascript
function Person(name) {
  this.name = name;
  this.sayName = function () {
    console.log(this.name);
  };
  // 等价于this.sayName = new Function(console.log(this.name));
}
// 不同实例上的同名函数是不相等的
person1.sayName === person2.sayName; // false;
```

## 原型模式(prototype)

```javascript
function Person() {}
Person.prototype.name = 'zzc';
Person.prototype.sayName = function () {
  console.log(this.name);
};

let person1 = new Person();
let person2 = new Person();
person1.sayName === person2.sayName; // true;
```

**原型对象**

只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 prototype 属性，这个属性指向函数的原型。默认情况下，所有原型对象都会自动获得一个 constructor（构造函数）属性，该属性是一个指向 prototype 属性所在函数的指针。

```javascript
Person.prototype.constructor === Person;
```

当调用构造函数创建一个实例后，该实例的内部将包含一个指针（内部属性），只想构造函数的原型对象。es5 中把这个指针叫做[[prototype]]。Firefox、safari 和 Chrome 在每个对象上都支持一个属性`proto`（没有写进标准）。可以通过 isPrototypeOf()来确定对象之间是否存这种关系。

```javascript
Object.isPrototypeOf(person1); // true
```

person1 内部有一个指向 Person.prototype 的指针，Objcet.getPrototypeOf() =>返回这个对象的原型。可以通过实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。

```javascript
function Person() {}
Person.prototype.name = 'zzcyes';
Person.prototype.getName = function () {
  return this.name;
};
let my = new Person();
my.name = 'zh';
my.getName(); // 'zh'

let he = new Person();

he.name; // 'zzcyes'
he.getName(); // 'zzcyes'
```

当为对象实例添加一个属性时，这个属性就会`屏蔽`原型对象中保存的同名属性；换句话说，添加这个属性只会阻止我们访问原型中的那个属性，但不会修改那个属性。及时这个属性设置为 null,也只会在实例中设置这个属性。使用`delete he.name`可以完全删除实例属性

**组合使用构造函数模式和原型模式**

创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参数。

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['Shelby', 'Court'];
}

Person.prototype = {
  constructor: Person,
  sayName: function () {
    alert(this.name);
  },
};
var person1 = new Person('Nicholas', 29, 'Software Engineer');
var person2 = new Person('Greg', 27, 'Doctor');

person1.friends.push('Van');

alert(person1.friends); //"Shelby,Count,Van"
alert(person2.friends); //"Shelby,Count"
alert(person1.friends === person2.friends); //false
alert(person1.sayName === person2.sayName); //true
```

## 动态原型模式

有其他 OO 语言经验的开发人员在看到独立的构造函数和原型时，很可能会感到非常困惑。动态原型模式正是致力于解决这个问题的一个方案，它把所有信息都封装在了构造函数中，而通过在构造函数中初始化原型（仅在必要的情况下），又保持了同时使用构造函数和原型的优点。换句话说，可以通过检查某个应该存在的方法是否有效，来决定是<br />否需要初始化原型。

```javascript
function Person(name, age, job) {
  //属性
  this.name = name;
  this.age = age;
  this.job = job;
  //方法
  if (typeof this.sayName != 'function') {
    Person.prototype.sayName = function () {
      alert(this.name);
    };
  }
}
var friend = new Person('Nicholas', 29, 'Software Engineer');
friend.sayName();
```

使用动态原型模式时，不能使用对象字面量重写原型。前面已经解释过了，如果在已经创建了实例的情况下重写原型，那么就会切断现有实例与新原型之间的联系。
<a name="fzPOM"></a>

## 寄生构造函数模式

通常，在前述的几种模式都不适用的情况下，可以使用寄生（parasitic）构造函数模式。这种模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象；但表面上看，这个函数又很像是典型的构造函数。

```javascript
function Person(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    alert(this.name);
  };
  return o;
}
var friend = new Person('Nicholas', 29, 'Software Engineer');
friend.sayName(); //"Nicholas"
```

在这个例子中，Person 函数创建了一个新对象，并以相应的属性和方法初始化该对象，然后又返回了这个对象。除了使用 new 操作符并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样的。构造函数在不返回值的情况下，默认会返回新对象实例。而通过在构造函数的末尾添加一个 return 语句，可以重写调用构造函数时返回的值。

这个模式可以在特殊的情况下用来为对象创建构造函数。假设我们想创建一个具有额外方法的特殊数组。由于不能直接修改 Array 构造函数，因此可以使用这个模式。

```javascript
function SpecialArray() {
  //创建数组
  var values = new Array();
  //添加值
  values.push.apply(values, arguments);
  //添加方法
  values.toPipedString = function () {
    return this.join('|');
  };
  //返回数组
  return values;
}
var colors = new SpecialArray('red', 'blue', 'green');
alert(colors.toPipedString()); //"red|blue|green"
```

关于寄生构造函数模式，有一点需要说明：首先，**返回的对象**与**构造函数**或者与**构造函数的原型属性**之间**没有关系**；也就是说，构造函数**返回的对象**与在构造函数**外部创建的对象**没有什么不同。为此，不能依赖 instanceof 操作符来确定对象类型。由于存在上述问题，我们建议在**可以使用其他模式**的情况下，**不要使用这种模式**。

## 稳妥构造函数模式

道格拉斯·克罗克福德（Douglas Crockford）发明了 JavaScript 中的稳妥对象（durable objects）这个概念。所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。稳妥对象最适合在一些安全的环境中（这些环境中会禁止使用 this 和 new），或者在防止数据被其他应用程序（如 Mashup 程序）改动时使用。稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：一是新创建对象的实例方法不引用 this；二是不使用 new 操作符调用构造函数。按照稳妥构造函数的要求，可以将前面的 Person 构造函数重写如下。

```javascript
function Person(name, age, job) {
  //创建要返回的对象
  var o = new Object();
  //可以在这里定义私有变量和函数
  //添加方法
  o.sayName = function () {
    alert(name);
  };
  //返回对象
  return o;
}
```

与寄生构造函数模式类似，使用稳妥构造函数模式**创建的对象**与**构造函数**之间也**没有什么关系**，因此 instanceof 操作符对这种对象也没有意义。

## 查缺补漏

1. 对象字面量创建和 new 的区别，哪种好，为什么?

**new 的原理：**
- new:创建一个新对象。
- 这个新对象会被执行[[原型]]连接。
- 将构造函数的作用域赋值给新对象，即 this 指向这个新对象
- 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

```javascript
function new(func) {
   lat target = {};
   target.__proto__ = func.prototype;
   let res = func.call(target);
   if (typeof(res) == "object" || typeof(res) == "function") {
   	return res;
   }
   return target;
}
```

通过**对象字面量**定义对象时，不会调用 Object 构造函数。new Object() 方式创建对象本质上是方法调用，涉及到在 proto 链中遍历该方法，当找到该方法后，又会生产方法调用必须的**堆栈信息**，方法调用结束后，还要**释放该堆栈**，**性能不如字面量**的方式。
