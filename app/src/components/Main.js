import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
//image imports
import PortisImg from '../commons/imgs/portis.png';
import ShapeshiftImg from '../commons/imgs/shapeshift.png';

//blockchain imports
import Portis from '@portis/web3';
import Web3 from 'web3';
 
//KeepKey imports
//import { KeepKeyManager, KeepKey, WebUSBDevice, Messages, Types, messageTypeRegistry } from '@keepkey/keepkey.js';
//import KeepKey from '@keepkey/keepkey.js/dist/lib/keepkey'
//import WebUSBDevice from '@keepkey/keepkey.js/dist/lib/webUSBDevice'

const portis = new Portis("8979ee0a-562d-413e-b83f-915f682cfa1b", "rinkeby", { scope: ["email"]  });  
const web3 = new Web3(portis.provider);

portis.onLogin((walletAddress, email) => {
  window.handler.open();
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    position: 'relative',
    height: 80,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },

});

const images = [
  {
    url: PortisImg,
    title: 'Portis',
    width: '25%',
  },
  {
    url: ShapeshiftImg,
    title: 'Shapeshift',
    width: '25%',
  },
];

function openPortis(title){
  if (title === 'Portis'){

    console.log('Portis payment was selected');
    portis.showPortis();
  
  } else {

    console.log('KeepKey payment was selected');
    //sniped of code trying towork with keepkey
    // await WebUSBDevice.requestPair() // Prompt the user to pair a KeepKey
    // const keepkeyManager = new KeepKeyManager({
    //   onConnectCallback: (deviceID) => console.log('device was connected!'), // These callbacks only work with webUSB at the moment
    //   onDisconnectCallback: (deviceID) => console.log('device was disconnected!') 
    // })
    // await keepkeyManager.initializeWebUSBDevices()
    // // Ping all connected devices with a TEST message
    // const pingsByDeviceID = keepkeyManager.exec('ping', { message: 'TEST' })
    // // { "YOUR-DEVICE-ID": "TEST" }

    // // Get the KeepKey for the first deviceID in the manager
    // const keepkey = manager.get()
    // // all public keepkey methods return promises
    // const { message } = await keepkey.ping({ message: 'TEST' }) 
    // keepkey.ping({ message: 'TEST' }).then(response => console.log(response.message))
    };
  
};

function Main(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
           {images.map(image => (
            <ButtonBase
              focusRipple
              key={image.title}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: image.width,
              }}
              onClick={(e) => openPortis(image.title)}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          ))}

          <Grid item xs={10}>
            <Paper className={classes.paper} 
                style={{
                  position: 'float',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                xs=10
            </Paper>
          </Grid>
          
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);