import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { setSnackBarErrorMessage, setSnackBarSuccessMessage } from '../../../Components/Store/SnackBarSliceData';
import productService from './productService'

export function getProductData({ id }) {
    return (dispatch) =>
        trackPromise(
            productService.getProductData({ id })
                .then((response) => {
                    const { data } = response;
                    dispatch(setProductData(data))
                    return data
                }).catch(error => {
                    dispatch(setProductData([]))
                })
        )
}

export function addProductData({ payload }) {
    return (dispatch) =>
        trackPromise(
            productService.addProductData({ payload })
                .then((response) => {
                    const { data } = response;
                    dispatch(getProductData({ id: null }))
                    dispatch(setProductModal(false))
                    dispatch(setSnackBarSuccessMessage({ message: "Product added successfully" }))
                    return data
                }).catch(error => {
                    dispatch(setSnackBarErrorMessage({ message: error }))
                })
        )
}

export function editOneProductData({ payload }) {
    return (dispatch) =>
        trackPromise(
            productService.editProductData({ payload })
                .then((response) => {
                    const { data } = response;
                    dispatch(getProductData({ id: null }))
                    dispatch(setProductModal(false))
                    dispatch(setEditProduct([]))
                    dispatch(setSnackBarSuccessMessage({ message: "Product update successfully" }))
                    return data
                }).catch(error => {
                    dispatch(setSnackBarErrorMessage({ message: error }))
                })
        )
}

export function setProductModalClose() {
    return (dispatch) => {
        dispatch(setEditProduct([]))
        dispatch(setProductModal(false))
    }

}

export function setProductModalOpen() {
    return (dispatch) =>
        dispatch(setProductModal(true))
}

export function setEditProductData({ data }) {
    return (dispatch) => {
        dispatch(setEditProduct(data))
        dispatch(setProductModal(true))
    }
}

export function deleteProductData({ id }) {
    return (dispatch) =>
        trackPromise(
            productService.deleteProductData({ id })
                .then((response) => {
                    const { data } = response;
                    dispatch(getProductData({ id: null }))
                    dispatch(setProductModal(false))
                    dispatch(setSnackBarSuccessMessage({ message: "Product delete successfully" }))
                    return data
                }).catch(error => {
                    dispatch(setSnackBarErrorMessage({ message: error }))
                })
        )
}

export const slice = createSlice({
    name: 'productPost',
    initialState: {
        productData: [],
        productLoader: false,
        fetchStatus: false,
        productModal: false,
        editProductData: []
    },
    reducers: {
        setProductData: (state, action) => {
            state.productData = action.payload;
            state.fetchStatus = false;
        },
        setAuthorDetails: (state, action) => {
            state.authorDetailsData = action.payload;
            state.fetchStatus = true;
        },
        setProductModal: (state, action) => {
            state.productModal = action.payload;
        },
        setEditProduct: (state, action) => {
            state.editProductData = action.payload;
        }
    },
    extraReducers: {}
});

export const { setResetAuthorDetails, setLikesData, setPostDetails, setProductData, setAuthorDetails, setCommentsData, setProductModal, setEditProduct } = slice.actions;

export default slice.reducer;
