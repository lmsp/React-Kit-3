import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Media from 'react-media'

import AppBar from 'material-ui/AppBar'

import Winner from './components/Winner'
import Vote from './components/Vote'
import * as actions from '../../actions'

class Voting extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { redirectToLogin: false, redirectToResults: false }
    this.onRedirectToLogin = this.onRedirectToLogin.bind(this)
    this.onRedirectToResults = this.onRedirectToResults.bind(this)
  }
  onRedirectToLogin () {
    this.setState({ redirectToLogin: true, redirectToResults: false })
    this.context.router.history.push('/')
  }
  onRedirectToResults () {
    this.setState({ redirectToLogin: false, redirectToResults: true })
    this.context.router.history.push('/results')
  }
  render () {
    if (this.state.redirectToLogin) {
      return <Redirect to='/' />
    }
    if (this.state.redirectToResults) {
      return <Redirect to='/results' />
    }
    return (
      <div>
        <Media
          query='(max-width: 600px)'
          render={() => <AppBar title='Ventana demasiado pequeña' />}
        />
        <Media
          query='(min-width: 600px)'
          render={() =>
            this.props.winner
              ? <Winner ref='winner' winner={this.props.winner} />
              : <Vote
                {...this.props}
                onRedirectToLogin={this.onRedirectToLogin}
                onRedirectToResults={this.onRedirectToResults}
                />}
        />
      </div>
    )
  }
}

Voting.propTypes = {
  winner: PropTypes.string
}

Voting.defaultProps = {
  winner: ''
}

Voting.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  var pair = state.getIn(['vote', 'pair'])
  if (!pair) return {}
  return {
    pair: state.getIn(['vote', 'pair']).toJS(),
    hasVoted: state.getIn(['myVote', 'entry']),
    winner: state.get('winner')
  }
}

const VotingContainer = connect(mapStateToProps, actions)(Voting)

export default VotingContainer
