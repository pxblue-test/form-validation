import React from 'react';
import { render } from 'react-dom';
import Cssbaseline from '@material-ui/core/CssBaseline';
import ValidationForm from './/ValidationForm'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import * as PXBThemes from '@pxblue/themes/react';
require('typeface-open-sans');

const App = () => (
  <MuiThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
    <Cssbaseline />
    <ValidationForm />
  </MuiThemeProvider>
)
render(<App />, document.getElementById('root'));