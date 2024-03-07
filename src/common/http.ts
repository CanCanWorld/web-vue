import axios, {AxiosRequestConfig} from "axios"
import {Data} from "../type/base.ts";

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
});

export const http = <T>(options: AxiosRequestConfig) => {
    return new Promise<Data<T>>((resolve, reject) => {
        instance.request({
            ...options,
        }).then((res) => {
            const data = res.data as Data<T>
            console.log(data.data)
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}