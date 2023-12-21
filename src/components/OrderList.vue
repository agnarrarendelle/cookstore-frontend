<script setup lang="ts">
import { reactive, ref } from 'vue';
import { setOrderStatusCancelled, setOrderStatusPaid } from '../service/api/admin/orders';
import { OrderResult } from '../service/response-type';
import { useStore } from "../state/index"
import { FwbButton } from "flowbite-vue"
import OrderDetailModal from './OrderDetailModal.vue';
import { MutationTypes } from '../state/mutation-types';

const store = useStore()


const isModalOpen = ref(false)
const selectedOrder = reactive<OrderResult>({
    id: 0,
    status: "",
    totalAmount: 0,
    actualAmount: 0,
    remark: "",
    customerName: "",
    tableNumber: 0,
    orderItems: []
})

const openModal = (order: OrderResult) => {
    Object.assign(selectedOrder, order)
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const onSetPaidButtonClicked = async (index: number, orderId: number) => {
    await setOrderStatusPaid(orderId)
    store.commit(MutationTypes.MARK_ORDER_PAID, index)
}

const onCancelButtonClicked = async (index: number, orderId: number) => {
    await setOrderStatusCancelled(orderId)
    store.commit(MutationTypes.CANCEL_ORDER, index)
}
</script>
<template>
    <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div class="flex items-center justify-between pb-6">
            <div>
                <h2 class="font-semibold text-gray-700">New Orders</h2>
            </div>
        </div>
        <div class="overflow-y-hidden rounded-lg border">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                            <th class="px-5 py-3">ID</th>
                            <th class="px-5 py-3">Table Number</th>
                            <th class="px-5 py-3">Order Items</th>
                            <th class="px-5 py-3">Total Fees</th>
                            <th class="px-5 py-3">Status</th>
                            <th class="px-5 py-3">Remark</th>
                            <th class="px-5 py-3">Set Paid</th>
                            <th class="px-5 py-3">Cancel</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-500">
                        <tr class="cursor-pointer" v-for="(order, index) in store.getters.orders" @click="openModal(order)">
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p class="whitespace-no-wrap">{{ order.id }}</p>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <div class="flex items-center">
                                    <div class="ml-3">
                                        <p class="whitespace-no-wrap">{{ order.tableNumber }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <div class="whitespace-no-wrap">
                                    <ul>
                                        <li v-for="i in order.orderItems">{{ i.productName }} x{{ i.number }}</li>
                                    </ul>
                                </div>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p class="whitespace-no-wrap">{{ order.actualAmount }}$</p>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <span class="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">{{
                                    order.status }}</span>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p class="whitespace-no-wrap">{{ order.remark.length > 0 ? ".........." : "" }}</p>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <fwb-button gradient="cyan-blue" size="xs"
                                    @click.stop="async () => { await onSetPaidButtonClicked(index, order.id) }">
                                    Set Paid
                                </fwb-button>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <fwb-button color="red" pill size="xs"
                                    @click.stop="async () => { await onCancelButtonClicked(index, order.id) }">
                                    Cancel
                                </fwb-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <template v-if="isModalOpen">
        <OrderDetailModal :close-modal="closeModal" :order="selectedOrder"></OrderDetailModal>
    </template>
</template>

<style scoped></style>
