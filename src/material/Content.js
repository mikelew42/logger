var React = require('react');
var Paper = require('material-ui/Paper').default;
var e = React.createElement.bind(React);

var style = {
  height: 100,
  width: "18%",
  margin: "1%",
  textAlign: 'center',
  display: 'inline-block',
};

var PaperExampleSimple = function(){
  return e("div", {}, 
    e(Paper, {style: style, zDepth: 1}, "w"),
    e(Paper, {style: style, zDepth: 2}, "t"),
    e(Paper, {style: style, zDepth: 3}, "f"),
    e(Paper, {style: style, zDepth: 4}),
    e(Paper, {style: style, zDepth: 5})
  );
};

module.exports = PaperExampleSimple;