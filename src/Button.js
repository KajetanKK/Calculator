import { actions } from "./App"

export default function Button({dispatch, digit}) {
  return <button onClick={() => dispatch({type: actions.add, payload: {digit}})}>{digit}</button>
}