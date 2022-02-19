import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { setSnackBarErrorMessage, setSnackBarSuccessMessage } from '../../../Components/Store/SnackBarSliceData';
import ConstantHelper from '../../../Helper/ConstantHelper';
import registerService from './registerService'


export function registerAPI({ payload }) {
    return (dispatch) =>
        trackPromise(
            registerService.registerAPI({ payload })
                .then((response) => {
                    try {
                        const { data } = response;
                        if (data?.status === false) {
                            dispatch(setSnackBarErrorMessage({ message: data?.msg.message }))
                            return data
                        } else {
                            dispatch(setRegisterSuccess(true))
                        }
                    } catch {
                        dispatch(setSnackBarErrorMessage({ message: ConstantHelper.somethingError }))
                    }

                }).catch(error => {
                    dispatch(setSnackBarErrorMessage({ message: error }))
                })
        )
}

export function registerSuccessChange({ status }) {
    return (dispatch) =>
        dispatch(setRegisterSuccess(status))
}



export const slice = createSlice({
    name: 'registerAPI',
    initialState: {
        registerSuccess: false,
    },
    reducers: {
        setRegisterSuccess: (state, action) => {
            state.registerSuccess = action.payload;
        },
    },
    extraReducers: {}
});

export const { setRegisterSuccess } = slice.actions;

export default slice.reducer;
