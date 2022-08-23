import { actions } from "./App"

export default function OperationB({dispatch, operation}) {
  return <button onClick={() => dispatch({type: actions.operation, payload: {operation}})}>{operation}</button>
}