import React from 'react'

import CSSModules from 'react-css-modules'
import classNames from 'classnames'

// Estilos globales
import styles from './index.global.css'

// Estilos locales
import inlineStyles from './index.css'

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
import { fade } from 'material-ui/utils/colorManipulator'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import ConnectionStateContainer from './components/ConnectionState'

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

class App extends React.Component {
  // className utiliza los estilos globales
  // styleName utiliza los estilos locales
  render () {
    var titleClassCondition = true

    var titleClass = classNames({
      index: true,
      import: titleClassCondition,
      otherStyle: !titleClassCondition
    })

    return (
      <div>
        <div className={styles.index} styleName={titleClass}>{title}</div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <ConnectionStateContainer />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default CSSModules(App, inlineStyles, {
  allowMultiple: true
})
