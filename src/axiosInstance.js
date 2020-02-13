import axios from 'axios';

let axiosInstance = axios.create({});
axiosInstance.defaults.timeout = 10000;

axiosInstance.interceptors.request.use(function (config) {
    config.headers['x-user-token'] = 'GZfec57a46a3e7dc3c0f1888f223509f6d9vjE';
    config.headers['authorization'] = '4jzthfsrmK9rhgKTr5XkEjeEcZ7kf9eA';
    return config;
});


axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
         console.log(error.response)
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;