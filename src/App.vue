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
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-modal v-model:open="open" :ok-button-props="{enabled: true}" title="Basic Modal">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-modal>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {queryModuleApi} from "./service/module.ts";

const items = ref<MenuType[]>([]);

interface MenuType {
    key: string,
    label: string
}

const open = ref<boolean>(false);

const showModal = () => {
    open.value = true;
};

const queryModule = async () => {
    const res = await queryModuleApi()
    console.log(res.data)
    res.data.forEach(item => {
        items.value.push(<MenuType>{
            key: item.ID,
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
</style>
