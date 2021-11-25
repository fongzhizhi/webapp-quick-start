const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');

/**
 * 全局配置
 */
const appConfig = {
    BASE_URL: '/',
    dest: 'dist',
};

function init() {
    createDir(path.resolve(__dirname, appConfig.dest));
}

/**
 * 创建目录
 * @param {string} dir 
 */
function createDir(dir) {
    try {
        fs.statSync(dir);
    } catch (error) {
        fs.mkdirSync(dir);
    }
}

/**
 * 读取指定目录下的文件路径
 * @param {string} dir 路径
 * @param {string} accept 接受的文件类型
 * @param {boolean?} deep 深度遍历
 * @returns {{relativePath: string;path: string;}[]}
 */
 function readDirs(dir, accept, deep) {
    const files = [];
    const res = fs.readdirSync(dir);
    res && res.forEach(p => {
        const filePath = path.resolve(dir, p);
        const state = fs.statSync(filePath);
        if(state.isDirectory()) {
            deep && files.push(...readDirs(filePath, accept, deep));
        } else if(!accept || filePath.endsWith(accept)) {
            files.push({
                path: filePath,
                relativePath: path.join(dir, p),
            });
        }
    });
    return files;
}

/**
 * js编译
 */
function jsComplier() {
    // const babelConfig = JSON.parse(fs.readFileSync('babel.config.json').toString());
    // const sortDirs = ['src/utils', 'src'];
    // let data = '';
    // let index = 0;
    // sortDirs.forEach(dir => {
    //     const obj = readDirs(dir, '.js', false);
    //     obj.forEach(info => {
    //         index++;
    //         babel.transformFileAsync(info.path, babelConfig).then(res => {
    //             data += `\n// fileSource: ${info.relativePath}\n`;
    //             data += res.code;
    //             if(--index === 0) {
    //                 console.log('compiler to app.js');
    //                 fs.writeFileSync(path.resolve(appConfig.dest, 'app.js'), data);
    //             }
    //         });
    //     });
    // });
}

// ===> run
init();
jsComplier()