import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Main from './Main';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBarExample from './AppBarExample'
injectTapEventPlugin();

const muiTheme = getMuiTheme({
	fontFamily: "Open Sans"
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Main />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);