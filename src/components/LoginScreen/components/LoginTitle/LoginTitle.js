import React from 'react'
import CSSModules from 'react-css-modules'
import inlineStyles from './LoginTitle.css'

class LoginTitle extends React.Component {
  render () {
    return <div styleName='loginTitle'>Login</div>
  }
}

export default CSSModules(LoginTitle, inlineStyles, {allowMultiple: true})
