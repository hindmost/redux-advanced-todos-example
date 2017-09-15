import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducer from './reducers'

const json0 = localStorage.getItem('reduxState')
const persistedState = json0 ? JSON.parse(json0) : {}
const store = createStore(reducer, persistedState)
store.subscribe(()=>{
  let json = JSON.stringify(store.getState())
  json === json0 || localStorage.setItem('reduxState', json)
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
