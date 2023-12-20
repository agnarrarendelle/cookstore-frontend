<script setup lang="ts">
import { getUnpaidOrders } from "../../service/api/admin/orders";
import { OrderResult } from "../../service/response-type";
import { useStore } from "../../state"
import { onMounted, reactive } from "vue"
import { MutationTypes } from "../../state/mutation-types";
import OrderListVue from "../../components/OrderList.vue";
const store = useStore()

const unpaidProducts = reactive<OrderResult[]>([])

onMounted(async () => {
    const res = await getUnpaidOrders()
    unpaidProducts.push(...res.data)
    store.commit(MutationTypes.INIT_WEB_SOCKET, { serverUrl: '', subscribeUrl: '', orders: unpaidProducts })
})

</script>
<template>
    <OrderListVue :orders="unpaidProducts"></OrderListVue>
</template>

<style scoped></style>
