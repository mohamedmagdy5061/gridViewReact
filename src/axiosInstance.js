import axios from 'axios';

let axiosInstance = axios.create({});
axiosInstance.defaults.timeout = 10000;

axiosInstance.interceptors.request.use(function (config) {
    config.headers['x-user-token'] = 'e82b3cde11c2e7353496e0f1a662d9f9a7f8e9891a8f9e8ab689acf25aec9797';
    config.headers['authorization'] = '4jzthfsrmK9rhgKTr5XkEjeEcZ7kf9eA';
    return config;
});


axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
        //  console.log(error.response)
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;