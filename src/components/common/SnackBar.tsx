import { hideSnackBar, useSnackBar } from "state/AppConfigReducer";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = () => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideSnackBar());
    };
    const snackBarState = useSelector(useSnackBar);
    console.log("SnackBar :", snackBarState);

    return (
        <div className="">
            <Snackbar open={snackBarState.show} autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleClose} 
                    severity={snackBarState.status} 
                    sx={{ width: "100%" }} 
                    className="snack-message">
                    {snackBarState.message}
                </Alert>
            </Snackbar>
        </div>
    );
};


export default SnackBar;
