import React from 'react'

import Media from 'react-media'

import AppBar from 'material-ui/AppBar'

import LoginScreen from './components/LoginScreen'

const App = () => (
  <div>
    <Media
      query='(max-width: 600px)'
      render={() => (
        <AppBar title='Login' />
      )}
    />
    <Media
      query='(min-width: 600px)'
      render={() => (
        <LoginScreen />
      )}
    />
  </div>
)

export default App
