import React from 'react'
import CSSModules from 'react-css-modules'
import inlineStyles from './FooterList.css'

import {Grid, Row, Cell} from 'react-inline-grid'
import ReactTooltip from 'react-tooltip'

import Chip from 'material-ui/Chip'

const muiStyles = {
  chip: {
    margin: 4,
    display: 'inline-block'
  },
  chipLabel: {
    fontWeight: 'bold'
  }
}

class FooterList extends React.Component {
  constructor (props) {
    super(props)

    this.onTouchTap = this.onTouchTap.bind(this)
    this.state = {
      chips: [
        {
          name: 'React-Kit-2',
          url: 'https://github.com/lmsp/React-Kit-2',
          tooltip: 'React con las características de React-Kit-1 más PostCSS, react-css-modules, Material Design, stylelint ...'
        }
      ]
    }
  }

  onTouchTap (value) {
    window.open(value, '_blank')
  }

  render () {
    return (
      <div>
        <div styleName='footerTitle'>Tecnologías probadas</div>
        <ReactTooltip effect='solid' />
        <Grid>
          <Row is='center'>
            <Cell is='middle 4'>
              {this.state.chips.map(chip => {
                return (
                  <Chip
                    key={chip.name}
                    data-tip={chip.tooltip}
                    style={muiStyles.chip}
                    labelStyle={muiStyles.chipLabel}
                    onTouchTap={() => {
                      this.onTouchTap(chip.url)
                    }}
                  >
                    {chip.name}
                  </Chip>
                )
              })}
            </Cell>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default CSSModules(FooterList, inlineStyles, {allowMultiple: true})
