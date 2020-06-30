# 005：JavaScript 之原型、原型链、prototype、_proto_

## 1. 原型

## 2. 原型链

## 3. 普通对象与函数对象

Object 和 Function 是 JavaScript 自带的两个典型的函数对象<br />函数对象就是一个纯函数，所谓的  `函数对象`，其实就是使用  `JavaScript`  在  `模拟类`。<br />所有`Function`的实例都是`函数对象`，而其他的都是`普通对象`。<br />![](https://cdn.nlark.com/yuque/0/2020/webp/553597/1582442601252-59e17442-707c-42ac-8585-466b6ec5727c.webp#align=left&display=inline&height=390&originHeight=390&originWidth=1280&size=0&status=done&style=none&width=1280)<br />从图中可以看出，对象的实现还是要依靠构造函数。<br />众所周知，作为一门面向对象（Object Oriented）的语言，必定具有以下特征：

- 对象唯一性
- 抽象性
- 继承性
- 多态性

**原型链**最大的目的，就是为了实现继承。

## 4. prototype 和 **proto**

| 对象类型 | prototype | \***\*proto\*\*** |
| -------- | --------- | ----------------- |
| 普通对象 | no        | yes               |
| 函数对象 | yes       | yes               |

1. `prototype` 被实例的 `__proto__` 所指向（被动）
1. `__proto__` 指向构造函数的 `prototype`（主动）

## 5. constructor

## 疑问

### 1.Function 也是 Function 的实例?
