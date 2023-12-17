<script setup lang="ts">
import { FwbModal, FwbButton } from "flowbite-vue"
import { OrderItem } from "../views/AllProduct.vue";

const props = defineProps<{
    orderItems: Map<number, OrderItem>,
    removeOrderItem: (productId: number) => void
    closeModal: () => void
}>()

const onSubmit = async () => {

}


</script>
<template>
    <FwbModal @close="props.closeModal">
        <template #header>
            <div class="flex items-center text-lg">
                Your Order: {{ props.orderItems.size }}
            </div>
            <!-- <div v-if="isShowSuccessText" class="flex items-left text-lg">
                Added to cart!
            </div> -->
        </template>
        <template #body>
            <ul class="bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto">
                <li v-for="[productId, orderItem] in props.orderItems">
                    <div class="px-4 py-5 sm:px-6">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">{{ orderItem.name }}</h3>
                            <p class="mt-1 max-w-2xl text-sm text-gray-500">x {{ orderItem.number }}</p>
                        </div>
                        <div class="mt-4 flex items-center justify-between">
                            <p class="text-lg font-medium text-gray-500"><span class="text-green-600">${{ orderItem.number *
                                orderItem.price }}</span>
                            </p>
                            <h6 @click="props.removeOrderItem(productId)"
                                class="font-medium text-indigo-600 hover:text-indigo-500">Remove</h6>
                        </div>
                    </div>
                </li>

            </ul>
        </template>
        <template #footer>
            <div v-if="props.orderItems.size > 0" class="flex justify-between">
                <fwb-button :disabled="false" @click="onSubmit" gradient="cyan-blue">
                    Submit
                </fwb-button>
            </div>
        </template>

    </FwbModal>
</template>

<style scoped></style>
