import axios from 'axios';
import UrlHelper from '../../../Helper/UrlHelper';

class productService {

    getProductData = ({ id }) => {
        return new Promise((resolve, reject) => {
            const request = axios.get(UrlHelper.getProduct)
            request.then((response) => {

                const { data, status } = response;
                if (status == 200) {
                    resolve({ data });
                }
                else if (status == 401) {
                    // 
                }
                else {
                    reject({ message: 'Error in retrive Data' });
                }
            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };

    addProductData = ({ payload }) => {
        return new Promise((resolve, reject) => {
            const request = axios.post(UrlHelper.createProduct, payload)
            request.then((response) => {
                console.log('response:::', response)
                const { data, status } = response;
                if (status == 200) {
                    resolve({ data });
                }
                else if (status == 401) {
                    reject({ message: 'Invalid access' });
                } else {
                    reject({ message: 'Error in retrive Data' });
                }

            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };

    editProductData = ({ payload }) => {
        return new Promise((resolve, reject) => {
            const request = axios.post(UrlHelper.updateProduct, payload)
            request.then((response) => {
                console.log('response:::', response)
                const { data, status } = response;
                if (status == 200) {
                    resolve({ data });
                }
                else if (status == 401) {
                    reject({ message: 'Invalid access' });
                } else {
                    reject({ message: 'Error in retrive Data' });
                }

            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };

    deleteProductData = ({ id }) => {
        return new Promise((resolve, reject) => {
            const request = axios.post(UrlHelper.deleteProduct
                , {
                    id: id,
                }
            )
            request.then((response) => {
                const { data, status } = response;
                if (status == 200) {
                    resolve({ data });
                }
                else if (status == 401) {
                    reject({ message: 'Invalid access' });
                } else {
                    reject({ message: 'Error in retrive Data' });
                }

            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };

}

const service = new productService();
export default service;
