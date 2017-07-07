import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import CSSModules from 'react-css-modules'
import inlineStyles from './ConnectionState.css'

import LoginScreen from '../LoginScreen'
import VotingContainer from '../Voting'
import ResultsContainer from '../Results'

class ConnectionState extends React.PureComponent {
  isNotConnected () {
    return !this.props.connected
  }
  getMessage () {
    return `No conectado (${JSON.stringify(this.props.state)})`
  }
  render () {
    if (this.isNotConnected()) {
      return (
        <div styleName='connectionState'>
          {this.getMessage()}
        </div>
      )
    }
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={LoginScreen} />
          <Route exact path='/voting' component={VotingContainer} />
          <Route exact path='/results' component={ResultsContainer} />
        </div>
      </BrowserRouter>
    )
  }
}

ConnectionState.propTypes = {
  connected: PropTypes.bool,
  state: PropTypes.object
}

ConnectionState.defaultProps = {
  connected: false,
  state: {}
}

const ConnectionStateContainer = connect(state =>
  state.get('connection', Map()).toJS()
)(CSSModules(ConnectionState, inlineStyles, { allowMultiple: true }))

export default ConnectionStateContainer
