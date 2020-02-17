import axios from 'axios';

let axiosInstance = axios.create({});
axiosInstance.defaults.timeout = 10000;

axiosInstance.interceptors.request.use(function (config) {
    config.headers['x-user-token'] = 'da8546be123bf5822c03a4110223c736a7f8e9891a8f9e8ab689acf25aec9797';
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