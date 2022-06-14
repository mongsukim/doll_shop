import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

let initalert = true

function reducer2(state = initalert, action) {
  if (action.type === 'alert닫기') {
    state = false
    return state
  } else {
    return state
  }
}

let initialValue = [
  { id: 0, name: '인형1', quan: 2 },
  { id: 1, name: '인형2', quan: 1 },
]

function reducer(state = initialValue, action) {
  if (action.type === 'AddItem') {
    let found = state.findIndex((a) => {
      return a.id === action.data.id
    })
    if (found >= 0) {
      let copy = [...state]
      copy[found].quan++
      return copy
    } else {
      let copy = [...state]
      copy.push(action.data)
      return copy
    }
  } else if (action.type === 'quanPLUS') {
    let copy = [...state]
    copy[action.data].quan++
    return copy
  } else if (action.type === 'quanMINUS') {
    let copy = [...state]
    copy[action.data].quan--
    return copy
  } else {
    return state
  }
}

let store = createStore(combineReducers({ reducer, reducer2 }))
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
