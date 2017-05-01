/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'

// Estilos locales
import inlineStyles from './index.css'

// Estilos globales
import styles from './index.global.css'

// Colores utilizados en la aplicación que definen el tema de Material Design
import {
  cyan800,
  cyan900,
  blueGrey100,
  blueGrey500,
  grey800,
  grey300,
  lightBlack,
  red300,
  white
} from 'material-ui/styles/colors'
import {fade} from 'material-ui/utils/colorManipulator'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './app.js'

// Se necesita para onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// Paleta de colores del tema Material Design
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan800,
    primary2Color: cyan900,
    primary3Color: lightBlack,
    accent1Color: red300,
    accent2Color: blueGrey100,
    accent3Color: blueGrey500,
    textColor: grey800,
    alternateTextColor: white,
    canvasColor: grey300,
    borderColor: grey300,
    disabledColor: fade(grey800, 0.3),
    pickerHeaderColor: cyan800
  }
})

const title =
  'React con las características de React-Kit-2 más las tecnologías indicadas'

// Esta función sirve sólo como ejemplo para probar flow
function createDivId (a: string, b: string, c: string) {
  return a + b + c
}

class AppComponent extends React.Component {
  // className utiliza lso estilos globales
  // styleName utiliza los estilos locales
  render () {
    return (
      <div>
        <div className={styles.index} styleName='index import'>{title}</div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <App />
        </MuiThemeProvider>
      </div>
    )
  }
}

// La variable allowMultiple permite defnir multiples estilos en styleName
ReactDOM.render(
  React.createElement(
    CSSModules(AppComponent, inlineStyles, {allowMultiple: true})
  ),
  document.getElementById(createDivId('a', 'p', 'p'))
)

module.hot.accept()
