module.exports = {
    title: 'zzcyes',
    base: "/vue-press-blog/",
    description: "zzcyes'sblog",
    head: [['link', { rel: 'icon', href: '/img/logo.ico' }]],
    themeConfig: {
        navbar: true,
        search: true,
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated',
        displayAllHeaders: true,
        nav: [
            { text: 'Home', link: '/' },
            { text: 'catalogue', link: '/catalogue' },
            {
                text: 'Blog',
                items: [
                    {
                        text: 'git',
                        link: '/markdown/git/Github访问异常'
                    }, {
                        text: 'hybrid-app',
                        link: '/markdown/hybrid-app/compatibility'
                    },
                    {
                        text: 'JavaScript',
                        link: '/markdown/JavaScript/JavaScipt之Symbol'
                    },
                    {
                        text: 'problem-record',
                        link: '/markdown/problem-record/CORS'
                    },
                    {
                        text: 'reading-notes',
                        link: '/markdown/reading-notes/airbnb-javascript-style-guide'
                    },
                    { text: 'tool-side', link: '/markdown/tool-side/nginx的安装与使用' },
                    {
                        text: 'TypeScript',
                        link: '/markdown/TypeScript/TypeScript入门之安装与配置'
                    },
                    {
                        text: 'Vue',
                        link: '/markdown/Vue/store中“getter”和“mutation”的生成'
                    },
                    { text: 'webpack', link: '/markdown/webpack/webpack入门之安装与配置' }]
            },
            {
                text: 'github', link: 'https://github.com/zzcyes'
            }
        ],
        sidebar: {
            '/markdown/git/': [
                {
                    title: 'git',
                    collapsable: false,
                    children: [
                        'github上fork的仓库更新.md',
                        'Github访问异常.md'
                    ]
                }
            ],
            '/markdown/hybrid-app/': [
                {
                    title: 'hybrid-app',
                    collapsable: false,
                    children: [
                        'compatibility.md'
                    ]
                }
            ],
            '/markdown/JavaScript/': [
                {
                    title: 'JavaScript',
                    collapsable: false,
                    children: [
                        'JavaScipt之Symbol.md',
                        'JavaScript之BOM.md',
                        'JavaScript之DOM.md',
                        'JavaScript之function.md',
                        'JavaScript之原型原型链prototype.md',
                        'JavaScript之对象.md',
                        'JavaScript之对象的创建.md',
                        'JavaScript之数组.md',
                        'JavaScript之继承.md'
                    ]
                }
            ],
            '/markdown/problem-record/': [
                {
                    title: 'problem-record',
                    collapsable: false,
                    children: [
                        'CORS.md',
                        'HTTP&HTTPS混用.md',
                        'input无法连续上传同一文件.md',
                        'TypeScript.md'
                    ]
                }
            ],
            '/markdown/reading-notes/': [
                {
                    title: 'reading-notes',
                    collapsable: false,
                    children: [
                        'airbnb-javascript-style-guide.md',
                        'css-world.md'
                    ]
                }
            ],
            '/markdown/tool-side/': [
                {
                    title: 'tool-side',
                    collapsable: false,
                    children: [
                        'nginx的安装与使用.md'
                    ]
                }
            ],
            '/markdown/TypeScript/': [
                {
                    title: 'TypeScript',
                    collapsable: false,
                    children: [
                        'TypeScript入门之安装与配置.md'
                    ]
                }
            ],
            '/markdown/Vue/': [
                {
                    title: 'Vue',
                    collapsable: false,
                    children: [
                        'store中“getter”和“mutation”的生成.md',
                        'Vue3.0+TypeScript脚手架搭建项目.md',
                        'Vue3.0+vue-cli-plugin-vue-next填坑记.md'
                    ]
                }
            ],
            '/markdown/webpack/': [
                {
                    title: 'webpack',
                    collapsable: false,
                    children: [
                        'webpack入门之安装与配置.md'
                    ]
                }
            ]
        }
    },
};
