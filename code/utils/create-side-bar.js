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

const BASE_PATH = 'docs/';

const SUB_PATH = 'markdown/';

const SUB_NAME = 'markdown';

const sidebar = readDirSync(`${BASE_PATH}${SUB_NAME}`);

const nav = sidebar.map((name) => {
  const [firstName] = fs
    .readdirSync(`${BASE_PATH}${SUB_PATH}${name}`)
    .map((x) => {
      if (x.includes('.md') && !x.includes('README')) {
        return x.replace('.md', '');
      }
      return '';
    })
    .filter((x) => x);
  return { text: name, link: `${SUB_PATH}${name}/${firstName}` };
});

console.log('====nav===', nav);

const collapsable = sidebar.map((name) => {
  return {
    title: name,
    sidebarDepth: 2,
    children: fs
      .readdirSync(`${BASE_PATH}${SUB_PATH}${name}`)
      .map((x) => {
        if (x.includes('.md') && !x.includes('README')) {
          return `${SUB_PATH}${name}/${x.replace('.md', '')}`;
        }
        return '';
      })
      .filter((x) => x),
  };
});

console.log('====collapsable===', collapsable);

// - [compatibility](./markdown/hybrid-app/compatibility.md)

const cat = [];

sidebar.forEach((name) => {
  fs.readdirSync(`${BASE_PATH}${SUB_PATH}${name}`).forEach((x) => {
    if (x.includes('.md') && !x.includes('README')) {
      const n = `- [${x
        .replace('.md', '')
        .replace('_', '：')}](./markdown/${name}/${x})`;
      if (!cat.includes(`### ${name}`)) {
        cat.push(`### ${name}`);
      }
      cat.push(n);
    }
  });
});

console.log('====cat===', cat);

// barObj

// const barObj = {};

// sidebar.forEach((name) => {
//   barObj[`/${name}/`] = [
//     {
//       title: name,
//       collapsable: false,
//       children: fs
//         .readdirSync(`${BASE_PATH}${SUB_PATH}${name}`)
//         .map((x) => {
//           if (x.includes('.md') && !x.includes('README')) {
//             return x;
//           }
//           return '';
//         })
//         .filter((x) => x),
//     },
//   ];
// });

// console.log('====barObj===', barObj);

// const children = sidebar
//     .map((name) => {
//         return {
//             title: name,
//             collapsable: false,
//             children: fs
//                 .readdirSync(`${BASE_PATH}${name}`)
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
// console.log(barObj);

// fs.writeFile('config.txt', JSON.stringify(barObj, null, 4), function (err) {
//   if (err) {
//     return console.error(err);
//   }
//   fs.readFile('config.txt', function (error, data) {
//     if (error) {
//       return console.error(error);
//     }
//     console.log('异步读取文件数据: ' + data.toString());
//   });
// });

// console.log(barObj);

//  const createSideBar = ()=>{

// };

// export default createSideBar;
