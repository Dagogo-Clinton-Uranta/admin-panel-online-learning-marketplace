import axios from 'axios';
import { useState } from 'react';


export default ({ externalUrl, url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const doRequest = async (props = {}) => {
    try {
      setLoading(true);
      setErrors(null);
      const response = await axios[method](
        externalUrl ? externalUrl : process.env.REACT_APP_SERVER + `/api/application${url}`,
        { ...body, ...props },
        { withCredentials: true },
        { timeout: 2000 }
      );
      if (onSuccess) {
        onSuccess(response.data);
      }
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setErrors(err);
    }
  };

  const doRequest2 = async (props = {}) => {
    try {
      setLoading(true);
      setErrors(null);
      const response = await axios[method](
        externalUrl ? externalUrl : process.env.REACT_APP_SERVER + `/api/application${url}`,
        { ...body, ...props },
        { withCredentials: true },
        { timeout: 2000 }
      );

      if (onSuccess) {
        onSuccess(response.data);
      }
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setErrors(err);
    }
  };

  const doRequestSync = (props = {}) => {
    try {
      setLoading(true);
      setErrors(null);
      const response = axios[method](
        externalUrl ? externalUrl : process.env.REACT_APP_SERVER + `/api/application${url}`,
        { ...body, ...props },
        { withCredentials: true },
        { timeout: 2000 }
      );
      if (onSuccess) {
        onSuccess(response.data);
      }
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setErrors(err);
    }
  };
  return { doRequest, doRequest2, doRequestSync, errors, loading };
};
