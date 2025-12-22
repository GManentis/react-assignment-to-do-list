import * as React from 'react';
import { IconButton,  Snackbar, SnackbarCloseReason } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
interface MySnackbarProps {
    snackBarMsg: string|null 
    snackBarOpen: boolean, 
    setSnackBarOpen: any
}


export default function MySnackbar({snackBarMsg, snackBarOpen, setSnackBarOpen} : MySnackbarProps) {

    const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    };

      const action = (
        <React.Fragment>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={snackBarOpen}
            autoHideDuration={5000}
            onClose={handleClose}
            message={snackBarMsg}
            action={action}
            anchorOrigin={{vertical:"top", horizontal:"center"}}
        />
    );

}