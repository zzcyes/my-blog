# meta标签

## 概念

- http-equiv

- name

- scheme

- content

## 应用

### X-UA-Compatible

`X-UA-Compatible`是IE8的一个专有`<meta>`属性，它告诉IE8采用何种IE版本去渲染网页，在html的`<head>`标签中使用。可以在微软官方文档获取更多介绍。

- IE=EmulateIE7

开发者无需考虑网页是否兼容IE8浏览器，只要确保网页在IE6、IE7下的表现就可以了。

```html
<meta name="apple-mobile-web-app-capable" content="IE=EmulateIE7">
```
- IE=edge

告诉 IE 以最高级模式渲染文档，也就是任何 IE 版本都以当前版本所支持的最高级标准模式渲染，避免版本升级造成的影响。

```html
<meta name="apple-mobile-web-app-capable" content="IE=edge">
```

- chrome=1

强制 IE 使用 Chrome Frame 渲染

```html
<meta http-equiv="X-UA-Compatible" content="chrome=1">
```

- IE=edge,chrome=1

最佳的兼容模式方案

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
```

ps：为防止失效，X-UA-Compatible最好紧跟在head之后，之前不要有任何不标准的标签。

### apple-mobile-web-app-capable

是否启用 WebApp 全屏模式

```html
<meta name="apple-mobile-web-app-capable" content="yes">
```

### apple-mobile-web-app-status-bar-style

设置状态栏的背景颜色,只有在 `<meta name="apple-mobile-web-app-capable" content="yes">` 时生效

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

### SEO

## links

- [< meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" />的意义](https://www.cnblogs.com/chendc/p/5423337.html)

- [使用X-UA-Compatible来设置IE浏览器兼容模式    ](https://www.cnblogs.com/nidilzhang/archive/2010/01/09/1642887.html)
