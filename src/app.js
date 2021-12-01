import { printStyleLog } from "./utils/util";
// [error-warn: 使用es6的import导入会导致打包异常，所以建议第三方库都使用require]
import axios from "axios/dist/axios";
// const axios = require("axios");
import { marked } from 'marked';

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
