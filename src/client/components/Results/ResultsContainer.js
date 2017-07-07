import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import inlineStyles from './Results.css'

import RaisedButton from 'material-ui/RaisedButton'

import Winner from '../Voting'
import * as actions from '../../actions'

export const VOTE_WIDTH_PERCENT = 8

const muiStyles = {
  buttonLabel: {
    textTransform: 'none',
    top: '-3px'
  }
}

class Results extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { redirectToVoting: false, redirectToStart: false }
    this.onRedirectToVoting = this.onRedirectToVoting.bind(this)
    this.onRedirectToStart = this.onRedirectToStart.bind(this)
  }
  onRedirectToVoting () {
    this.setState({ redirectToVoting: true, redirectToStart: false })
    this.context.router.history.push('/voting')
  }
  onRedirectToStart () {
    this.props.restart()
    this.setState({ redirectToVoting: false, redirectToStart: true })
    this.context.router.history.push('/')
  }
  getPair () {
    return this.props.pair || []
  }
  getVotes (entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry)
    }
    return 0
  }

  getVotesBlockWidth (entry) {
    return this.getVotes(entry) * VOTE_WIDTH_PERCENT + '%'
  }

  render () {
    if (this.state.redirectToVoting) {
      return <Redirect to='/voting' />
    } else if (this.state.redirectToStart) {
      return <Redirect to='/' />
    }
    return this.props.winner
      ? <Winner ref='winner' winner={this.props.winner} />
      : <div styleName='results'>
        <div styleName='buttons'>
          <RaisedButton
            styleName='buttonStyle'
            labelStyle={muiStyles.buttonLabel}
            label='Inicio'
            onClick={() => this.onRedirectToStart()}
            />
          <RaisedButton
            styleName='buttonStyle'
            labelStyle={muiStyles.buttonLabel}
            label='Siguiente'
            onClick={this.props.next}
            />
          <RaisedButton
            styleName='buttonStyle'
            labelStyle={muiStyles.buttonLabel}
            label='Votar'
            onClick={() => this.onRedirectToVoting()}
            />
        </div>
        <div styleName='tally'>
          {this.getPair().map(entry =>
            <div key={entry} styleName='entry'>
              <h1>
                {entry}
              </h1>
              <div styleName='voteVisualization'>
                <div
                  styleName='votesBlock'
                  style={{ width: this.getVotesBlockWidth(entry) }}
                  />
              </div>
              <div styleName='voteCount'>
                {this.getVotes(entry)}
              </div>
            </div>
            )}
        </div>
      </div>
  }
}

Results.propTypes = {
  next: PropTypes.func,
  pair: PropTypes.array,
  restart: PropTypes.func,
  tally: PropTypes.object,
  winner: PropTypes.string
}

Results.defaultProps = {
  pair: [],
  tally: undefined,
  winner: ''
}

Results.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  var pair = state.getIn(['vote', 'pair'])
  if (!pair) return {}
  return {
    pair: state.getIn(['vote', 'pair']).toJS(),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  }
}

const ResultsContainer = connect(mapStateToProps, actions)(
  CSSModules(Results, inlineStyles, { allowMultiple: true })
)

export default ResultsContainer
