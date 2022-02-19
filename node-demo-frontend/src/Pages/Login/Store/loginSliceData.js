import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { setSnackBarErrorMessage, setSnackBarSuccessMessage } from '../../../Components/Store/SnackBarSliceData';
import loginService from './loginService'


export function loginAPI({ payload }) {
    return (dispatch) =>
        trackPromise(
            loginService.loginAPI({ payload })
                .then((response) => {
                    const { data } = response;
                    if(data?.status === false ) {
                        dispatch(setSnackBarErrorMessage({ message: data.msg }))
                    } else {
                        dispatch(setLoginSuccess(true))
                    }
                    return data
                }).catch(error => {
                    dispatch(setSnackBarErrorMessage({ message: error }))
                })
        )
}

export function loginSuccessChange({ status }) {
    return (dispatch) =>
    dispatch(setLoginSuccess(status))
}

export const slice = createSlice({
    name: 'loginAPI',
    initialState: {
        loginSuccess: false,
    },
    reducers: {
        setLoginSuccess: (state, action) => {
            state.loginSuccess = action.payload;
        },
    },
    extraReducers: {}
});

export const { setLoginSuccess } = slice.actions;
export default slice.reducer;
