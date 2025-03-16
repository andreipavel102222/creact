import CReact, { useState } from "./src/creact.js";

const NameComponent = (props) => {
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


const ButtonComponent = function() {
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
            padding: '0.5rem 1rem',
            margin: '0px 1rem 0px 0px',
            backgroundColor: '#fff',
            border: '1px solid blue',
            borderRadius: '10px',
            cursor: 'pointer'
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
            padding: '0.5rem 1rem',
            backgroundColor: '#fff',
            border: '1px solid blue',
            borderRadius: '10px',
            cursor: 'pointer'
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
          oninput: props.handleInput,
          style: {
            marginTop: '1rem'
          }
        },
        []
      )
    ]
  )
}

const ContainerComponent = () => {
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