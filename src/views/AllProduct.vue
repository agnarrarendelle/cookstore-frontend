<script setup lang="ts">
import { CategoryResult } from "../service/response-type"
import { getCategories } from "../service/api/category"
import { reactive, onMounted, ref } from "vue"
import CategoryProductList from "../components/CategoryProductList.vue";
import SubmitOrderModal from "../components/SubmitOrderModal.vue";
export interface OrderItem {
    name: string,
    price: number,
    number: number
}
onMounted(async () => {
    const res = await getCategories()
    categories.push(...res.data)
})

const categories = reactive<CategoryResult[]>([])
const orderItems = reactive<Map<number, OrderItem>>(new Map())
const isOrderSubmitModalOpen = ref(false)

const addOrderItem = (id: number, name: string, price: number, number: number) => {
    if (orderItems.has(id)) {
        orderItems.get(id)!.number += number
        return
    }

    const newOrderItem: OrderItem = { name, price, number }
    orderItems.set(id, newOrderItem)
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
        <CategoryProductList :category-id="category.id!" :add-order-item="addOrderItem"
            :remove-order-item="removeOrderItem"></CategoryProductList>
    </template>

    <template v-if="isOrderSubmitModalOpen">
        <SubmitOrderModal :order-items="orderItems" :remove-order-item="removeOrderItem"
            :close-modal="() => isOrderSubmitModalOpen = false">
        </SubmitOrderModal>
    </template>
</template>

<style scoped></style>
