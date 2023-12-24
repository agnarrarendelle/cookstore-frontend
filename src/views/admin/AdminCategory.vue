<script setup lang="ts">
import { onMounted, reactive } from "vue";
import CategoryList from "../../components/CategoryList.vue"
import { getCategories } from "../../service/api/category";
onMounted(async () => {
    const res = await getCategories()
    categories.push(...res.data.map(c=>c.name))
})
const categories = reactive<string[]>([])

</script>
<template>
    <h1>This is admin product page</h1>
    <CategoryList :categories="categories"></CategoryList>
</template>

<style scoped></style>
