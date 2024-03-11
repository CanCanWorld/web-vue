<template>
  <div class="main-box">
    <div class="menu-box">
      <a-menu
          class="menu"
          mode="inline"
          theme="dark"
          :items="items"
      ></a-menu>
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
import {loginOrRegisterApi, queryModuleApi} from "./service/module.ts";
import {openLogin} from "./common/http.ts";
import {message} from "ant-design-vue";

const items = ref<{ key: string, label: string }[]>([])
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

onMounted(() => {
  queryModule()
})

</script>

<style scoped>
.main-box {
  width: 100%;


  .menu-box {
    padding: 20px;
    width: 20%;

    .menu {
      height: 100%;
    }
  }
}

button {
  width: 100%;
}
</style>
