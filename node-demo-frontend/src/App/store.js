import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Pages/Product/Store/productSliceData';
import loginReducer from '../Pages/Login/Store/loginSliceData';
import registerReducer from '../Pages/Register/Store/registerSliceData';
import snackBarSliceData from '../Components/Store/SnackBarSliceData';

export default configureStore({
  reducer: {
    product: productReducer,
    snackBar: snackBarSliceData,
    login: loginReducer,
    register: registerReducer,
  },
});
