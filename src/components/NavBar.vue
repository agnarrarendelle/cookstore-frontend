<script setup lang="ts">

import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#545c64" active-text-color="#ffd04b"
        text-color="#fff" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item index="0">
            <img style="width: 100px" src="/images/element-plus-logo.svg" alt="Element logo" />
        </el-menu-item>
        <div class="flex-grow" />
        <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>

        </el-sub-menu>
    </el-menu>
</template>

<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>
