var React = require('react');
var ReactDOM = require('react-dom');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
var Main = require('./Main');
var injectTapEventPlugin = require('react-tap-event-plugin');
var AppBarExample = require('./AppBarExample');
injectTapEventPlugin();

var muiTheme = getMuiTheme({
	fontFamily: "Open Sans"
});

var App = function(){
	return React.createElement(MuiThemeProvider, { muiTheme: muiTheme }, 
		React.createElement(Main)
	);
};

ReactDOM.render(
  React.createElement(App),
  document.getElementById('app')
);