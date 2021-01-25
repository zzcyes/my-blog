const {
    baseConfig,
    createCustomTemplate,
    genCatalog,
    genConfig
} = require('./utils/generate-config.js');
const { title } = baseConfig;

genCatalog([
    { title, linksPath: './', filePath: './docs/catalogue.md' },
    { title, linksPath: './docs/', filePath: 'README.md' }
])

genConfig('./docs/.vuepress/config.js')

const map = new Map([
    ['基础', ['css', 'html', 'JavaScript']],
    ['进阶', ['node', 'source-code', 'Vue', 'TypeScript', 'backend']],
    ['提升', ['network', 'compilers-principles', 'computer-basis', 'design-pattern']],
    ['工具', ['git', 'tool-side']],
    ['总结', ['interview-preparation', 'problem-record', 'reading-notes', 'others']]
]);

createCustomTemplate({ title, linksPath: './', filePath: './docs/catalogue1.md' })
// console.log(createCustomTemplate({ title, linksPath: './', filePath: './docs/catalogue1.md' }));
