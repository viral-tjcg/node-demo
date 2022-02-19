import React, { useEffect, useState } from 'react';
import { Alert, Fab, Snackbar, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackBarClose } from './Store/SnackBarSliceData';

function SnackBar(props) {
    const dispatch = useDispatch();
    const { snackbarMsg, displaySnackbar, isErrorSnackbar } = useSelector(state => state.snackBar)
    const [state, setState] = React.useState({
        openMsg: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, openMsg } = state;
    const [errorMsg, setErrorMsg] = useState('')
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        setIsError(isErrorSnackbar)
        setErrorMsg(snackbarMsg)
        setState({ openMsg: displaySnackbar, vertical: 'top', horizontal: 'center' });
    }, [displaySnackbar])
    const handleCloseMsg = () => { dispatch(setSnackBarClose()); setState({ ...state, openMsg: false }) };;

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={openMsg}
                onClose={handleCloseMsg}
                // message="I love snacks"
                key={vertical + horizontal}
            >
                <Alert severity={isError ? "error" : "success"}>{errorMsg}</Alert>
            </Snackbar>
        </>
    );
}
export default SnackBar;
