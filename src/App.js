import React from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import {Routes} from './components'

import {store} from './store'
import {history} from './utils'
import {theme} from './theme'
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App
