import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import FarmerImg from '../commons/imgs/farmer.png';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    maxWidth: '120%',
    maxHeight: '120%',
  },
});

function ComplexGrid(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={24}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} 

              alt="Marcus Zest" 
              src={FarmerImg} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="h6">Your farmer Marcus Zest will prepare:</Typography>
                <Typography gutterBottom variant="subtitle1"> 5 lbs of oranges </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="column">
              <Typography variant="h5"></Typography>
              <Typography variant="h5">ETH 0.06</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexGrid);