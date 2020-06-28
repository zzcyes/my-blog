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

const sidebar = readDirSync('docs/markdown');

const barObj = {};

// obj
sidebar.forEach((name) => {
  barObj[`/markdown/${name}`] = {
    title: name,
    collapsable: false,
    children: fs
      .readdirSync(`docs/markdown/${name}`)
      .map((x) => {
        if (x.includes('.md') && !x.includes('README')) {
          return x.replace('.md', '');
        }
        return '';
      })
      .filter((x) => x),
  };
});

const children = sidebar
  .map((name) => {
    return {
      title: name,
      collapsable: false,
      children: fs
        .readdirSync(`docs/markdown/${name}`)
        .map((x) => {
          if (x.includes('.md') && !x.includes('README')) {
            return `${name}/${x.replace('.md', '')}`;
          }
          return '';
        })
        .filter((x) => x),
    };
  })
  .filter((x) => x);

// fs.writeFile('config.txt', JSON.stringify(barObj), function (err) {
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
console.log(children);
