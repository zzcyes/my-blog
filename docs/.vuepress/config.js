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
      { text: 'Github', link: 'https://github.com/zzcyes' },
    ],
    sidebar: [
      ['/catalogue', 'Catalogue'],
      {
        title: 'JavaScript',
        sidebarDepth: 2,
        children: [
          'markdown/JavaScript/001_JavaScript之对象',
          'markdown/JavaScript/002_JavaScript之对象的创建',
          'markdown/JavaScript/003_JavaScript之继承',
          'markdown/JavaScript/004_JavaScript之数组',
          'markdown/JavaScript/005_JavaScript之原型原型链prototype',
          'markdown/JavaScript/006_JavaScript之BOM',
          'markdown/JavaScript/007_JavaScript之DOM',
          'markdown/JavaScript/008_JavaScript之function',
          'markdown/JavaScript/009_JavaScript之Symbol',
        ],
      },
      {
        title: 'problem-record',
        sidebarDepth: 2,
        children: [
          'markdown/problem-record/001_CORS',
          'markdown/problem-record/002_HTTP&HTTPS混用',
          'markdown/problem-record/003_input无法连续上传同一文件',
          'markdown/problem-record/004_TypeScript',
        ],
      },
      {
        title: 'reading-notes',
        sidebarDepth: 2,
        children: [
          'markdown/reading-notes/001_airbnb-javascript-style-guide',
          'markdown/reading-notes/002_css-world',
        ],
      },
      {
        title: 'tool-side',
        sidebarDepth: 2,
        children: ['markdown/tool-side/001_nginx的安装与使用'],
      },
      {
        title: 'TypeScript',
        sidebarDepth: 2,
        children: ['markdown/TypeScript/001_TypeScript入门之安装与配置'],
      },
      {
        title: 'Vue',
        sidebarDepth: 2,
        children: [
          'markdown/Vue/001_store中“getter”和“mutation”的生成',
          'markdown/Vue/002_Vue3.0+TypeScript脚手架搭建项目',
          'markdown/Vue/003_Vue3.0+vue-cli-plugin-vue-next填坑记',
        ],
      },
      {
        title: 'webpack',
        sidebarDepth: 2,
        children: ['markdown/webpack/001_webpack入门之安装与配置'],
      },
    ],
  },
};
