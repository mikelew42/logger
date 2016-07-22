var React = require('react');
var AppBar = require('material-ui/AppBar').default;

var AppBarExampleIcon = function(){
	return React.createElement(AppBar, {
		title: "Title",
		titleStyle: { 
			textTransform: "uppercase",
			fontWeight: "800"
		},
		iconClassNameRight: "muidocs-icon-navigation-expand-more"
	});
};

module.exports = AppBarExampleIcon;