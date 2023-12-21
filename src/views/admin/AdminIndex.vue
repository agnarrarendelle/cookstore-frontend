<script setup lang="ts">
import { getUnpaidOrders } from "../../service/api/admin/orders";
import { useStore } from "../../state"
import { onMounted } from "vue"
import { MutationTypes } from "../../state/mutation-types";
import NavBar from "../../components/NavBar.vue"

const store = useStore()

onMounted(async () => {
    const res = await getUnpaidOrders()
    store.commit(MutationTypes.SET_UNPAID_ORDERS, res.data)
    store.commit(MutationTypes.INIT_WEB_SOCKET, { serverUrl: '', subscribeUrl: ''})
})

</script>
<template>
    <NavBar></NavBar>
    <router-view ></router-view>
</template>

<style scoped></style>
