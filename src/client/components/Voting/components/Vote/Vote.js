import React from 'react'
import PropTypes from 'prop-types'

import CSSModules from 'react-css-modules'
import inlineStyles from './Vote.css'
import classNames from 'classnames'

import RaisedButton from 'material-ui/RaisedButton'

const muiStyles = {
  buttonLabel: {
    textTransform: 'none',
    top: '-3px'
  }
}

class Vote extends React.PureComponent {
  getPair () {
    return this.props.pair || []
  }
  isDisabled () {
    return this.props.hasVoted !== ''
  }
  hasVotedFor (entry) {
    return this.props.hasVoted === entry
  }
  render () {
    return (
      <div>
        <div styleName='voting'>
          {this.getPair().map(entry =>
            <button
              key={entry}
              styleName={classNames({ voted: this.hasVotedFor(entry) })}
              disabled={this.isDisabled()}
              onClick={() => this.props.vote(entry)}
            >
              <h1>{entry}</h1>
              {this.hasVotedFor(entry)
                ? <div styleName='label'>Votado</div>
                : null}
            </button>
          )}
        </div>
        <div styleName='buttons'>
          <RaisedButton
            styleName='buttonStyle'
            labelStyle={muiStyles.buttonLabel}
            label='Inicio'
            onClick={() => this.props.onRedirectToLogin()}
          />
          <RaisedButton
            styleName='buttonStyle'
            labelStyle={muiStyles.buttonLabel}
            label='Ir a resultados'
            onClick={() => this.props.onRedirectToResults()}
          />
        </div>
      </div>
    )
  }
}

Vote.propTypes = {
  hasVoted: PropTypes.string,
  pair: PropTypes.array,
  vote: PropTypes.func,
  onRedirectToLogin: PropTypes.func,
  onRedirectToResults: PropTypes.func
}

Vote.defaultProps = {
  hasVoted: '',
  pair: []
}

export default CSSModules(Vote, inlineStyles, { allowMultiple: true })
