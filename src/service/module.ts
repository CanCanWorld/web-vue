import {http} from "../common/http.ts";
import {Api} from "../common/api.ts";
import {ModuleType} from "../type/module.ts";

export const queryModuleApi = () => {
    return http<ModuleType[]>({
        url:  Api.queryModule,
        method: 'post'
    })
}