import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//image imports
import PortisImg from '../commons/imgs/portis.png';
import ShapeshiftImg from '../commons/imgs/shapeshift.png';
import WyreImg from '../commons/imgs/wyre.png';

//blockchain imports
import Portis from '@portis/web3';
import Web3 from 'web3';
// ------------------------------------
// Definitions and initializations
// TODO: this should not be hardcoded
// ------------------------------------
const portis = new Portis("8979ee0a-562d-413e-b83f-915f682cfa1b", "rinkeby", { scope: ["email"]  });  
const web3 = new Web3(portis.provider);

const CT_USER_ADDRESS = "USER_ADDRESS";
const CT_FARMER_ADDRESS = "FARMER_ADDRESS";
const CT_PORTIS_IMG_TITLE = "Debit card or ETH";
const CT_WYRE_IMG_TITLE = "ACH bank transfer";

// TODO: this should not be hardcoded
// TODO: do not use localStorage
localStorage.setItem(CT_USER_ADDRESS, null);
localStorage.setItem(CT_FARMER_ADDRESS, "0x46e4d671d7d149fe8d4ea434e69b186327efa21a");

// ------------------------------------
// Functions
// ------------------------------------
// TODO: stuff should not be hardcoded
// TODO: do not use localStorage
function ShowBalance() {

  let ab = document.getElementById("account-balance");
  if(ab === null) {
    return;
  }

  ab.innerHTML = "Account balance: 0 ETH";

  if(web3 === null) {
    return;
  }
  let add = localStorage.getItem(CT_USER_ADDRESS);
  if(add === "null") {
    ab.innerHTML =
      "Account balance: 0 ETH (Please select your payment method)";
    return;
  }
  web3.eth.getBalance(add, 'pending').then((result) => {
  var resultInWei = parseFloat(web3.utils.fromWei(result, 'ether'));
  
  ab.innerHTML =
    "Account balance: " +
    resultInWei.toFixed(4) + " ETH";});

    ab.style.color = "black";

}
ShowBalance();

function ShowTransaction(receipt) {
  let ts = document.getElementById("transaction-status");
  if(ts === null) {
    return;
  }

  ts.innerHTML = "This is your receipt: " + receipt;
  web3.eth.getTransaction(receipt, (error, output) => {
    if (error) {
      console.error(error);
    }
    else {
      // TODO: this should not be hardcoded
      ts.innerHTML = "Success! You just paid Marcus (at: " + localStorage.getItem(CT_FARMER_ADDRESS) + " , receipt: " + receipt + ").";
    }
  });
}

function SendPayment() {
  if(web3 == null) {
    return;
  }

  if(localStorage.getItem(CT_USER_ADDRESS) === "null") {
    let ab = document.getElementById("account-balance");
    if(ab === null) {
      return;
    }
    else {
      ab.style.color = "red";
    } 
    return;
  }

  if(localStorage.getItem(CT_FARMER_ADDRESS) === "null") {
    return;
  }

  var handleReceipt = (error, receipt) => {
    if (error) {
      console.error(error);
    }
    else {
      ShowBalance();
      ShowTransaction(receipt);
    }
  }

  web3.eth.sendTransaction({
    from: localStorage.getItem(CT_USER_ADDRESS),
    to: localStorage.getItem(CT_FARMER_ADDRESS),
    value: 60000000000000000
}, handleReceipt);
}

function openPaymentOptions(title){
  if (title === CT_PORTIS_IMG_TITLE){
    isWyre = false;
    portis.showPortis();
  
  } else if(title === CT_WYRE_IMG_TITLE) { 
    isWyre = true;
    portis.showPortis();
  } else {
    isWyre = false;
  }
  
};

var isWyre = false;
portis.onLogin((walletAddress, email) => {
  console.log(walletAddress, email);
  // generate a device token if it hasn't been already
  // var deviceToken = localStorage.getItem("DEVICE_TOKEN");
  // if(!deviceToken) {
  //   var array = new Uint8Array(25);
  //   window.crypto.getRandomValues(array);
  //   deviceToken = Array.prototype.map.call(array, x => ("00" + x.toString(16)).slice(-2)).join('');
  //   localStorage.setItem("DEVICE_TOKEN", deviceToken);
  // }
  
  if(isWyre) {
    var array = new Uint8Array(25);
    window.crypto.getRandomValues(array);
    var deviceToken = Array.prototype.map.call(array, x => ("00" + x.toString(16)).slice(-2)).join('');
    localStorage.setItem("DEVICE_TOKEN", deviceToken);

    // configure the widget to authenticate using the generated key
    var widget = new window.Wyre.Widget({
      env: "test",
      accountId: "AC_EW2EMUAL3XR",
      auth: { 
        type: "secretKey",
        secretKey: deviceToken
      },
      operation: {
        type: "onramp",
        destCurrency: "ETH",
        dest: "ethereum:" + walletAddress
      }
    });
    widget.open();
  }

  localStorage.setItem(CT_USER_ADDRESS, walletAddress);
  ShowBalance();
});

// ------------------------------------
// Good looks
// ------------------------------------
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
    title: CT_PORTIS_IMG_TITLE,
    width: '25%',
  },
  {
    url: WyreImg,
    title: CT_WYRE_IMG_TITLE,
    width: '25%',
  },
  {
    url: ShapeshiftImg,
    title: 'Shapeshift',
    width: '25%'
  }
];

// ------------------------------------
// Layout
// ------------------------------------
function Main(props) {
  const { classes } = props;
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <p>Please select your payment method:</p>
               {images.map(image => (
                <ButtonBase
                  focusRipple
                  key={image.title}
                  className={classes.image}
                  focusVisibleClassName={classes.focusVisible}
                  style={{
                    width: image.width,
                  }}
                  onClick={(e) => openPaymentOptions(image.title)}
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
    
              {/* <Grid item xs={10}>
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
              </Grid> */}

                <p id="account-balance">Account balance: 0 ETH (Please select your payment method)</p>
                <Button 
                variant="contained" 
                color="primary" 
                onClick={() => {SendPayment();}} >Send payment</Button>                    
                <p id="transaction-status"></p>
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