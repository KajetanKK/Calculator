import Button from './Button';
import OperationB from './OperationB';
import { useReducer } from 'react';
import './App.css';

export const actions = {
  add: 'add',
  delete: 'delete',
  operation: 'operation',
  clear: 'clear',
  evaluate: 'evaluate'
}

function reducer(state, {type, payload}) {
  switch(type) {
    case actions.add:

      if (payload.digit === "." && state.currentOp.includes(".")) return state
      if (payload.digit === "0" && state.currentOp.includes === "0") return state

      return {
        ...state,
        currentOp: `${state.currentOp || ""}${payload.digit}`,
      }

    case actions.clear:
      return {}

    case actions.evaluate:
      if (
        state.operation === null || state.previousOp === null || state.currentOp === null
      ) {
        return state
      }

      return {
        ...state,
        previousOp: null,
        currentOp: evaluate(state),
        operation: null
      }

    case actions.operation:
      if (state.previousOp === null) {
        return {
          ...state,
          operation: payload.operation,
          previousOp: state.currentOp,
          currentOp: null
        }
      }

      if (state.currentOp === null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.currentOp === null && state.previousOp === null) {
        return state
      }

      return {
        ...state,
        previousOp: evaluate(state),
        currentOp: null,
        operation: payload.operation
      }
  }
}

function evaluate({currentOp, previousOp, operation}) {
  const current = parseFloat(currentOp)
  const previous = parseFloat(previousOp)
  if (isNaN(previous) || isNaN(current)) return ""
  let comp = ""

  switch (operation) {
    case "+":
      comp = previous + current
      break

    case "-":
      comp = previous - current
      break

    case "/":
      comp = previous / current
      break

    case "*":
      comp = previous * current
      break
  }
  return comp.toString()
}

function App() {

  const [{currentOp, previousOp, operation}, dispatch] = useReducer(reducer, {}) 

  return (
    <div className="app">
      <div className="output">
        <div className="previous">{previousOp} {operation}</div>
        <div className="current">{currentOp}</div>
      </div>
      <button className="s-two" onClick={() => dispatch({type: actions.clear})}>AC</button>
      <button>DEL</button>
      <OperationB operation="/" dispatch={dispatch}/>
      <Button digit="1" dispatch={dispatch}/>
      <Button digit="2" dispatch={dispatch}/>
      <Button digit="3" dispatch={dispatch}/>
      <OperationB operation="*" dispatch={dispatch}/>
      <Button digit="4" dispatch={dispatch}/>
      <Button digit="5" dispatch={dispatch}/>
      <Button digit="6" dispatch={dispatch}/>
      <OperationB operation="+" dispatch={dispatch}/>
      <Button digit="7" dispatch={dispatch}/>
      <Button digit="8" dispatch={dispatch}/>
      <Button digit="9" dispatch={dispatch}/>
      <OperationB operation="-" dispatch={dispatch}/>
      <Button digit="." dispatch={dispatch}/>
      <Button digit="0" dispatch={dispatch}/>
      <button className="s-two" onClick={() => dispatch({type: actions.evaluate})}>=</button>
    </div>
  );
}

export default App;
