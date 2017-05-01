import React from 'react'
import CSSModules from 'react-css-modules'
import inlineStyles from './UserAndPassword.css'

import {Grid, Row} from 'react-inline-grid'

import {grey800} from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

const muiStyles = {
  underlineStyle: {
    borderColor: grey800
  },
  buttonLabel: {
    textTransform: 'none',
    top: '-3px'
  }
}

class UserAndPassword extends React.Component {
  render () {
    return (
      <div styleName='userAndPassword'>
        <Grid>
          <Row is='center'>
            <Paper
              styleName='paper'
              zDepth={3}
              children={
                <div>
                  <TextField
                    styleName='inputField'
                    underlineStyle={muiStyles.underlineStyle}
                    hintText='Usuario'
                    floatingLabelText='Usuario'
                  />
                  <TextField
                    styleName='inputField'
                    underlineStyle={muiStyles.underlineStyle}
                    hintText='Contraseña'
                    floatingLabelText='Contraseña'
                  />
                  <RaisedButton
                    styleName='loginButton'
                    labelStyle={muiStyles.buttonLabel}
                    label='Iniciar sesión'
                  />
                </div>
              }
            />
          </Row>
        </Grid>
      </div>
    )
  }
}

export default CSSModules(UserAndPassword, inlineStyles, {allowMultiple: true})
