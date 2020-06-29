# HTTPS/HTTP 混用

<a name="qqLbj"></a>

如有问题[@钟子晨（zzcyes)](https://www.yuque.com/zzcyes)<br />如无耐心看完，请戳这里[👉 解决方案](#hVnf5)
<a name="8Kh8m"></a>

## ✨ 问题场景

使用**HTTPS**协议在浏览器中加载页面，再通过**HTTP**加载其他资源(在**HTTPS**协议地址的页面里，请求了**HTTP**协议的接口)
页面地址：[_https://192.168.0.5:9002/dist/dutyIndicator.html#/home_](https://218.205.252.5:9002/ssl/ZK/dist/dutyIndicator.html#/home)
接口地址：[_http://192.168.0.5:9001/getGiscommonConfig.ashx_](http://218.205.252.5:9001/snlt/mtnx/vs/getGiscommonConfig.ashx)<br />

<a name="irkoo"></a>

## [🐛](https://github.com/ant-design/ant-design/commit/85fcf0fe6e95aa392b3dde70e7a5593fc1765ba3) 报错信息

浏览器：Chrome<br />版本：80.0.3987.149 (正式版本) （64 位） (cohort: Stable)

```bash
Mixed Content: The page at 'https://192.168.0.5:9002/dist/dutyIndicator.html#/home' was loaded over HTTPS, but requested an insecure resource 'http://192.168.0.5:9001/snlt/mtnx/login/check/?name=MYWARtaW4%3DD&password=MMTAIzNDU
2D'. This request has been blocked; the content must be served over HTTPS.
```

<a name="SZ0Ow"></a>

## 📦 问题原因

如果您使用 HTTPS 在浏览器中加载页面，浏览器将拒绝通过 HTTP 加载任何资源。正如您尝试过的，**将 API URL 更改为使用 HTTPS 而不是 HTTP 通常可以解决此问题**。但是，您的 API 必须不允许 HTTPS 连接。因此，您必须在主页上强制使用 HTTP 或请求它们允许 HTTPS 连接。

请注意以下事项：如果您转到 API URL 而不是尝试使用 AJAX 加载请求，则该请求仍然有效。这是因为浏览器未从安全页面内加载资源，而是正在加载不安全页面并接受该页面。为了使它可以通过 AJAX 使用，协议应该匹配。<br />

<a name="hVnf5"></a>

## 🔨 解决方案

当前解决方案是把 HTTP 协议升级为 HTTPS。
<a name="F5EUP"></a>

## 🔗 相关链接

[stack overflow](https://stackoverflow.com/questions/33507566/mixed-content-blocked-when-running-an-http-ajax-operation-in-an-https-page)
