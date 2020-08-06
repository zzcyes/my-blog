# JavaScript之作用域、作用域链

## 作用域

### 词法作用域

### 动态作用域

## 作用域链

### 延长作用域链

- try-catch语句的catch块

- with语句

tips:不建议使用with语句，因为它可能是混淆错误和兼容性问题的根源。

### 没有块级作用域

```javascript
function func(){
    var ballColor = 'pink';
}
console.log(ballColor); // pink
```

### 动态改变作用域

with()/eval()

## links

- [从 JS 编译原理到作用域(链)及闭包](https://juejin.im/post/6844903814231916557)
