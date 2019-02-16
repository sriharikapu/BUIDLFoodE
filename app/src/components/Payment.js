import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      textAlign: 'center',
      padding: 50
    },
});

function Payment(props) {
const { classes } = props;
return (
    <div className={classes.root}>
    <h1> this is my component area</h1>
    </div>
);
}

Payment.propTypes = {
classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Payment);