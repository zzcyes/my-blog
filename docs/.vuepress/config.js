module.exports = {
  title: 'zzcyes',
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
      { text: 'Blog', link: '/markdown/git/Github访问异常' },
    ],
    sidebar: {
      '/markdown/': [
        {
          title: 'git',
          collapsable: false,
          children: ['git/github上fork的仓库更新', 'git/Github访问异常'],
        },
        {
          title: 'hybrid-app',
          collapsable: false,
          children: ['hybrid-app/compatibility'],
        },
        {
          title: 'JavaScript',
          collapsable: false,
          children: [
            'JavaScript/JavaScipt之Symbol',
            'JavaScript/JavaScript之BOM',
            'JavaScript/JavaScript之DOM',
            'JavaScript/JavaScript之function',
            'JavaScript/JavaScript之原型和原型链及prototype',
            'JavaScript/JavaScript之对象',
            'JavaScript/JavaScript之对象的创建',
            'JavaScript/JavaScript之数组',
            'JavaScript/JavaScript之继承',
          ],
        },
        {
          title: 'problem-record',
          collapsable: false,
          children: [
            'problem-record/CORS',
            'problem-record/HTTP&HTTPS混用',
            'problem-record/input无法连续上传同一文件',
            'problem-record/TypeScript',
          ],
        },
        {
          title: 'reading-notes',
          collapsable: false,
          children: [
            'reading-notes/airbnb-javascript-style-guide',
            'reading-notes/css-world',
          ],
        },
        {
          title: 'tool-side',
          collapsable: false,
          children: ['tool-side/nginx的安装与使用'],
        },
        {
          title: 'TypeScript',
          collapsable: false,
          children: ['TypeScript/TypeScript入门之安装与配置'],
        },
        {
          title: 'Vue',
          collapsable: false,
          children: [
            'Vue/store中“getter”和“mutation”的生成',
            'Vue/Vue3.0+TypeScript脚手架搭建项目',
            'Vue/Vue3.0+vue-cli-plugin-vue-next填坑记',
          ],
        },
        {
          title: 'webpack',
          collapsable: false,
          children: ['webpack/webpack入门之安装与配置'],
        },
      ],
    },
  },
};
