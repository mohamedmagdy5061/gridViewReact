import { useState, useEffect } from 'react';
import $axios from './axiosInstance';

export default function DataFetching(url) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    // const [url, setUrl] = useState('https://internal.fly365dev.com/rules/rule?page=1&orderBy=createdAt&order=desc&pageSize=50');

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await $axios(url);
        console.log(result,'><>result')
        setData(result.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { isLoading, data, isError }
}