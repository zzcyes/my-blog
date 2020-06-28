# JavaScript 之 DOM

**DOM（文档对象模型）** 是针对 HTML 和 XML 文档的一个 API（应用程序编程接口）。DOM 描绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的某一部分。DOM 脱胎于 Netscape 及微软公司创始的 DHTML（动态 HTML），但现在它已经成为表现和操作页面标记的真正的跨平台、语言中立的方式。
Tips:注意，IE 中的所有 DOM 对象都是以 COM 对象的形式实现的。这意味着 IE 中的 DOM 对象与原生 JavaScript 对象的行为或活动特点并不一致。本章将较多地谈及这些差异

# 节点层次

## Node 类型

DOM1 级定义了一个**Node 接口**，该接口将由 DOM 中的所有节点类型实现。这个 Node 接口在 JavaScript 中是作为 Node 类型实现的；除了 IE 之外，在其他所有浏览器中都可以访问到这个类型。JavaScript 中的所有节点类型都继承自 Node 类型，因此所有节点类型都共享着相同的基本属性和方法。

每个节点都有一个 nodeType 属性，用于表明节点的类型。节点类型由在 Node 类型中定义的下列 12 个数值常量来表示：

```javascript
Node.ELEMENT_NODE(1);
Node.ATTRIBUTE_NODE(2);
Node.TEXT_NODE(3);
Node.CDATA_SECTION_NODE(4);
Node.ENTITY_REFERENCE_NODE(5);
Node.ENTITY_NODE(6);
Node.PROCESSING_INSTRUCTION_NODE(7);
Node.COMMENT_NODE(8);
Node.DOCUMENT_NODE(9);
Node.DOCUMENT_TYPE_NODE(10);
Node.DOCUMENT_FRAGMENT_NODE(11);
Node.NOTATION_NODE(12);
```

### 1. nodeName 和 nodeValue 属性

```javascript
const f = document.firstChild; // <!doctype html>
f.nodeName; // 'html'
f.nodeValue; // null
```

在这个例子中，首先检查节点类型，看它是不是一个元素。如果是，则取得并保存 nodeName 的值。

```javascript
const nodeList = document.querySelectorAll('div');
nodeList.item(1); // <div></div>
nodeList.item(1).nodeType; // 1
// Node.ELEMENT_NODE(1)
if (someNode.nodeType === Node.ELEMENT_NODE) {
  value = someNode.nodeName; //nodeName的值是元素的标签名
}
```

对于元素节点，nodeName 中保存的始终都是元素的标签名，而 nodeValue 的值则始终为 null

### 2. 节点关系

节点间的各种关系可以用传统的**家族关系**来描述，相当于把文档树比喻成家谱。在 HTML 中，可以将`<body>`元素看成是`<html>`元素的子元素；相应地，也就可以将`<html>`元素看成是`<body>`元素的父元素。而`<head>`元素，则可以看成是`<body>`元素的同胞元素，因为它们都是同一个父元素`<html>`的直接子元素。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>js之dom</title>
  </head>
  <body>
    <div class="parent-div">
      parent-div
      <div class="child-div">
        child-div
      </div>
      <ul class="child-ul" onclick="console.log('child-ul')">
        child-ul
        <li>li</li>
        <li>li</li>
      </ul>
    </div>
  </body>
</html>
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/553597/1586336929761-241e65c5-126c-4d7d-8eae-2e38b36d2571.png#align=left&display=inline&height=255&name=image.png&originHeight=255&originWidth=504&size=41394&status=done&style=none&width=504)

#### 2.1 childNodes

每个节点都有一个**childNodes 属性**，其中保存着一个**NodeList 对象**。NodeList 是一种**类数组对象**，用于保存一组有序的节点，可以通过位置来访问这些节点。NodeList 对象的独特之处在于，它实际上是基于 DOM 结构**动态执行**查询的结果，因此 DOM 结构的变化能够自动反映在 NodeList 对象中。

```javascript
const nodeList = document.querySelectorAll('div');
nodeList; // NodeList(2) [div.parent-div, div.child-div]

nodeList.item(0); // div.parent-div
nodeList.item[1]; // div.child-div
nodeList.length; // 2

nodeList.item(0).childNodes; // NodeList(5) [text, div.child-div, text, ul.child-ul, text]
```

将 NodeList 转为数组对象

```javascript
const nodeList = document.querySelectorAll('div');
nodeList; // NodeList(2) [div.parent-div, div.child-div]

[].slice.apply(nodeList); // [div.parent-div, div.child-div]
Array.pototype.slice.apply(nodeList); // [div.parent-div, div.child-div]
```

#### 2.2 parentNode

每个节点都有一个**parentNode**属性，该属性指向**文档树中的父节点**。包含在 childNodes 列表中的所有节点都具有相同的父节点，因此它们的 parentNode 属性都指向同一个节点。此外，包含在 childNodes 列表中的每个节点相互之间都是同胞节点。

```javascript
const nodeList = document.querySelectorAll('div');
nodeList; // NodeList(2) [div.parent-div, div.child-div]

const childNodes = nodeList.item(0).childNodes;
childNodes; // NodeList(5) [text, div.child-div, text, ul.child-ul, text]
childNodes.item(0).parentNode; // <div class="parent-div">...</div>
```

#### 2.3 previousSibling

通过使用列表中每个节点的**previousSibling**，可以访问同一列表中的其他节点。列表中第一个节点的 previousSibling 属性值为 null。

```javascript
const nodeList = document.querySelectorAll('div');
const childNodeList = nodeList.item(0).childNodes;

nodeList; // NodeList(2) [div.parent-div, div.child-div]
childNodeList; // NodeList(5) [text, div.child-div, text, ul.child-ul, text]

childNodeList.item(0).previousSibling; // null
childNodeList.item(1).previousSibling; // 'parent-div'
childNodeList.item(2).previousSibling; // div.child-div
childNodeList.item(3).previousSibling; // #text
childNodeList.item(4).previousSibling; // ul.child-ul
```

#### 2.4 nextSibling

通过使用列表中每个节点**nextSibling**属性，可以访问同一列表中的其他节点。列表中最后一个节点的 nextSibling 属性的值为 null。

```javascript
const nodeList = document.querySelectorAll('div');
const childNodeList = nodeList.item(0).childNodes;

nodeList; // NodeList(2) [div.parent-div, div.child-div]
childNodeList; // NodeList(5) [text, div.child-div, text, ul.child-ul, text]

childNodeList.item(0).nextSibling; // div.child-div
childNodeList.item(1).nextSibling; // #text
childNodeList.item(2).nextSibling; // ul.child-ul
childNodeList.item(3).nextSibling; // #text
childNodeList.item(4).nextSibling; // null
```

#### 2.5 **firstChild**

父节点与其第一个存在特殊关系。父节点的**firstChild**属性指向其**childNodes**列表中的**第一个**。parentNodeList.firstChild 的值始终等于 parentNodeList.childNodes[0]

```javascript
const nodeList = document.querySelectorAll('div');
const parentNodeList = nodeList.item(1).parentNode;
const childNodes = parentNodeList.childNodes;

nodeList; // NodeList(2) [div.parent-div, div.child-div]
parentNodeList; // <div class="parent-div">...</div>
childNodes; // NodeList(5) [text, div.child-div, text, ul.child-ul, text]

parentNodeList.firstChild; // 'parent-div'
childNodes.item(0); // 'parent-div'
```

#### 2.6 **lastChild**

父节点与其最后一个子节点存在特殊关系。父节点的**lastChild**属性指向其**childNodes**列表中的**最后一个节点**。
其中，parentNodeList.lastChild 的值始终等于 parentNodeList.childNodes [parentNodeList.childNodes.length-1]。

```javascript
const nodeList = document.querySelectorAll('div');
const parentNodeList = nodeList.item(1).parentNode;
const childNodes = parentNodeList.childNodes;

nodeList; // NodeList(2) [div.parent-div, div.child-div]
parentNodeList; // <div class="parent-div">...</div>
childNodes; // NodeList(5) [text, div.child-div, text, ul.child-ul, text]

parentNodeList.lastChild; // #text
childNodes.item(4); // #text
```

#### 2.7 **hasChildNodes**

**hasChildNodes()**也是一个非常有用的方法，这个方法在节点包含一或多个子节点的情况下返回 true；应该说，这是比查询 childNodes 列表的 length 属性更简单的方法。

```javascript
const nodeList = document.querySelectorAll('div');
const parentNodeList = nodeList.item(1).parentNode;
const child = parentNodeList.lastChild;

parentNodeList.hasChildNodes(child); // true
```

#### 2.8 **ownerDocument**

所有节点都有的最后一个属性是**ownerDocument**，该属性指向表示**整个文档的文档节点**。这种关系表示的是任何节点都属于它所在的文档，任何节点都不能同时存在于两个或更多个文档中。通过这个属性，我们可以不必在节点层次中通过层层回溯到达顶端，而是可以直接访问文档节点。

```javascript
const nodeList = document.querySelectorAll('div');
const parentNodeList = nodeList.item(1).parentNode;
parentNodeList.ownerDocument; // #document
```

### 3. 操作节点

#### 3.1 appendChild

#### 3.2 insertBefore

#### 3.3 replaceChild

#### 3.4 removeChild

#### 3.5 cloneNode

| DOM 版本 | Core Level 1 Node Object |
| -------- | ------------------------ |


用于创建调用这个方法的节点的**一个完全相同**的副本。cloneNode()方法接受一个**布尔值参数**，表示是否执行深复制。在参数为**true**的情况下，执行**深复制**，也就是复制节点及其整个子节点树；在参数为**false**的情况
下，执行**浅复制**，即只复制节点本身。复制后返回的节点副本**属于文档所有**，但并没有为它指定父节点。因此，这个节点副本就成为了一个"孤儿"。

```javascript
const ui = document.getElementsByTagName('ul').item(0);
ui;
```

```html
<ul class="child-ul" onclick="console.log('child-ul')">
  child-ul
  <li>li</li>
  <li>li</li>
</ul>
```

```javascript
ui.cloneNode(false); // <ul class="child-ul"></ul>
ui.cloneNode(true); // <ul class="child-ul" onclick="console.log('child-ul')">child-ui<li></li>li<li>li</li></ul>
```

克隆一个元素节点会拷贝它所有的属性以及属性值,当然也就包括了属性上绑定的事件(比如`onclick="alert(1)"`),但不会拷贝那些使用[`addEventListener()`](https://developer.mozilla.org/zh-CN/docs/DOM/element.addEventListener)方法或者`node.onclick = fn`这种用 JavaScript 动态绑定的事件。

#### 3.6 normalize

## Document 类型

JavaScript 通过 Document 类型表示文档。在浏览器中，document 对象是 HTMLDocument（继承自 Document 类型）的一个实例，表示整个 HTML 页面。而且，document 对象是 window 对象的一个属性，因此可以将其作为全局对象来访问。
Document 节点具有下列特征：

- **nodeType**的值为 9
- **nodeName**的值为"#document"
- **nodeValue**的值为 null
- **parentNode**的值为 null
- **ownerDocument**的值为 null

其子节点可能是一个 DocumentType（最多一个）、Element（最多一个）、ProcessingInstruction 或 Comment。Document 类型可以表示 HTML 页面或者其他基于 XML 的文档。不过，最常见的应用还是作为 HTMLDocument 实例的 document 对象。通过这个文档对象，不仅可以取得与页面有关的信息，而且还能操作页面的外观及其底层结构。

### 1.文档的子节点

虽然 DOM 标准规定 Document 节点的子节点可以是**DocumentType、Element、ProcessingInstruction 或 Comment**，但还有两个内置的访问其子节点的快捷方式

#### 1.1 documentElement

该属性始终指向 HTML 页面中的`<html>`元素

```javascript
document.documentElement; // <html><body>.....</body></html>
```

#### 1.2 doctype

```javascript
const doctype = document.doctype; //取得对<!DOCTYPE>的引用
```

### 2.文档信息

#### 2.1 title

```javascript
document.title; // js之dom
```

####

#### 2.2 URL

包含页面完整的 URL（地址栏中显示的 URL）

```javascript
document.URL; // "http://zzcyes.com/"
```

#### 2.3 domain

包含页面的域名。是可以设置的。但由于安全方面的限制，也并非可以给 domain 设置任何值。如果 URL 中包含一个子域名，例如 p2p.wrox.com，那么就只能将 domain 设置为"wrox.com"（URL 中包含"www"，如 www.wrox.com 时，也是如此）。不能将这个属性设置为 URL 中不包含的域

```javascript
document.domain; // "zzcyes.com"

document.domain = 'zzcyes.cn';
// Uncaught DOMException: Failed to set the 'domain' property on 'Document'
// : 'zzcyes.cn' is not a suffix of 'zzcyes.com'.
```

####

当页面中包含来自其他子域的框架或内嵌框架时，能够设置 document.domain 就非常方便了。由于跨域安全限制，来自不同子域的页面无法通过 JavaScript 通信。而通过将每个页面的 document.domain 设置为相同的值，这些页面就可以互相访问对方包含的 JavaScript 对象了。例如，假设有一个页面加载自 www.wrox.com，
其中包含一个内嵌框架，框架内的页面加载自 p2p.wrox.com。由于 document.domain 字符串不一样，内外两个页面之间无法相互访问对方的 JavaScript 对象。但如果将这两个页面的 document.domain 值都设
置为"wrox.com"，它们之间就可以通信了。

浏览器对 domain 属性还有一个限制，即如果域名一开始是"松散的"（loose），那么不能将它再设置为"紧绷的"（tight）。否则将会导致错误。

```javascript
// 假设页面来自于www.zzcyes.com域
document.domain = 'zzcyes.com'; // 松散（成功）
document.domain = 'www.zzcyes.com'; // 紧绷（出错）
```

#### 2.4 referrer

保存着连接到当前页面的那个页面的 URL，在没有来源页面的情况下，referrer 属性中可能会包含空字符串。所有这些信息都存在于**请求的 HTTP 头部**，只不过是通过这些属性让我们能够在 JavaScrip 中访问它们而已。

```javascript
document.referrer; // ""
```

### 3. 查找元素

#### 3.1 getElementById

#### 3.2 getElementsByTagName

这个方法接受一个参数，即要取得元素的标签名，而返回的是包含零或多个元素的 NodeList。在 HTML 文档中，这个方法会返回一个**HTMLCollection 对象**，作为一个“动态”集合，该对象与 NodeList 非常类似。

传入**"\*"**表示全部

```javascript
const allElements = document.getElementsByTagName('*');
```

虽然标准规定标签名需要区分大小写，但为了最大限度地与既有 HTML 页面兼容，传给 getElementsByTagName()的标签名是不需要区分大小写的。但对于 XML 页面而言（包括 XHTML），getElementsByTagName()方法就会区分大小写。

#### 3.3 getElementsByName

```html
<fieldset>
  <legend>Which color do you prefer?</legend>
  <ul>
    <li>
      <input type="radio" value="red" name="color" id="colorRed" />
      <label for="colorRed">Red</label>
    </li>
    <li>
      <input type="radio" value="green" name="color" id="colorGreen" />
      <label for="colorGreen">Green</label>
    </li>
    <li>
      <input type="radio" value="blue" name="color" id="colorBlue" />
      <label for="colorBlue">Blue</label>
    </li>
  </ul>
</fieldset>
```

```javascript
var radios = document.getElementsByName('color');
```

返回一个 HTMLCollectioin。但是，对于这里的单选按钮来说，namedItem()方法则只会取得第一项（因为每一项的 name 特性都相同）。

### 4.特殊集合

除了属性和方法，document 对象还有一些特殊的集合。这些集合都是 HTMLCollection 对象，为访问文档常用的部分提供了快捷方式

#### 4.1 anchors

包含文档中所有带 name 特性的`<a>`元素

#### 4.2 applets

包含文档中所有的`<applet>`元素，因为不再推荐使用`<applet>`元素，所以这个集合已经**不建议使用了**

#### 4.3 forms

包含文档中所有的`<form>`元素，与 document.getElementsByTagName("form")得到的结果相同

#### 4.4 images

包含文档中所有的`<img>`元素，与 document.getElementsByTagName("img")得到的结果相同

#### 4.5 links

包含文档中所有带 href 特性的`<a>`元素

### 5.DOM 一致性检测

由于 DOM 分为多个级别，也包含多个部分，因此检测浏览器实现了 DOM 的哪些部分就十分必要了。**document.implementation**属性就是为此提供相应信息和功能的对象，与浏览器对 DOM 的实现直接对应。
DOM1 级只为 document.implementation 规定了一个方法，即**hasFeature()**。这个方法接受两个参数：要检测的 DOM 功能的名称及版本号。如果浏览器支持给定名称和版本的功能，则该方法返回 true。

```javascript
var hasXmlDom = document.implementation.hasFeature('XML', '1.0');
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/553597/1586578411329-51fc9938-1618-44f5-a42e-7501f3d3239b.png#align=left&display=inline&height=195&name=image.png&originHeight=195&originWidth=628&size=34880&status=done&style=none&width=628)
![image.png](https://cdn.nlark.com/yuque/0/2020/png/553597/1586578432518-72f5202a-671f-41aa-a3ea-62a92e243048.png#align=left&display=inline&height=311&name=image.png&originHeight=311&originWidth=626&size=59255&status=done&style=none&width=626)

尽管使用 hasFeature()确实方便，但也有缺点。因为实现者可以自行决定是否与 DOM 规范的不同部分保持一致。事实上，要想让 hasFearture()方法针对所有值都返回 true 很容易，但**返回 true 有时候也不意味着实现与规范一致**。例如，Safari 2.x 及更早版本会在没有完全实现某些 DOM 功能的情况下也返回 true。为此，我们建议多数情况下，在使用 DOM 的某些特殊的功能之前，最好除了检测 hasFeature()之外，还同时使用**能力检测**。

### 6.文档写入

#### 6.1 write 和 writeln

write 和 writeln 接受一个字符串参数，即要写入到输出流中的文本。前者原样写入，后者在字符串的末尾添加一个换行符（\n）。

动态地包含外部资源(字符串"<\/script>"不会被当作外部`<script>`标签的关闭标签)

```html
<script type="text/javascript">
  document.write(
    '<script type="text/javascript" src="file.js">' + '<\/script>'
  );
</script>
```

#### 6.2 open 和 close

方法 open()和 close()分别用于打开和关闭网页的输出流。如果是在页面加载期间使用 write()或 writeln()方法，则不需要用到这两个方法。

```javascript
// 打开一个文档，以便写入数据
document.open();

// 写入文档内容
document.write('<p>文档内容~</p>');

// 关闭文档
document.close();
```

严格型 XHTML 文档不支持文档写入。对于那些按照 application/xml+xhtml 内容类型提供的页面，这两个方法也同样无效。

## Element 类型

## Text 类型

## Comment 类型

## CDATASection 类型

## DocumentType 类型

## DocumentFragment 类型

## Attr 类型
