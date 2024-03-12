import {http, http_post} from "../common/http.ts";
import {Api} from "../common/api.ts";
import {ModuleType} from "../type/module.ts";
import {Token} from "../type/base.ts";

export const loginOrRegisterApi = (
    username: string,
    password: string
) => {
    return http<Token>({
        url: Api.loginOrRegister,
        method: 'post',
        data: {
            username,
            password
        }
    })
}
export const queryModuleApi = () => {
    return http_post<ModuleType[]>({
        url: Api.queryModule,
    })
}

export const queryArticleApi = () => {
    return http_post<ModuleType[]>({
        url: Api.queryArticle,
    })
}
