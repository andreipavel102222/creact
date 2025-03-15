
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
    for(const [key, value] of Object.entries(vDOMElement.props)){
      domElement[key] = value;
    }
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
  // tag element
  if(typeof oldElement.type === 'string' && oldElement.type === newElement.type) {
    const domElement = oldElement.ref;
    
    newElement.ref = domElement;

    if(newElement.props && typeof newElement.props === 'object') {
      for(const [key, value] of Object.entries(newElement.props)){
        domElement[key] = value;
      }
    }

    newElement.children.forEach((child, index) => {
      if(typeof child === 'object' && child.type){
        reconciliation(oldElement.children[index], child);
      }
      else if(typeof child === 'string') {
        
      }
    })

    return;
  }
  
  if((oldElement.component && newElement.component && oldElement.type.name === newElement.type.name)) {
    return;
  }

  //TO DO: handle conditional rendering
}



