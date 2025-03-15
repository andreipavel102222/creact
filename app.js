import CReact, { useState } from "./src/creact.js";

const NameComponent = (props) => {
  return CReact.createElement(
    'span',
    {
      title: 'Name'
    },
    [
      props.name
    ]
  )
}

const GreetingComponent = function(props) {
  return CReact.createElement(
    'h1',
    null, 
    [
      'Hi ',
      CReact.createElement(
        NameComponent,
        props, []
      ),
      ' from CReact',
    ],
  )
}


const ButtonComponent = function(_props, _children) {
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
          counter.toString()
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
          'Increase'
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
          'decrease'
        ]
      ),
    ]
  )
}

const InputComponent = () => {
  const [value, setValue] = useState('Name');

  const handleInput = (e) => {
    console.log(e);
    setValue(e.target.value);
  }

  return CReact.createElement(
    'div',
    null,
    [
      CReact.createElement(
        'p',
        null,
        [
          value
        ]
      ),
      CReact.createElement(
        'input',
        {
          value: value,
          oninput: handleInput
        },
        []
      )
    ]
  )
}

const ContainerComponent = (_props, _children) => {
  return CReact.createElement(
    'div',
    null,
    [
      CReact.createElement(GreetingComponent, {name: 'Mircea'}, []),
      CReact.createElement(ButtonComponent, null, []),
      // CReact.createElement(InputComponent, null, []),
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