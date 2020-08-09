# JavaScript 之作用域、作用域链

## 作用域

### 编译原理

1.分词/词法分析（Tokenizing/Lexing）

这个过程会将由字符组成的字符串分解成（对编程语言来说）有意义的代码块，这些代码块被称为词法单元（token）。例如，考虑程序 var a = 2;。这段程序通常会被分解成为下面这些词法单元：var、a、=、2 、;。空格是否会被当作词法单元，取决于空格在这门语言中是否具有意义。

2.解析/语法分析（Parsing）

这个过程是将词法单元流（数组）转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树。这个树被称为“抽象语法树”（Abstract Syntax Tree, AST）。var a = 2；的抽象语法树中可能会有一个叫作 VariableDeclaration 的顶级节点，接下来是一个叫作 Identifier（它的值是 a）的子节点，以及一个叫作 AssignmentExpression 的子节点。AssignmentExpression 节点有一个叫作 NumericLiteral（它的值是 2）的子节点。

3.代码生成

将 AST 转换为可执行代码的过程被称为代码生成。这个过程与语言、目标平台等息息相关。抛开具体细节，简单来说就是有某种方法可以将 var a =2；的 AST 转化为一组机器指令，用来创建一个叫作 a 的变量（包括分配内存等），并将一个值储存在 a 中。

> 比起那些编译过程只有三个步骤的语言的编译器，JavaScript 引擎要复杂得多。例如，在语法分析和代码生成阶段有特定的步骤来对运行性能进行优化，包括对冗余元素进行优化等。

### 词法作用域

### 动态作用域

## 作用域链

### 延长作用域链

- try-catch 语句的 catch 块

- with 语句

tips:不建议使用 with 语句，因为它可能是混淆错误和兼容性问题的根源。

### 没有块级作用域

```javascript
function func() {
  var ballColor = 'pink';
}
console.log(ballColor); // pink
```

### 动态改变作用域

with()/eval()

## 总结

## links

- [从 JS 编译原理到作用域(链)及闭包](https://juejin.im/post/6844903814231916557)
