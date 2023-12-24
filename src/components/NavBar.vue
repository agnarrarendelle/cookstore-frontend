<script setup lang="ts">

import {
    FwbNavbar,
    FwbNavbarCollapse,
    FwbNavbarLink,
} from 'flowbite-vue'


</script>
<template>
    <fwb-navbar class="border-gray-200 p-3 bg-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <template #default="{ isShowMenu }">
            <fwb-navbar-collapse :is-show-menu="isShowMenu">
                <fwb-navbar-link>
                    <router-link to="/admin/products">products</router-link>
                </fwb-navbar-link>
                <fwb-navbar-link>
                    <router-link to="/admin/upload-product">upload product</router-link>
                </fwb-navbar-link>
                <fwb-navbar-link>
                    <router-link to="/admin/unpaid-orders">unpaid orders</router-link>
                </fwb-navbar-link>
                <fwb-navbar-link>
                    <router-link to="/admin/categories">categories</router-link>
                </fwb-navbar-link>
            </fwb-navbar-collapse>
        </template>
    </fwb-navbar>
</template>

<style scoped></style>
