import { printStyleLog } from "./utils/util";
import { marked } from "marked";
// 这里引入'axios'的话无法在rollup中正常打包
import axios from "axios/dist/axios";

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
        document.getElementById("readme").innerHTML = readMeHtml;
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
