import { printStyleLog } from "./utils/util";
// ts引用第三方库时需要根据声明文件查找，因此需要 npm install  @types/marked
// 否则会报模块无法找到的错误
import { marked } from 'marked';
// 这里引入'axios'的话无法在rollup中正常打包
import axios from "axios";

window.onload = () => {
  loadReadme();
  doSomething();
};

function loadReadme() {
  axios
    .get("/readme")
    .then((res) => {
      if (res && res.data) {
        const readMeHtml = marked(res.data);
        const readme = document.getElementById("readme");
        readme && (readme.innerHTML = readMeHtml);
      }
    })
    .catch((err) => {
      printStyleLog("Server Error", err);
    });
}

function doSomething() {
  // print something
  printStyleLog(
    "Jinx",
    {
      name: "Jinx",
      age: 21,
    },
    {
      color: "#41b883",
    }
  );
}
