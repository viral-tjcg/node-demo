import axios from 'axios';
import UrlHelper from '../../../Helper/UrlHelper';

class registerService {

    registerAPI = ({ payload }) => {
        return new Promise((resolve, reject) => {
            const request = axios.post(UrlHelper.register, payload)
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
}

const service = new registerService();
export default service;
