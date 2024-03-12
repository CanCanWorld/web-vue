import axios, {AxiosRequestConfig} from "axios"
import {Data} from "../type/base.ts";
import {ref} from "vue";
import {message} from "ant-design-vue";
import {Keys} from "./constants.ts";

export const openLogin = ref<boolean>(false)

const instance = axios.create({
    baseURL: '/api',
    timeout: 15000,
});

export const http = <T>(options: AxiosRequestConfig) => {
    const hide = message.loading('Action in progress..', 0)
    return new Promise<Data<T>>((resolve, reject) => {
        instance.request({
            ...options,
            headers: {
                'Authorization': localStorage.getItem(Keys.token)
            }
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

export const http_post = <T>(options: AxiosRequestConfig) => {
    return http<T>({
            ...options,
            method: 'post'
        }
    )
}

export const http_get = <T>(options: AxiosRequestConfig) => {
    return http<T>({
            ...options,
            method: 'get'
        }
    )
}
