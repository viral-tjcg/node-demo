import axios from 'axios';
import UrlHelper from '../../../Helper/UrlHelper';

class loginService {

    loginAPI = ({ payload }) => {
        return new Promise((resolve, reject) => {
            const request = axios.post(UrlHelper.login, payload)
            request.then((response) => {

                const { data, status } = response;
                if (status == 200) {
                    resolve({ data });
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

const service = new loginService();
export default service;
