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
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {queryModuleApi} from "./service/module.ts";

const items = ref<{ key: string, label: string }[]>([]);

const queryModule = async () => {
  const res = await queryModuleApi()
  console.log(res.data)
  res.data.forEach(item => {
    items.value.push({
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
