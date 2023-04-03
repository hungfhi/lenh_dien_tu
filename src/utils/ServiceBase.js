/* eslint-disable default-case */

import Axios from "axios";
import _ from "lodash";
import Result from "./result";
import {settings} from 'configs';
import { $Token } from './token';


export default class ServiceBase {
  static async requestJson(opts) {
    let axiosResult = null;
    let result = null;
    const axiosRequestConfig = {
      baseURL: opts.baseUrl || settings?.ServiceAddress,
      timeout: 300000,
      headers: $Token.get('JWT_TOKEN') ? {
        'Content-Type': _.get(opts, 'contentType', 'application/json'),
        Authorization: 'Bearer ' +  $Token.get('JWT_TOKEN'),
        Accept: "application/json",
      } : {
        'Content-Type': _.get(opts, 'contentType', 'application/json'),
        Accept: "application/json",
      },

    };
    try {
      switch (opts.method) {
        case "GET":
          axiosResult = await Axios.get(opts.url, {
            ...axiosRequestConfig,
            params: opts.data,
          });
          break;
        case "POST":
          axiosResult = await Axios.post(
            opts.url,
            opts.data,
            axiosRequestConfig
          );
          break;
        case "PUT":
          axiosResult = await Axios.put(
            opts.url,
            opts.data,
            axiosRequestConfig
          );
          break;
        case "DELETE":
          axiosResult = await Axios.delete(opts.url, axiosRequestConfig);
          break;
        case "EXPORT":
          axiosResult = await Axios.get(`${opts.url}`, {
            ...axiosRequestConfig,
            responseType: 'blob',
            params: opts.data,
          });
          break;
  
      }
      result = new Result(axiosResult.data, null);
    } catch (error) {
      console.log("error", error)
      // if(error?.response?.status == 401) {
      //   window.location.href = "/sign-in";
      // }
      return error;
    }
    return result;
  }
}
