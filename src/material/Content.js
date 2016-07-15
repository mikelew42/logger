import React from 'react'
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: "18%",
  margin: "1%",
  textAlign: 'center',
  display: 'inline-block',
};

const PaperExampleSimple = () => (
  <div>
    <Paper style={style} zDepth={1}>H</Paper>
    <Paper style={style} zDepth={2} />
    <Paper style={style} zDepth={3}>Huh?</Paper>
    <Paper style={style} zDepth={4} />
    <Paper style={style} zDepth={5} />
  </div>
);

export default PaperExampleSimple;