<template>
    <div class="main-box">
        <div class="menu-box">
            <a-card hoverable>
                <a-menu
                        v-if="items.length"
                        v-model:selectedKeys="selectedKeys"
                        class="menu"
                        mode="inline"
                        :items="items"
                ></a-menu>
            </a-card>
        </div>
        <div class="center-box">
            <ListItem>
            </ListItem>
        </div>
    </div>
    <a-modal v-model:open="openLogin" title="请登录">
        <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 4 }"
                autocomplete="off"
        >
            <a-form-item
                    label="用户名"
                    name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }]"
            >
                <a-input v-model:value="formState.username"/>
            </a-form-item>

            <a-form-item
                    label="密码"
                    name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]"
            >
                <a-input-password v-model:value="formState.password"/>
            </a-form-item>
            <a-button type="primary" html-type="submit" @click="onLoginClick">登录 / 注册</a-button>
        </a-form>
        <template v-slot:footer>
        </template>
    </a-modal>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {loginOrRegisterApi, queryArticleApi, queryModuleApi} from "./service/module.ts";
import {openLogin} from "./common/http.ts";
import {message} from "ant-design-vue";
import {Keys} from "./common/constants.ts";
import ListItem from "./components/ListItem.vue";

const items = ref<{ key: string, label: string }[]>([])
const selectedKeys = ref(['1'])


interface FormState {
    username: string;
    password: string;
}

const formState = ref<FormState>({
    username: '',
    password: '',
});

const onLoginClick = async () => {
    console.log('login')
    if (formState.value.password == '' || formState.value.username == '') {
        return message.error('请输入账号和密码！');
    }
    const res = await loginOrRegisterApi(formState.value.username, formState.value.password)
    localStorage.setItem(Keys.token, res.data.token)
    location.reload()
}

const queryModule = async () => {
    const res = await queryModuleApi()
    console.log(res.data)
    res.data.forEach(item => {
        items.value.push({
            key: item.ID.toString(),
            label: item.Title
        })
    })
}
const queryArticle = async () => {
    const res = await queryArticleApi()
    console.log(res.data)
}

onMounted(() => {
    queryModule()
    queryArticle()
})

</script>

<style scoped>
.main-box {
    width: 100%;
    display: flex;
    flex-direction: row;

    .menu-box {
        padding: 20px;
        width: 200px;

        .menu {
            height: 100%;
        }
    }

    .center-box {
        width: 100%;
        padding: 30px;
    }
}

button {
    width: 100%;
}
</style>
