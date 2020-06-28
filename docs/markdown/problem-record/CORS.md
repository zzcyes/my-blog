# CORS

如有问题[@钟子晨（zzcyes)](https://www.yuque.com/zzcyes)<br />如无耐心看完，请戳这里[👉 解决方案](#QejC8)
<a name="ZIoaV"></a>

## ✨ 问题场景

fetch 请求失效，未有 response 响应。配置如下:

```javascript
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

fetch(url, request);
```

<br />请求截图如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/553597/1585035866165-f69d0df1-6c46-4424-b1d1-2832b5efd465.png#align=left&display=inline&height=279&margin=%5Bobject%20Object%5D&name=image.png&originHeight=258&originWidth=691&size=21970&status=done&style=none&width=746)<br />

<a name="m5Cg0"></a>

## [🐛](https://github.com/ant-design/ant-design/commit/85fcf0fe6e95aa392b3dde70e7a5593fc1765ba3) 报错信息

浏览器：Chrome<br />版本：80.0.3987.149 (正式版本) （64 位） (cohort: Stable)

```bash
Access to fetch at 'https://192.168.xxx.xxx:9002/ssl/demo/GetCity.mt'
from origin 'http://localhost:8084' has been blocked by CORS policy:
Response to preflight request doesn't pass access control check: No
'Access-Control-Allow-Origin' header is present on the requested
resource. If an opaque response serves your needs, set the request's
mode to 'no-cors' to fetch the resource with CORS disabled.
```

<br />谷歌翻译：<br />访问"https://192.168.xxx.xxx:9002/ssl/demo/GetCity.mt"处的取件来自"http://localhost:8084"已被 CORS 策略阻止：对预检请求的响应未通过访问控制检查：否"访问-控制-允许-原点"标头存在于请求的上资源。如果不透明的响应满足您的需要，请设置请求的模式为"无 cors"以在禁用 CORS 时获取资源。<br />

<a name="zXFyc"></a>

## 📦 问题原因

根据浏览器报错信息，**初步锁定**关键语句

- has been blocked by **CORS** polic
- ** Response to preflight request** doesn't pass access control check

由此可知，当前请求失效与**跨域资源共享策略**及**预检请求响应**有关。

同时，报错信息给出的**解决方案**为：
set the request's mode to '**no-cors**' to fetch the resource with CORS disabled.

通过查 MDN 手册**Request.mode**的含义:

> **Request.mode** 用于确定跨域请求是否导致有效的响应，以及响应的哪些属性是可读的:
> **`no-cors:`**保证其对应的方法只有 HEAD，GET 或 POST 方法 。即使 ServiceWorkers 拦截了这个请求,除了 simple header 之外不会添加或覆盖任意其他 header, 另外 JavaScript 不会读取**Response**的任何属性 . 这样将会确保 ServiceWorkers 不会影响 Web 语义(semantics of the Web), 同时保证了在跨域时不会发生安全和隐私泄露的问题.

按照这个方法给 fetch 的 request 加上 mode

```javascript
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  mode: 'no-cors', // 加上no-cors
};
fetch(url, request);
```

再次请求时，**请求已经成功，并有响应头返回**。<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/553597/1585035952546-dbd218b4-4c5e-48dc-b7b0-e6cb03020544.png#align=left&display=inline&height=421&margin=%5Bobject%20Object%5D&name=image.png&originHeight=383&originWidth=678&size=32328&status=done&style=none&width=746)

但是我们并没有拿到 response 返回的数据。通过 log 发现 fetch 的 Response 中的 type 被标为 opaque——表明我们没有权限访问。这也对应了 MDN 上对**\*{mode:'no-cors\*\***'}\*\*_使用的描述：_"_另外 JavaScript**不会读取**Response 的任何属性_ ."\*<br />
<br />虽然没有解决原本的问题，但是我们获取到了**响应头部携带的信息**。<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/553597/1585030285518-f589e695-4f33-4f02-b2ac-88de9a3f821f.png#align=left&display=inline&height=233&margin=%5Bobject%20Object%5D&name=image.png&originHeight=168&originWidth=538&size=10617&status=done&style=none&width=746)

接下来我们试试从**预检查请求响应**着手。也是查看 MDN 手册对于**Preflight request**的描述:

> 一个 CORS 预检请求是用于检查服务器是否支持 [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS) 即跨域资源共享。它一般是用了以下几个 HTTP 请求首部的 [`OPTIONS`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS) 请求：[`Access-Control-Request-Method`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Method) 和 [`Access-Control-Request-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers)，以及一个 [`Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin) 首部。当有必要的时候，浏览器会自动发出一个预检请求；所以在正常情况下，前端开发者不需要自己去发这样的请求。

浏览器将 CORS 请求分成两类：**简单请求**（simple request）和**非简单请求**（not-so-simple request）。

有些请求**不会触发 CORS**的预检，"简单请求"是**满足以下所有条件的**请求：

- 其允许的方法之一：GET、HEAD、POST
- 其允许被手动设置仅标头是那些抓取规范定义为 CORS 安全列出的请求标头：Accept、Accept-Language、Content-Language、**Content-Type、**DPR、Downlink、Save-Data、Viewport-Width、Width。
- 其中**Content-Type**唯一允许的值为：application/x-www-form-urlencoded、multipart/form-data、text/plain

<a name="QejC8"></a>

## 🔨 解决方案

对于非简单请求，浏览器否定了"预检"请求，会返回一个正常的 HTTP 回应，但是没有任何 CORS 相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求。

观察我们的 fetch 代码，发现 headers 中含触发非简单请求的**Content-Type:application/json。**

服务器不支持预检请求，那么我们只能将触发非简单请求的**Content-Type**去除，将预检请求变为**简单请求**。

去除 content-type，代码如下：

```javascript
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    // 去除触发预检请求contnet-type
    // 'Content-Type': 'application/json'
  },
};

fetch(url, request);
```

<br />重新请求，响应成功！<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/553597/1585036306815-a3560e3a-9d0f-44ff-bb6a-fd50a13cf110.png#align=left&display=inline&height=421&margin=%5Bobject%20Object%5D&name=image.png&originHeight=365&originWidth=647&size=32338&status=done&style=none&width=746)

并且能获取到 reponse 数据
<a name="y695z"></a>

### ![image.png](https://cdn.nlark.com/yuque/0/2020/png/553597/1585036249612-79e44815-00fb-4cf1-afb4-a58c58f7a2f3.png#align=left&display=inline&height=164&margin=%5Bobject%20Object%5D&name=image.png&originHeight=164&originWidth=863&size=18421&status=done&style=none&width=863)

<a name="nvXdg"></a>

## 🔗 相关链接

- [《跨域资源共享 CORS 详解》阮一峰](http://www.ruanyifeng.com/blog/2016/04/cors.html)
- [《No 'Access-Control-Allow-Origin' header is present on the requested resource—when trying to get data from a RESTAPI 》](https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe)
- [《preflight request》](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request)
- [《Request.mode》](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/mode)
- [《fetch 跨域怎么写？》](https://www.zhihu.com/question/47029864)
- [《fetch》](https://fetch.spec.whatwg.org/#http-cors-protocol)
- [《CROS》](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [《CORS 预检请求详谈》](https://www.cnblogs.com/wonyun/p/CORS_preflight.html)
