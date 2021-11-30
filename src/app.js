import { printStyleLog } from "./utils/util";
import { marked } from "marked";

window.onload = () => {
  loadReadme();
  doSomething();
};

function loadReadme() {
  const readMeHtml = marked(
    "# Marked in the browser\n\nRendered by **marked**."
  );
  document.getElementById("readme").innerHTML = readMeHtml;
}

function doSomething() {
  // print something
  printStyleLog(
    "Jinx",
    {
      name: "Jinx",
      age: 17,
    },
    {
      color: "#41b883",
    }
  );
}
