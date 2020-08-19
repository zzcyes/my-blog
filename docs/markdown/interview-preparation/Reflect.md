# Reflect

## 1.概述

`Reflect`对象是ES6提供的新API，存在即合理，为什么设计这样一个API呢？

阮一峰[《ECMAScript 6 入门》](https://es6.ruanyifeng.com/#docs/reflect)的描述：

(1) 将Object对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

(2) 修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

- 老写法
```javascript
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}
```

- 新写法
```javascript
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

(3) 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。

- 老写法
```javascript
'assign' in Object // true
```

- 新写法
```javascript
Reflect.has(Object, 'assign') // true
```

(4) Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

```javascript
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
```

上面代码中，Proxy方法拦截target对象的属性赋值行为。它采用Reflect.set方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。

下面是另一个例子。
```javascript
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
```

上面代码中，每一个Proxy对象的拦截操作（get、delete、has），内部都调用对应的Reflect方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志。

有了Reflect对象以后，很多操作会更易读。

老写法:
```javascript
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1
```

新写法:
```javascript
Reflect.apply(Math.floor, undefined, [1.75]) // 1
```

## 总结

### 1.设计的目的

1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。

2. 修改某些Object方法的返回结果，让其变得更合理。

3. 让Object操作都变成函数行为。

4. Reflect对象的方法与Proxy对象的方法一一对应，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
