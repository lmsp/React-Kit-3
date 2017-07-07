import React from 'react'
import PropTypes from 'prop-types'

import CSSModules from 'react-css-modules'
import inlineStyles from './Winner.css'

class Winner extends React.Component {
  render () {
    return (
      <div styleName='winner'>
        El ganador es {this.props.winner}!
      </div>
    )
  }
}

Winner.propTypes = {
  winner: PropTypes.string
}

Winner.defaultProps = {
  winner: ''
}

export default CSSModules(Winner, inlineStyles, { allowMultiple: true })
