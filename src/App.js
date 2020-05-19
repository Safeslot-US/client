import React from 'react'
import {ThemeProvider} from 'styled-components'
import {Routes} from './components'
import {theme} from './theme'

//superfluous comment so heroku will build? 
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