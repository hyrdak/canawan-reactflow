import axios, { AxiosResponse } from 'axios'
import { LOCAL_STORAGE_KEY, ROUTE_PATHS } from 'constants-es';
import { LocalStoreKey } from 'constants-es/local-store';

import { message } from 'antd';
import { isEmpty } from 'lodash';

import { getAuth, setAuth } from 'helpers/auth';
import { getLocalStore } from 'helpers/local-store';
import refreshToken from 'modules/auth/data/queries/use-mutation-refresh-token/fetch';

import ChangeCase from './change-case'


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
 
  // timeout: 20000,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'apikey': process.env.REACT_APP_API_KEY,
  
  },
})

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status > 300 || response.status < 200) {
      const newResponse:any =  {
        ...response,
        data:{
          data:null,
          status: response.status,
          message:response.data.error_description || response.data.msg,
          error:response.data.error ||  response.data,
          success: false
        }
      }
      
      return Promise.reject(
        new Error(ChangeCase.object.toCamelCase(newResponse)),
      )
    }
    const newResponse:AxiosResponse =  {
      ...response,
      data:{
        data:response.data,
        status: response.status,
        message:"Request Success" ,
        error:null,
        success: true
      }
    }
   
    
    return ChangeCase.object.toCamelCase(newResponse)
  },
  
)

export default axiosInstance