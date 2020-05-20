import React from 'react'
import {ThemeProvider} from 'styled-components'
import {Routes} from './components'
import {theme} from './theme'

function App() {
  return (
      <div> 
      <ThemeProvider theme={theme}>
          <Routes />
      </ThemeProvider>
      </div> 
  )
}

export default App