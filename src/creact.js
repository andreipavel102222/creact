import { render, reconciliation } from "./creact-dom.js";
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
        type,
        props,
        component: true,
      }
      
      appConfig.firstRender && setCurrentStateNode(stateNode);

      appConfig.firstRender && attachStateNode(type, stateNode);

      newElement.children = type(props, children);

      appConfig.firstRender && resetCurrentStateNode();

      appConfig.firstRender && setStateNodeRef(stateNode, newElement);
    }
    
    return newElement;
  }

  static createTextElement(value) {
    return {
      type: 'text',
      value
    }
  }

  static buildVDOM(appComponent) {
    const app = appComponent();
    appConfig.vDOM = app;
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

function setStateNodeRef(stateNode, newElement) {
  stateNode.ref = newElement;
}

function attachStateNode(component, stateNode) {
  Object.defineProperty(component, 'stateNode', {
    value: stateNode,
    writable: false
  })
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

  componentStateNode.states[currentIndex] = componentStateNode.states[currentIndex] === undefined ? initialValue : componentStateNode.states[currentIndex];
  
  const setState = (fn) => {
    if(typeof fn === 'function') {
      componentStateNode.states[currentIndex] = fn(componentStateNode.states[currentIndex]);
    }
    else {
      componentStateNode.states[currentIndex] = fn;
    }
  
    resetStateIndexes(stateNode);
    appConfig.curentStateNode = stateNode;
    triggerReconciliation(componentStateNode);
  }
  
  componentStateNode.indexStates++;

  return [componentStateNode.states[currentIndex], setState];
}

function triggerReconciliation(componentStateNode) {
  const parent = componentStateNode.ref;
  const newElement = componentStateNode.ref.type();
  const oldElement = componentStateNode.ref.children;

  parent.children = newElement;

  reconciliation(oldElement, newElement);
}

//rerender
const container = document.getElementById('container');

function rerender(){
  container.replaceChildren();
  render(AppComponent(), container);
}


export default CReact;