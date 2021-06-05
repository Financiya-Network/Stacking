import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { CircularProgress, TextField } from "@material-ui/core";
import CustomButton from "../Buttons/CustomButton";
import { formatCurrency, fromWei } from "../../utils/helper";
import BigNumber from "bignumber.js";
import { connect } from "react-redux";
import {
  getPoolInfo,
  stakeTokens,
  unstakeTokens,
} from "../../actions/stakeActions";
import { getAccountBalance } from "../../actions/accountActions";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "#121827",
    color: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 450,
    height: 400,
    [theme.breakpoints.down("sm")]: {
      width: 320,
      height: 350,
    },
  },
  heading: {
    fontSize: 24,
    fontWeight: 400,
    color: "#919191",
  },
  subheading: {
    fontSize: 18,
    fontWeight: 400,
    color: "#919191",
  },
  inputGroup: {
    marginTop: 40,
  },
  input: {
    "& label.Mui-focused": {
      color: "#616161",
    },
    width: 200,
    height: 50,
  },
  cssInputLabel: {
    color: "#616161",
  },
  cssInputFocused: {},
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `#616161 !important`,
    },
  },
  cssFocused: {
    color: "#f1f1f1",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#616161 !important",
  },
  inputText: {
    color: "#f8f8f8",
  },
  maxBtn: {
    backgroundColor: "rgba(224, 7, 125, 0.9)",
    height: 50,
    borderRadius: 10,
    marginLeft: 20,
    color: "#f9f9f9",
    "&:hover": {
      background: "rgba(224, 7, 125, 0.7)",
    },
  },
  buttons: {
    marginTop: 60,
    marginBottom: 20,
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
      marginBottom: 5,
    },
  },
  numbers: {
    color: "#E0077D",
    fontSize: 26,
  },
  error: {
    paddingTop: 20,
  },
}));

const StakeDialog = ({
  account: { currentAccount, balance, loading },
  stake: { stakeData, approved, poolLoading },
  stakeTokens,
  unstakeTokens,
  getAccountBalance,
  getPoolInfo,
  open,
  handleClose,
  type,
}) => {
  const classes = useStyles();
  const [pbrTokens, setTokenValue] = useState("0");
  const [error, setError] = useState({ status: false, message: "" });

  const handleInputChange = (e) => {
    setTokenValue(e.target.value);
  };

  const onConfirm = async () => {
    const enteredTokens = pbrTokens;
    const stakedTokens = parseFloat(fromWei(stakeData.amount));
    const balanceTokens = parseFloat(fromWei(balance));

    if (
      type !== "stake" &&
      (enteredTokens <= 0 || enteredTokens > stakedTokens)
    ) {
      setError({
        status: true,
        message: "Invalid amount to Withdraw!",
      });
      return;
    }

    if (
      type === "stake" &&
      (enteredTokens <= 0 || enteredTokens > balanceTokens)
    ) {
      setError({
        status: true,
        message: "Invalid amount to Stake!",
      });
      return;
    }
    setError({});
    if (type === "stake") {
      await stakeTokens(pbrTokens, currentAccount);
    } else {
      await unstakeTokens(pbrTokens, currentAccount);
    }
    await getPoolInfo();
    await getAccountBalance();
    handleClose();
  };

  const handleMax = () => {
    if (type === "stake") {
      setTokenValue(fromWei(balance));
    } else {
      setTokenValue(fromWei(stakeData.amount));
    }
  };

  const onClose = () => {
    handleClose();
    setTokenValue(null);
    setError({});
  };

  return (
    <div>
      <Dialog
        // onClose={onClose}
        onExited={onClose}
        open={open}
        disableBackdropClick
        className={classes.dialog}
        color="transparent"
        disableRestoreFocus={true}
        PaperProps={{
          style: { borderRadius: 15 },
        }}
      >
        <div className={classes.background}>
          <DialogTitle onClose={handleClose}>
            <span className={classes.heading}>
              {type === "stake" ? "Stake tokens" : "Withdraw tokens"}
            </span>
          </DialogTitle>

          <p className={classes.subheading}>
            {type === "stake"
              ? `Avaialable tokens: ${formatCurrency(fromWei(balance))} $PBR`
              : `Staked tokens: ${formatCurrency(
                  fromWei(stakeData.amount)
                )} $PBR`}
          </p>
          <div className={classes.inputGroup}>
            <TextField
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.cssInputLabel,
                  focused: classes.cssInputFocused,
                },
              }}
              className={classes.input}
              id="outlined-basic"
              variant="outlined"
              placeholder="0"
              value={pbrTokens}
              // name={[pbrTokens]}
              onChange={handleInputChange}
              label="Enter PBR tokens"
              focused={true}
            />
            <Button className={classes.maxBtn} onClick={handleMax}>
              Max
            </Button>
          </div>
          {error.status ? (
            <span className={classes.error}>{error.message}</span>
          ) : (
            ""
          )}
          <div className={classes.buttons}>
            {loading ? (
              <CircularProgress className={classes.numbers} />
            ) : (
              <>
                <CustomButton variant="light" onClick={onClose}>
                  Cancel
                </CustomButton>
                <CustomButton onClick={onConfirm}>
                  <p>Confirm</p>
                </CustomButton>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stake: state.stake,
  account: state.account,
});

export default connect(mapStateToProps, {
  stakeTokens,
  unstakeTokens,
  getAccountBalance,
  getPoolInfo,
})(StakeDialog);
