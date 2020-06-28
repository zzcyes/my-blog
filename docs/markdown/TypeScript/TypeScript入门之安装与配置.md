# TypeScript 入门(一)：安装与配置

## 安装

TypeScript 的命令行工具安装方法如下：

```shell
npm install -g typescript
```

以上命令会在全局环境下安装 tsc 命令，安装完成之后，我们就可以在任何地方执行 tsc 命令了。

编译一个 TypeScript 文件很简单：

**hello.ts**

```typescript
const sayHello = (name: String): String => {
  return 'hello' + name;
};

function sayHi(name: String): String {
  return 'Hi' + name;
}
```

编译命令

```shell
tsc hello.ts
```

**hello.js**

```javascript
var sayHello = function (name) {
  return 'hello' + name;
};

function sayHi(name) {
  return 'Hi' + name;
}
```
