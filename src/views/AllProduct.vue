<script setup lang="ts">
import { CategoryResult } from "../service/response-type"
import { getCategories } from "../service/api/category"
import { reactive, onMounted } from "vue"
import CategoryProductList from "../components/CategoryProductList.vue";

interface OrderItem {
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
    <div class="w-11/12 my-2 text-end">
        <button class="right-0 top-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit your order
        </button>
    </div>

    <template v-for="category in categories">
        <CategoryProductList :category-id="category.id!" :add-order-item="addOrderItem"
            :remove-order-item="removeOrderItem"></CategoryProductList>
    </template>
</template>

<style scoped></style>
