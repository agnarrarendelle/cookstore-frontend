<script setup lang="ts">
import { CategoryResult } from "../service/response-type"
import { getCategories } from "../service/api/category"
import { reactive, onMounted } from "vue"
import CategoryProductList from "../components/CategoryProductList.vue";
onMounted(async () => {
    const res = await getCategories()
    categories.push(...res.data)
})

const categories = reactive<CategoryResult[]>([])


</script>
<template>
    <h1>This is product page</h1>
    <template v-for="category in categories">
        <CategoryProductList :category-id="category.id!"></CategoryProductList>
    </template>
</template>

<style scoped></style>
