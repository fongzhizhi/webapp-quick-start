import "./styles/main.less";
import { printStyleLog } from "./utils/util";
import readme from "../README.md";
import { marked } from "marked";

window.onload = () => {
  loadReadme();
  doSomething();
};

function loadReadme() {
  const readMeHtml = marked(readme);
  document.getElementById("readme").innerHTML = readMeHtml;
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
