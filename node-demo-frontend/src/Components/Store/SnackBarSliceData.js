import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import ConstantHelper from '../../Helper/ConstantHelper';

export function setSnackBarErrorMessage({ message }) {
    return (dispatch) =>
    dispatch(setErrorMsg(typeof message !== "string" ? ConstantHelper.somethingError : message))
}

export function setSnackBarSuccessMessage({ message }) {
    return (dispatch) =>
    dispatch(setSuccessMsg(typeof message !== "string" ? ConstantHelper.somethingError : message))
}

export function setSnackBarClose() {
    return (dispatch) =>
    dispatch(setSnackClose(false))
}

export const slice = createSlice({
    name: 'productPost',
    initialState: {
        displaySnackbar: false,
        snackbarMsg: '',
        isErrorSnackbar: false,
    },
    reducers: {
        setErrorMsg: (state, action) => {
            state.snackbarMsg = action.payload;
            state.displaySnackbar = true;
            state.isErrorSnackbar = true;
        },
        setSuccessMsg: (state, action) => {
            state.snackbarMsg = action.payload;
            state.displaySnackbar = true;
            state.isErrorSnackbar = false;
        },
        setSnackClose: (state, action) => {
            state.displaySnackbar = false;
        },
    },
    extraReducers: {}
});

export const { setErrorMsg, setSuccessMsg, setSnackClose } = slice.actions;

export default slice.reducer;
