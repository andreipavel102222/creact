
function render(vDOMElement, container) {
  let domElement;

  //check if element is a string
  if(typeof vDOMElement === 'string') {
    domElement = document.createTextNode(vDOMElement);
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
  
  //render children
  if(vDOMElement.children && vDOMElement.children.length > 0) {
    vDOMElement.children.forEach(children => {render(children, domElement)});
  }

  //attach this element to his parent
  container.appendChild(domElement);
}

export default render;

