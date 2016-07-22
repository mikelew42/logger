var React = require('react');
var AppBarExample = require('./AppBarExample');
var Content = require('./Content');

var Main = function(){
	return React.createElement("div", {},
		React.createElement(AppBarExample),
		React.createElement(Content)
	);
};

module.exports = Main;