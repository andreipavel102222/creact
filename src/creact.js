import render from "./creact-dom.js";
import AppComponent from "./../app.js";

export const appConfig = {
  vDOM: null,
  stateTree: null,
  curentStateNode: undefined,
  firstRender: true,
}

class CReact {
  static createElement(type, props, children) {
    let newElement;
    let stateNode = {
      indexStates: 0,
      states: [],
      children: [],
      parent: appConfig.curentStateNode,
    };

    if(typeof type === 'string') {
      newElement = {
        type,
        props,
        children,
      }
    }
    else if(typeof type === 'function') {
      newElement = {
        type: type.name,
        props,
        component: true,
      }
      
      appConfig.firstRender && setCurrentStateNode(stateNode);

      newElement.children = type(props, children, stateNode);

      appConfig.firstRender && resetCurrentStateNode();
    }
    
    appConfig.firstRender && setStateNodeRef(stateNode, type);
    
    return newElement;
  }

  static buildVDOM(appComponent) {
    const app = appComponent();
    appConfig.vDOM = app;
    console.log(appConfig.vDOM);
    console.log('=====');
    console.log(appConfig.stateTree);
    console.log('=====');
    console.log(appConfig.firstRender);
    return app;
  }
}


//state tree manipulation
function createEmptyStateNode() {
  return {
    indexStates: 0,
    states: [],
    children: [],
    parent: appConfig.curentStateNode,   
    ref: null, 
  }
}

function setCurrentStateNode(stateNode) {
  if(appConfig.stateTree === null) {
    appConfig.stateTree = stateNode;
  }
  else {
    appConfig.curentStateNode.children.push(stateNode);
  }
  
  appConfig.curentStateNode = stateNode;
}

function resetCurrentStateNode() {
  appConfig.curentStateNode = appConfig.curentStateNode.parent;
}

function setStateNodeRef(stateNode, type) {
  stateNode.ref = type.name;
}

function resetStateIndexes(stateNode) {
  if(!stateNode) return;

  stateNode.indexStates = 0;

  for(let i=0; i < stateNode.children.length; i++) {
    resetStateIndexes(stateNode.children[i]);
  }
}


// useState hook
export function useState(initialValue, stateNode) {
  const componentStateNode = stateNode;
  const currentIndex = componentStateNode.indexStates;

  componentStateNode.states[currentIndex] = componentStateNode.states[currentIndex] || initialValue;
  
  const setState = (newState) => {
    componentStateNode.states[currentIndex] = newState;
    resetStateIndexes(stateNode);
    appConfig.curentStateNode = stateNode;
    console.log(appConfig.stateTree);
  }
  
  componentStateNode.indexStates++;
  return [componentStateNode.states[currentIndex], setState];
}

//rerender
const container = document.getElementById('container');

function rerender(){
  container.replaceChildren();
  render(AppComponent(), container);
}


export default CReact;