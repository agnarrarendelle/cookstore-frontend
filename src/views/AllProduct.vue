<script setup lang="ts">
import { CategoryResult } from "../service/response-type"
import { getCategoriesWithProducts } from "../service/api/category"
import { reactive, onMounted, ref } from "vue"
import CategoryProductList from "../components/CategoryProductList.vue";
import SubmitOrderModal from "../components/SubmitOrderModal.vue";
import { OrderItemBody, ProductStatus } from "../service/request-body-types";

const tableNumber = 10;

onMounted(async () => {
    const res = await getCategoriesWithProducts(ProductStatus.Available)
    categories.push(...res.data)
})

const categories = reactive<CategoryResult[]>([])
const orderItems = reactive<Map<number, OrderItemBody>>(new Map())
const isOrderSubmitModalOpen = ref(false)

const addOrderItem = (productId: number, productName: string, price: number, number: number) => {
    if (orderItems.has(productId)) {
        orderItems.get(productId)!.number += number
        return
    }

    const newOrderItem: OrderItemBody = { price, productId, productName, number }
    orderItems.set(productId, newOrderItem)
}


const removeOrderItem = (id: number) => {
    orderItems.delete(id)
}
</script>
<template>
    <div class="mx-auto flex flex-col justify-center bg-red-800 py-2">
        <div>
            <ul class="flex flex-row gap-4 overflow-y-auto">
                <li v-for="category in categories" class="px-4 py-2 bg-gray-800 rounded-full">
                    <a @click="(e)=>e.preventDefault()" :href="`#${category.name}`">{{category.name}}</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="w-11/12 my-2 text-end" @click="() => isOrderSubmitModalOpen = true">
        <button class="right-0 top-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit your order
        </button>
    </div>

    <template v-for="category in categories">
        <CategoryProductList :category="category" :add-order-item="addOrderItem" :remove-order-item="removeOrderItem">
        </CategoryProductList>
    </template>

    <template v-if="isOrderSubmitModalOpen">
        <SubmitOrderModal :table-number="tableNumber" :order-items="orderItems" :remove-order-item="removeOrderItem"
            :close-modal="() => isOrderSubmitModalOpen = false">
        </SubmitOrderModal>
    </template>
</template>

<style scoped></style>
