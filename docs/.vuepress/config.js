module.exports = {
    title: 'zzcyes',
    base: '/blog/',
    description: 'Learning and recording',
    head: [['link', { rel: 'icon', href: '/img/logo.ico' }]],
    theme: 'antdocs',
    themeConfig: {
        mode: 'dark',
        navbar: true,
        search: true,
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated',
        backToTop: true,
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Catalogue', link: '/catalogue' },
            { text: 'LeetCode', link: 'http://www.zzcyes.com/leetcode' },
            { text: 'Github', link: 'https://github.com/zzcyes' },
        ],
        sidebar: [
            ['/catalogue', 'Catalogue'],
            {
                title: 'css',
                sidebarDepth: 2,
                children: ['markdown/css/001.CSS预处理语言之LESS']
            },
            {
                title: 'git',
                sidebarDepth: 2,
                children:
                    ['markdown/git/001.github访问异常',
                        'markdown/git/002.github上fork的仓库更新']
            },
            {
                title: 'hybrid-app',
                sidebarDepth: 2,
                children: ['markdown/hybrid-app/001.compatibility']
            },
            {
                title: 'interview-preparation',
                sidebarDepth: 2,
                children: [
                    'markdown/interview-preparation/000.catalogue',
                    'markdown/interview-preparation/001.Vue-Router',
                    'markdown/interview-preparation/002.函数防抖、节流',
                    'markdown/interview-preparation/003.meta标签',
                    'markdown/interview-preparation/004.垂直居中',
                    'markdown/interview-preparation/005.闭包',
                    'markdown/interview-preparation/006.作用域、作用域链',
                    'markdown/interview-preparation/007.bind、apply、call',
                    'markdown/interview-preparation/008.函数柯里化',
                    'markdown/interview-preparation/009.Proxy',
                    'markdown/interview-preparation/010.Reflect',
                    'markdown/interview-preparation/011.HTTP、HTTPS',
                    'markdown/interview-preparation/012.Virtual-DOM',
                    'markdown/interview-preparation/013.new操作符',
                    'markdown/interview-preparation/014.CDN',
                    'markdown/interview-preparation/015.模块化',
                    'markdown/interview-preparation/016.package.json',
                    'markdown/interview-preparation/017.void',
                    'markdown/interview-preparation/018.npm-library',
                    'markdown/interview-preparation/019.tree-shaking',
                    'markdown/interview-preparation/020.rollup',
                    'markdown/interview-preparation/021.abstract-syntax-code',
                    'markdown/interview-preparation/022.dead-code-elimination']
            },
            {
                title: 'JavaScript',
                sidebarDepth: 2,
                children:
                    ['markdown/JavaScript/001.JavaScript之对象',
                        'markdown/JavaScript/002.JavaScript之对象的创建',
                        'markdown/JavaScript/003.JavaScript之继承',
                        'markdown/JavaScript/004.JavaScript之数组',
                        'markdown/JavaScript/005.JavaScript之原型原型链prototype',
                        'markdown/JavaScript/006.JavaScript之BOM',
                        'markdown/JavaScript/007.JavaScript之DOM',
                        'markdown/JavaScript/008.JavaScript之function',
                        'markdown/JavaScript/009.JavaScript之Symbol',
                        'markdown/JavaScript/010.JavaScript之模块']
            },
            { title: 'others', sidebarDepth: 2, children: [] },
            {
                title: 'problem-record',
                sidebarDepth: 2,
                children:
                    ['markdown/problem-record/001.CORS',
                        'markdown/problem-record/002.HTTP与HTTPS混用',
                        'markdown/problem-record/003.input无法连续上传同一文件',
                        'markdown/problem-record/004.TypeScript']
            },
            {
                title: 'reading-notes',
                sidebarDepth: 2,
                children:
                    ['markdown/reading-notes/001.airbnb-javascript-style-guide',
                        'markdown/reading-notes/002.css-world']
            },
            {
                title: 'tool-side',
                sidebarDepth: 2,
                children:
                    ['markdown/tool-side/001.nginx的安装与使用',
                        'markdown/tool-side/002.yeoman脚手架搭建']
            },
            {
                title: 'TypeScript',
                sidebarDepth: 2,
                children: ['markdown/TypeScript/001.TypeScript入门之安装与配置']
            },
            {
                title: 'Vue',
                sidebarDepth: 2,
                children:
                    ['markdown/Vue/001.store中“getter”和“mutation”的生成',
                        'markdown/Vue/002.Vue3.0+TypeScript脚手架搭建项目',
                        'markdown/Vue/003.Vue3.0+vue-cli-plugin-vue-next填坑记']
            }
        ],
    },
};
