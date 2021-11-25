import babel from '@rollup/plugin-babel';
export default {
    // 打包入口
    input: 'src/app.js',
    // 输出配置
    output: {
        file: 'dist/app.js',
        format: 'cjs',
        name: 'webapp-quick-start'
    },
    // 插件
    plugins: [
        babel({
            presets: ['@babel/preset-env']
        }),
    ],
    // 外链
    external: [],
    // 全局模块
    globals: {
        jquery: '$'
    },
    sourcemap: true,
  };