
function attachStyle(domElement, style) {
  for(const [key, value] of Object.entries(style)) {
    domElement.style[key] = value;
  }
}

function setProps(domElement, props) {
  for(const [key, value] of Object.entries(props)){
    if(key === 'style') {
      attachStyle(domElement, value);
    }
    else {
      domElement[key] = value;
    }
  }  
}

export function render(vDOMElement, container) {
  let domElement;

  //check if element is a string
  if(vDOMElement.type === 'text') {
    domElement = document.createTextNode(vDOMElement.value);
    vDOMElement.domRef = domElement;
    container.appendChild(domElement);
    return;
  }
  
  // create the element
  if(vDOMElement.component) {
    render(vDOMElement.children, container);
    return;
  }
  domElement = document.createElement(vDOMElement.type);

  // attach props to the element
  if(vDOMElement.props && typeof vDOMElement.props === 'object') {
    setProps(domElement, vDOMElement.props);
  }
  
  vDOMElement.domRef = domElement;

  //render children
  if(vDOMElement.children && vDOMElement.children.length > 0) {
    vDOMElement.children.forEach(children => {render(children, domElement)});
  }

  //attach this element to his parent
  container.appendChild(domElement);
}

export function reconciliation(oldElement, newElement) {
  if(newElement.type === oldElement.type) {
    if(newElement.type === 'text') {
      const domElement = oldElement.domRef;

      newElement.domRef = domElement;

      domElement.textContent = newElement.value;

      return;
    }
    else if(typeof newElement.type === 'string') {
      const domElement = oldElement.domRef;

      newElement.domRef = domElement;

      if(newElement.props && typeof newElement.props === 'object') {
        setProps(domElement, newElement.props);
      }
      
      newElement.children.forEach((newElementChild, index) => {
        reconciliation(oldElement.children[index], newElementChild);
      });

      return;
    }
    else if(newElement.component) {
      reconciliation(oldElement.children, newElement.children);      
      return;
    }
  }
  // TO DO: check if this is the same as the third if
  else if((oldElement.component && newElement.component && oldElement.type.name === newElement.type.name)){
    newElement.children.forEach((newElementChild, index) => {
      reconciliation(oldElement.children[index], newElementChild);
    });  
    
    return;
  }
  //TO DO: handle conditional rendering
  else {

  }
}



