import React,{ useState, useEffect } from 'react';
import $axios from './axiosInstance';

export default function DataFetching(url, params) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await $axios(url, { params });
        setData(result.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url,params]);

  const handleNewRequest = async (url, params) => {
    const result = await $axios(url, { params });
    setData(result.data);
    console.log(result.data, 'ddresultdddd<><><><><>< service');
  };

  return { isLoading, data, isError, handleNewRequest };
}
