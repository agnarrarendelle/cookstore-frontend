<script setup lang="ts">
import { FwbModal, FwbButton } from "flowbite-vue"
import { OrderResult } from "../service/response-type";

const props = defineProps<{
    order: OrderResult
    closeModal: () => void,
}>()

</script>
<template>
    <FwbModal size="5xl" @close="props.closeModal">
        <template #header>
            <div
                class="w-2/4 flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
                <p class="font-semibold text-gray-800">Order {{ props.order.id }}</p>
                <fwb-button :disabled="true" color="default" size="xl">
                    {{ props.order.status }}
                </fwb-button>
            </div>
        </template>
        <template #body>
            <div class="flex flex-col px-6 py-5 bg-gray-50">
                <template v-if="props.order.remark.length > 0">
                    <p class="mb-2 font-semibold text-gray-700">Remark</p>
                    <textarea type="text" :placeholder="props.order.remark"
                        class="pointer-events-none p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-36"></textarea>
                </template>
                <div class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
                    <div class="w-full sm:w-1/2">
                        <p class="mb-2 font-semibold text-gray-700">Total Amount</p>
                        <p type="text" class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none">
                            {{ props.order.totalAmount }}
                        </p>
                    </div>
                    <div class="w-full sm:w-1/2 mt-2 sm:mt-0">
                        <p class="mb-2 font-semibold text-gray-700">Actual Amount</p>
                        <p type="text" class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none">
                            {{ props.order.actualAmount }}
                        </p>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
                    <div class="w-full sm:w-1/2">
                        <p class="mb-2 font-semibold text-gray-700">Table Number</p>
                        <p type="text" class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none">
                            {{ props.order.tableNumber }}
                        </p>
                    </div>
                    <div class="w-full sm:w-1/2 mt-2 sm:mt-0">
                        <p class="mb-2 font-semibold text-gray-700">Customer Name</p>
                        <p type="text" class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none">
                            {{ props.order.customerName }}
                        </p>
                    </div>
                </div>
                <hr />
                <table class="w-full">
                    <thead>
                        <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                            <th class="px-5 py-3">Product Name</th>
                            <th class="px-5 py-3">Number</th>
                            <th class="px-5 py-3">Total Fees</th>
                            <th class="px-5 py-3">Actual Fees</th>
                            <th class="px-5 py-3">Discount</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-500">
                        <tr class="cursor-pointer" v-for="item in props.order.orderItems">
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p class="whitespace-no-wrap">{{ item.productName }}</p>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p class="whitespace-no-wrap">x{{ item.number }}</p>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p class="whitespace-no-wrap">{{ item.totalAmount }}$</p>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p class="whitespace-no-wrap">{{ item.actualAmount }}$</p>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p class="whitespace-no-wrap">{{ item.discount > 0 ? item.discount : "" }}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-between">
            </div>
        </template>

    </FwbModal>
</template>

<style scoped></style>
