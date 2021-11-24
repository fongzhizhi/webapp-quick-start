/**
 * 打印带有样式的日志标注
 * @param {string} tag 日志标记
 * @param {any} content 日志内容
 * @param {{[k: string]: string}?} style 日志样式
 */
export function printStyleLog(tag, content, style) {
    if(Object.is(tag, undefined)) {
        tag = '=>'
    }
    style = Object.assign({
        color: '#0f0',
        'font-size': '18px',
    }, style);
    const styleStr = '';
    console.log(`%c ${tag}`, styleStr, content);
}

export function cssObj2CssStr(obj) {

}