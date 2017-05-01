import React from 'react'
import CSSModules from 'react-css-modules'
import inlineStyles from './LoginScreen.css'

import LoginTitle from './components/LoginTitle'
import UserAndPassword from './components/UserAndPassword'
import FooterList from './components/FooterList'

class LoginScreen extends React.Component {
  render () {
    return (
      <div styleName='loginScreen'>
        <LoginTitle />
        <UserAndPassword />
        <FooterList />
      </div>
    )
  }
}

export default CSSModules(LoginScreen, inlineStyles, {allowMultiple: true})
