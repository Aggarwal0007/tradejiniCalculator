import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { closeAPPDialog, useAppDialog } from "state/AppConfigReducer";
import { useDispatch, useSelector } from "react-redux";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  
const AlertDialog = () => {

    const dispatch = useDispatch();
    const dialogState = useSelector(useAppDialog);
    console.log("dialogState :", dialogState);

    const handleClose = () => {
        dispatch(closeAPPDialog());
    };
    
    const onButtonClick = (actionCB: () => void) => {
        actionCB && actionCB();
        handleClose();
    };

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={"xs"}
                TransitionComponent={Transition}
                keepMounted
                open={dialogState.show}
                onClose={dialogState.isAllowEsc
                    ? handleClose
                    : () => {
                        return ""; 
                    }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogState.title ? dialogState.title : "Broker name"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/* Are you sure you want to logout now? */}
                        {dialogState.message}
                    </DialogContentText>
                </DialogContent>
                
                <DialogActions>
                    {dialogState.buttons.length ? 
                        dialogState.buttons.map((item, inx) => {
                            return <Button key={inx}
                                className={item.className}
                                sx={item.sx}
                                onClick={() => {
                                    return onButtonClick(item.action); 
                                }}
                            >
                                {item.name}
                            </Button>;
                        })
                        :
                        <Button onClick={handleClose} autoFocus> OK </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>

    );
};

export default AlertDialog;
