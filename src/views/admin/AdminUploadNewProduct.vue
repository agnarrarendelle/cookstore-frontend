<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import ProductUploadForm from '../../components/ProductUploadForm.vue';
import { getCategories } from '../../service/api/category';
import { CategoryResult } from '../../service/response-type';

const categories = reactive<CategoryResult[]>([])

onMounted(async () => {
    console.log("here")
    const res = await getCategories()
    categories.push(...res.data)
    console.log(res)
})

const isModalOpen = ref(false)
const selectedCategoryIndex = ref(-1)

const openModal = (index: number) => {
    selectedCategoryIndex.value = index
    isModalOpen.value = true
}

const closeModal = () => {
    console.log("in close")
    isModalOpen.value = false
}
</script>
<template>
    <ul>
        <li @click="openModal(index)" v-for="(c, index) in categories">{{ c.name }}</li>
    </ul>
    <template v-if="isModalOpen">
        <ProductUploadForm :category-id="categories[selectedCategoryIndex].id!"
            :category-name="categories[selectedCategoryIndex].name" :close-modal="closeModal"></ProductUploadForm>
    </template>
</template>

<style scoped></style>
