<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { CategoryResult } from '../service/response-type';
import { getCategoriesWithProducts } from '../service/api/category';
import EditProductModal from './EditProductModal.vue';
import { ProductBody, ProductStatus } from '../service/request-body-types';
const categories = reactive<CategoryResult[]>([])
const isModalOpen = ref(false)
const selectedCategoryIndex = ref(-1)
const selectedProductIndex = ref(-1)

onMounted(async () => {
    const res = await getCategoriesWithProducts();
    categories.push(...res.data)
})

const openModal = (categoryIndex: number, productIndex: number) => {
    selectedCategoryIndex.value = categoryIndex
    selectedProductIndex.value = productIndex
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const onProductChange = (product: ProductBody) => {
    const oldProduct = categories
        .find(c => c.id === product.categoryId)
        ?.products.find(p => p.id === product.productId)!

    oldProduct.name = product.name
    oldProduct.description = product.description
    oldProduct.price = product.price
    oldProduct.discount = product.discount
    oldProduct.status = product.isAvailable ? ProductStatus.Available : ProductStatus.Unavailable

}
</script>
<template>
    <div class="container mx-auto">
        <div v-for="(category, cIndex) in categories" class="py-20">
            <div class="flex items-center justify-between pb-6">
                <div>
                    <h2 class="font-semibold text-gray-700">{{ category.name }}</h2>
                </div>
            </div>
            <div class="flex items-center px-5 py-2">
                <span v-for="label in ['Name', 'Price', 'Discount', 'Status']" class="w-1/2">
                    <span class="text-xs uppercase text-gray-600 font-bold">{{ label }}</span>
                </span>
            </div>
            <div @click="openModal(cIndex, pIndex)" v-for="( product, pIndex ) in  category.products"
                class="hover:bg-gray-200 cursor-pointer bg-white shadow flex p-5 items-center mb-5 rounded-lg">
                <div class="w-1/4">
                    <span class="capitalize text-gray-600 text-sm">{{ product.name }}</span>
                </div>
                <div class="w-1/4">
                    <span class="capitalize text-gray-600 text-sm">{{ product.price }}</span>
                </div>
                <div class="w-1/4">
                    <span class="capitalize text-gray-600 text-sm">{{ product.discount }}</span>
                </div>
                <div class="w-1/4">
                    <span class="capitalize text-gray-600 text-sm">{{ product.status }}</span>
                </div>
            </div>
        </div>
    </div>
    <template v-if="isModalOpen">
        <EditProductModal @changeProduct="(product) => onProductChange(product)"
            :category="categories[selectedCategoryIndex]"
            :product="categories[selectedCategoryIndex].products[selectedProductIndex]" :close-modal="closeModal">
        </EditProductModal>
    </template>
</template>

<style scoped></style>
