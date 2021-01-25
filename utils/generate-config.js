const fs = require('fs');
const baseConfig = require('./config.json');
/**
 *
 *  COMMON
 *
 */

// const baseConfig = {
//     "title": "zzcyes",
//     "base": "/blog/",
//     "description": "Learning and recording",
//     "head": [
//         [
//             "link",
//             {
//                 "rel": "icon",
//                 "href": "/img/logo.ico"
//             }
//         ]
//     ],
//     "theme": "antdocs",
//     "themeConfig": {
//         "mode": "dark",
//         "navbar": true,
//         "search": true,
//         "searchMaxSuggestions": 10,
//         "lastUpdated": "Last Updated",
//         "backToTop": true,
//         "nav": [
//             {
//                 "text": "Home",
//                 "link": "/"
//             },
//             {
//                 "text": "Catalogue",
//                 "link": "/catalogue"
//             },
//             {
//                 "text": "LeetCode",
//                 "link": "http: //www.zzcyes.com/leetcode"
//             },
//             {
//                 "text": "Github",
//                 "link": "https: //github.com/zzcyes"
//             }
//         ],
//         "sidebar": [
//             // [
//             //     "/catalogue",
//             //     "Catalogue"
//             // ]
//         ]
//     }
// };

const readDirSync = (path) => {
    const paths = fs.readdirSync(path);
    const catalogue = [];
    paths.forEach((name) => {
        if (name.includes('.')) return;
        catalogue.push(name);
    });
    return catalogue;
};

const writeTextToFile = (filePath, fileText = "") => {
    fs.writeFile(filePath, fileText, (err) => {
        if (err) {
            return console.error(err);
        }
        fs.readFile(filePath, (error, data) => {
            if (error) {
                return console.error(error);
            }
            // console.log('读取文件内容成功,内容如下:\n', data.toString());
        });
    });
};

/**
 *
 *  CUSTOM
 *
 */

const globalConfig = {
    basePath: 'docs',
    subPath: "markdown",
};

const parentPaths = readDirSync(`${globalConfig.basePath}/${globalConfig.subPath}`);

const sidebars = parentPaths.map((pathName) => {
    return {
        title: pathName,
        sidebarDepth: 2,
        children: fs
            .readdirSync(`${globalConfig.basePath}/${globalConfig.subPath}/${pathName}`)
            .map((path) => {
                if (path.includes('.md') && !path.includes('README')) {
                    return `${globalConfig.subPath}/${pathName}/${path.replace('.md', '')}`;
                }
                return '';
            })
            .filter((exist) => exist),
    };
});

const genConfig = (filePath) => {
    baseConfig.themeConfig.sidebar.push(...sidebars);
    const fileText = `module.exports = ${JSON.stringify(baseConfig, null, 4)}`;
    writeTextToFile(filePath, fileText);
};

const createTemplate = ({ title = "blog", linksPath = "" }) => {
    let template = `# ${title}`;
    const thirdTemplate = [];
    parentPaths.forEach((patentName) => {
        const secondry = { parent: `\n\n## ${patentName}\n\n` };
        const third = fs.readdirSync(`${globalConfig.basePath}/${globalConfig.subPath}/${patentName}`).map((path) => {
            const index = path.lastIndexOf(".");
            return {
                name: path.slice(0, index),
                type: path.slice(index + 1),
                sires: patentName,
                basePath: `${globalConfig.subPath}/${patentName}`,
                fullPath: `${globalConfig.subPath}/${patentName}/${path}`
            }
        });
        secondry.children = third.map(thiedItem => {
            return `- [${thiedItem.name}](${linksPath}${thiedItem.fullPath})`
        });
        thirdTemplate.push(secondry);
    });
    thirdTemplate.forEach(temp => {
        template += temp.parent;
        template += temp.children.join("\n\n");
    });
    return template;
};

const customTagsMap = new Map([
    ['基础', ['css', 'html', 'JavaScript']],
    ['进阶', ['node', 'source-code', 'Vue', 'TypeScript', 'backend']],
    ['提升', ['network', 'compilers-principles', 'computer-basis', 'design-pattern']],
    ['工具', ['git', 'tool-side']],
    ['总结', ['interview-preparation', 'problem-record', 'reading-notes', 'others']]
]);

// 分类
const createCustomTemplate = ({ title = "blog", linksPath = "" }) => {
    let template = `# ${title}\n`;
    const thridMap = new Map();
    parentPaths.forEach((patentName) => {
        const secondry = { parent: `\n\n## ${patentName}\n\n` };
        const third = fs.readdirSync(`${globalConfig.basePath}/${globalConfig.subPath}/${patentName}`).map((path) => {
            const index = path.lastIndexOf(".");
            return {
                name: path.slice(0, index),
                type: path.slice(index + 1),
                sires: patentName,
                basePath: `${globalConfig.subPath}/${patentName}`,
                fullPath: `${globalConfig.subPath}/${patentName}/${path}`
            }
        });
        secondry.children = third.map(thiedItem => {
            return `- [${thiedItem.name}](${linksPath}${thiedItem.fullPath})`
        });
        thridMap.set(patentName, secondry.children);
    });
    customTagsMap.forEach((value, key) => {
        template += `\n## ${key}\n`;
        value.forEach(pathName => {
            template += `\n### ${pathName}\n\n`;
            template += `${thridMap.get(pathName).join("\n\n")}\n`
        });
    });
    return template;
};

const genCatalog = (arrs) => {
    arrs.forEach(configItem => {
        const { title, linksPath, filePath } = configItem || {};
        const template = createCustomTemplate({ title, linksPath });
        // const template = createTemplate({ title, linksPath });
        writeTextToFile(filePath, template);
    });
};

module.exports = { baseConfig, parentPaths, sidebars, createCustomTemplate, genConfig, genCatalog };
