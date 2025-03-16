import CReact, { useState } from "./src/creact.js";

const NameComponent = (props) => {
  console.log('name');
  return CReact.createElement(
    'span',
    {
      title: 'Name'
    },
    [
      CReact.createTextElement(props.name)
    ]
  )
}

const GreetingComponent = function(props) {
  console.log('greeting');
  return CReact.createElement(
    'h1',
    null, 
    [
      CReact.createTextElement('Hi '),
      CReact.createElement(
        NameComponent,
        props, 
        []
      ),
      CReact.createTextElement(' from CReact'),
    ],
  )
}


const ButtonComponent = function(_props, _children) {
  console.log('button component');
  let [counter, setCounter] = useState(0, ButtonComponent.stateNode);

  const increaseCounter = () => {
    setCounter((counter) => counter + 1);
  }

  const decreaseCounter = () => {
    setCounter((counter) => counter - 1);
  }

  return CReact.createElement(
    'div',
    null,
    [
      CReact.createElement(
        'p',
        null,
        [
          CReact.createTextElement(counter)
        ]
      ),
      CReact.createElement(
        'button',
        {
          disabled: false,
          onclick: increaseCounter,
          style: {
            color: '#fff'
          }
        },
        [
          CReact.createTextElement('Increase')
        ]
      ),
      CReact.createElement(
        'button',
        {
          disabled: false,
          onclick: decreaseCounter,
          style: {
            color: '#fff'
          }
        },
        [
          CReact.createTextElement('decrease')
        ]
      ),
    ]
  )
}

const InputComponent = (props) => {
  console.log('input component');

  return CReact.createElement(
    'div',
    null,
    [
      CReact.createElement(
        'input',
        {
          value: props.value,
          oninput: props.handleInput
        },
        []
      )
    ]
  )
}

const ContainerComponent = () => {
  console.log('container');
  const [value, setValue] = useState('Mircea', ContainerComponent.stateNode);

  const handleInput = (e) => {
    setValue(e.target.value);
  }

  return CReact.createElement(
    'div',
    null,
    [
      CReact.createElement(GreetingComponent, { name: value }, []),
      CReact.createElement(ButtonComponent, null, []),
      CReact.createElement(InputComponent, { value, handleInput }, []),
    ]
  )
}

const AppComponent = () => {
  return CReact.createElement(
    'div',
    null,
    [
      CReact.createElement(ContainerComponent, null, []),
    ]
  );
}

export default AppComponent;