import React from 'react'
import { Redirect } from 'react-router-dom'

import CSSModules from 'react-css-modules'
import inlineStyles from './LoginScreen.css'

import LoginTitle from './components/LoginTitle'
import UserAndPassword from './components/UserAndPassword'
import FooterList from './components/FooterList'

class LoginScreen extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { redirectToVoting: false }
    this.onRedirectToVoting = this.onRedirectToVoting.bind(this)
  }
  onRedirectToVoting () {
    this.setState({ redirectToVoting: true })
    this.context.router.history.push('/voting')
  }
  render () {
    if (this.state.redirectToVoting) {
      return <Redirect to='/voting' />
    }
    return (
      <div styleName='loginScreen'>
        <LoginTitle />
        <UserAndPassword onRedirectToVoting={this.onRedirectToVoting} />
        <FooterList />
      </div>
    )
  }
}

LoginScreen.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default CSSModules(LoginScreen, inlineStyles, { allowMultiple: true })
