import { render } from "./src/creact-dom.js";
import AppComponent from "./app.js";
import CReact from "./src/creact.js";
import { appConfig } from "./src/creact.js";

const container = document.getElementById('container');
const appObject = CReact.buildVDOM(AppComponent);
console.log(appObject);
render(appObject, container);

appConfig.firstRender = false;

