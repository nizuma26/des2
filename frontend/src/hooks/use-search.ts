import { useState } from 'react';
import { axiosPrivate } from '../api/axios';
import debounce from 'just-debounce-it';

interface useSearchProps {
  method?: 'GET' | 'POST';
  url: string;
  body?: object;
  delay?: number;
  minLength?: number;
}

interface PostRequest {
  url: string;
  data?: object;
}

interface GetRequest {
  url: string;
}

//`api/inventory/beginning-inventory/search_items/`
const post = async ({ url, data = {} }: PostRequest) => {
  const response = await axiosPrivate.post(url, { ...data });
  return response.data;
};

const get = async ({ url }: GetRequest) => {
  const response = await axiosPrivate.get(url);
  return response.data;
};

export const useSearch = ({ method = 'GET', url, body, delay=200,  minLength=1,}: useSearchProps) => {

  const [ data, setData ] = useState<Record<string, any>>([]);

  const [ hasError, setHasError ] = useState(false);

  const [ isLoading, setIsLoading ] = useState(false);

  const autocomplete = debounce(async ({ value }: { value:string | null }) => {

    if (value === null || value === '' || value?.length < minLength) return

    setIsLoading(true);

    try {

      if (method==='POST'){
        const newBody = {search:value, ...body}
        const result = await post({url, data: newBody})
        setData(result);
      }
      else {
        const result = await get({ url: `${url}?search=${value}` })
        setData(result);
      }
      if (hasError) setHasError(false);

    } catch (err) {
      setHasError(true);
      console.error(err)

    } finally {
      setIsLoading(false);
    }

  }, delay)

  return {
    data,
    isLoading,
    hasError,
    autocomplete,
    setData
  }
};
