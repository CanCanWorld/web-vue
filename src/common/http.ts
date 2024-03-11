import axios, {AxiosRequestConfig} from "axios"
import {Data} from "../type/base.ts";
import {ref} from "vue";
import {message} from "ant-design-vue";

export const openLogin = ref<boolean>(false)

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
});

export const http = <T>(options: AxiosRequestConfig) => {
    const hide = message.loading('Action in progress..', 0)
    return new Promise<Data<T>>((resolve, reject) => {
        instance.request({
            ...options,
        }).then((res) => {
            const data = res.data as Data<T>
            if (data.status == 404 || data.status == 403 || data.status == 401) {
                openLogin.value = true;
            }
            console.log(data.data)
            resolve(data)
        }).catch(err => {
            message.error(err.message);
            reject(err)
        }).finally(() => {
            hide()
        })
    })
}