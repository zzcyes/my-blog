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
            {
                title: 'others',
                sidebarDepth: 2,
                children: ['markdown/others/001.面试规划']
            },
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
