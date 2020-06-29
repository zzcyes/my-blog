const fs = require('fs');

const readDirSync = (path) => {
    const paths = fs.readdirSync(path);
    const catalogue = [];
    paths.forEach((name) => {
        if (name.includes('.')) return;
        catalogue.push(name);
    });
    return catalogue;
};

const sidebar = readDirSync('docs/markdown/');

const nav = sidebar.map(name => {
    const [firstName] = fs
        .readdirSync(`docs/markdown/${name}`)
        .map((x) => {
            if (x.includes('.md') && !x.includes('README')) {
                return x.replace('.md', '');
            }
            return '';
        })
        .filter((x) => x)
    return { text: name, link: `/markdown/${name}/${firstName}` }
});

console.log('====nav===', nav);

const barObj = {};

// // obj
sidebar.forEach((name) => {
    barObj[`/markdown/${name}/`] = [{
        title: name,
        collapsable: false,
        children: fs
            .readdirSync(`docs/markdown/${name}`)
            .map((x) => {
                if (x.includes('.md') && !x.includes('README')) {
                    return x;
                }
                return '';
            })
            .filter((x) => x),
    }];
});


// '/markdown/JavaScript/': [
//     {
//         title: 'JavaScript',
//         collapsable: false,
//         children: [
//             'JavaScipt之Symbol.md',
//             'JavaScript之BOM.md',
//             'JavaScript之DOM.md',
//             'JavaScript之function.md',
//             'JavaScript之原型原型链prototype.md',
//             'JavaScript之对象.md',
//             'JavaScript之对象的创建.md',
//             'JavaScript之数组.md',
//             'JavaScript之继承.md'
//         ]
//     }
// ],

// const children = sidebar
//     .map((name) => {
//         return {
//             title: name,
//             collapsable: false,
//             children: fs
//                 .readdirSync(`docs/${name}`)
//                 .map((x) => {
//                     if (x.includes('.md') && !x.includes('README')) {
//                         return `${name}/${x.replace('.md', '')}`;
//                     }
//                     return '';
//                 })
//                 .filter((x) => x),
//         };
//     })
//     .filter((x) => x);
console.log(barObj);
fs.writeFile('config.txt', JSON.stringify(barObj, null, 4), function (err) {
    if (err) {
        return console.error(err);
    }
    fs.readFile('config.txt', function (error, data) {
        if (error) {
            return console.error(error);
        }
        console.log('异步读取文件数据: ' + data.toString());
    });
});

// console.log(barObj);

//  const createSideBar = ()=>{

// };

// export default createSideBar;
