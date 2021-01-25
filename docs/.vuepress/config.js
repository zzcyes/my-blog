module.exports = {
    "title": "zzcyes",
    "base": "/blog/",
    "description": "Learning and recording",
    "head": [
        [
            "link",
            {
                "rel": "icon",
                "href": "/img/logo.ico"
            }
        ]
    ],
    "theme": "antdocs",
    "themeConfig": {
        "mode": "dark",
        "navbar": true,
        "search": true,
        "searchMaxSuggestions": 10,
        "lastUpdated": "Last Updated",
        "backToTop": true,
        "nav": [
            {
                "text": "Home",
                "link": "/"
            },
            {
                "text": "Catalogue",
                "link": "/catalogue"
            },
            {
                "text": "LeetCode",
                "link": "http: //www.zzcyes.com/leetcode"
            },
            {
                "text": "Github",
                "link": "https: //github.com/zzcyes"
            }
        ],
        "sidebar": [
            [
                "/catalogue",
                "Catalogue"
            ],
            {
                "title": "backend",
                "sidebarDepth": 2,
                "children": [
                    "markdown/backend/001.RESTful-API"
                ]
            },
            {
                "title": "compilers-principles",
                "sidebarDepth": 2,
                "children": [
                    "markdown/compilers-principles/001.AST(abstract-syntax-code)"
                ]
            },
            {
                "title": "computer-basis",
                "sidebarDepth": 2,
                "children": [
                    "markdown/computer-basis/001.ASCII",
                    "markdown/computer-basis/002.Huffman-Coding"
                ]
            },
            {
                "title": "css",
                "sidebarDepth": 2,
                "children": [
                    "markdown/css/001.CSS预处理语言之LESS",
                    "markdown/css/002.水平垂直居中"
                ]
            },
            {
                "title": "design-pattern",
                "sidebarDepth": 2,
                "children": []
            },
            {
                "title": "git",
                "sidebarDepth": 2,
                "children": [
                    "markdown/git/001.github访问异常",
                    "markdown/git/002.github上fork的仓库更新",
                    "markdown/git/003.git-commit-style-guide"
                ]
            },
            {
                "title": "html",
                "sidebarDepth": 2,
                "children": [
                    "markdown/html/001.meta标签"
                ]
            },
            {
                "title": "hybrid-app",
                "sidebarDepth": 2,
                "children": [
                    "markdown/hybrid-app/001.compatibility"
                ]
            },
            {
                "title": "interview-preparation",
                "sidebarDepth": 2,
                "children": [
                    "markdown/interview-preparation/001.catalogue"
                ]
            },
            {
                "title": "JavaScript",
                "sidebarDepth": 2,
                "children": [
                    "markdown/JavaScript/001.对象",
                    "markdown/JavaScript/002.对象的创建",
                    "markdown/JavaScript/003.继承",
                    "markdown/JavaScript/004.Array",
                    "markdown/JavaScript/005.原型、原型链",
                    "markdown/JavaScript/006.BOM",
                    "markdown/JavaScript/007.DOM",
                    "markdown/JavaScript/008.Function",
                    "markdown/JavaScript/009.Symbol",
                    "markdown/JavaScript/010.模块化",
                    "markdown/JavaScript/011.函数防抖、节流",
                    "markdown/JavaScript/012.闭包",
                    "markdown/JavaScript/013.new操作符",
                    "markdown/JavaScript/014.作用域、作用域链",
                    "markdown/JavaScript/015.Reflect",
                    "markdown/JavaScript/016.Proxy",
                    "markdown/JavaScript/017.void",
                    "markdown/JavaScript/018.函数柯里化",
                    "markdown/JavaScript/019.bind、apply、call",
                    "markdown/JavaScript/020.cookie、session、token"
                ]
            },
            {
                "title": "network",
                "sidebarDepth": 2,
                "children": [
                    "markdown/network/000.Q&A",
                    "markdown/network/001.HTTP",
                    "markdown/network/002.HTTPS",
                    "markdown/network/003.CDN",
                    "markdown/network/004.QUIC",
                    "markdown/network/005.DNS",
                    "markdown/network/006.网络安全"
                ]
            },
            {
                "title": "node",
                "sidebarDepth": 2,
                "children": [
                    "markdown/node/001.http-api"
                ]
            },
            {
                "title": "others",
                "sidebarDepth": 2,
                "children": [
                    "markdown/others/001.package.json",
                    "markdown/others/002.npm-library",
                    "markdown/others/003.tree-shaking",
                    "markdown/others/004.dead-code-elimination"
                ]
            },
            {
                "title": "problem-record",
                "sidebarDepth": 2,
                "children": [
                    "markdown/problem-record/001.CORS",
                    "markdown/problem-record/002.HTTP与HTTPS混用",
                    "markdown/problem-record/003.input无法连续上传同一文件",
                    "markdown/problem-record/004.TypeScript",
                    "markdown/problem-record/005.TypeError",
                    "markdown/problem-record/006.mand-ui-scroll-view滚动异常",
                    "markdown/problem-record/007.Chrome-Developer-Tools-Connection-ID"
                ]
            },
            {
                "title": "reading-notes",
                "sidebarDepth": 2,
                "children": [
                    "markdown/reading-notes/001.airbnb-javascript-style-guide"
                ]
            },
            {
                "title": "source-code",
                "sidebarDepth": 2,
                "children": [
                    "markdown/source-code/001.vue2.x-Vue",
                    "markdown/source-code/002.vue2.x-Vue-Router",
                    "markdown/source-code/003.vue2.x-Vuex",
                    "markdown/source-code/004.Virtual-DOM"
                ]
            },
            {
                "title": "tool-side",
                "sidebarDepth": 2,
                "children": [
                    "markdown/tool-side/001.nginx的安装与使用",
                    "markdown/tool-side/002.yeoman脚手架搭建",
                    "markdown/tool-side/003.vscode(code-snippets)",
                    "markdown/tool-side/004.rollup"
                ]
            },
            {
                "title": "TypeScript",
                "sidebarDepth": 2,
                "children": [
                    "markdown/TypeScript/001.TypeScript入门之安装与配置"
                ]
            },
            {
                "title": "Vue",
                "sidebarDepth": 2,
                "children": [
                    "markdown/Vue/001.store中“getter”和“mutation”的生成",
                    "markdown/Vue/002.Vue3.0+TypeScript脚手架搭建项目",
                    "markdown/Vue/003.Vue3.0+vue-cli-plugin-vue-next填坑记",
                    "markdown/Vue/004.Vue-next速览",
                    "markdown/Vue/005.vue2.x-migrates-to-vue3.0"
                ]
            }
        ]
    }
}
