<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { CategoryResult } from "../service/response-type"
import { getCategoryWithProduct } from "../service/api/category"
import ProductDetailModal from './ProductDetailModal.vue';
onMounted(async () => {
    const res = await getCategoryWithProduct(props.categoryId)

    const { id, name, products } = res.data
    category.id = id
    category.name = name
    category.products = products
})

const props = defineProps<{
    categoryId: number
    addOrderItem: (id: number, name: string, price: number, number: number) => void
    removeOrderItem: (id: number) => void
}>()

const category = reactive<CategoryResult>(
    {
        name: '',
        id: null,
        products: []
    })

const selectedProduct = reactive({
    id: 0,
    name: '',
    description: '',
    price: 0,
    discount: 0
})

const isModalOpen = ref(false)

const openModal = (id: number, name: string, description: string, price: number, discount: number) => {
    Object.assign(selectedProduct, { id, name, description, price, discount })
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

</script>
<template>
    <h5 class="text-center">{{ category.name }}</h5>
    <div class="p-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            <template v-for=" product in category.products">
                <div class="overflow-hidden rounded-2xl bg-gray-50">
                    <div class="flex items-center h-[180px] overflow-hidden">
                        <img src="https://thumbnails.production.thenounproject.com/c4UZhX8RJFowtAoq8OZlUjIFmBg=/fit-in/1000x1000/photos.production.thenounproject.com/photos/D0EE41F3-3CB3-4F1E-B6E5-4CCE5B1DCB17.jpg"
                            alt="Hamburger" />
                    </div>

                    <div class="p-6">
                        <div class="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                            <div>
                                <p class="text-gray-400">{{ category.name }}</p>
                                <h2 class="mt-2 text-lg font-semibold text-gray-800">{{ product.name }}</h2>
                            </div>
                            <div v-if="product.discount > 0">
                                <h2 class="mt-2 text-lg font-semibold text-red-500">{{ product.discount * 100 }}%OFF</h2>
                            </div>
                            <div class="w-full text-end"
                                @click="openModal(product.id, product.name, product.description, product.price, product.discount)">
                                <span
                                    class="min-w-full text-center mt-2 inline-block rounded-full bg-orange-400 p-3 text-lg font-medium text-white">{{
                                        product.price }}$
                                </span>
                            </div>
                        </div>

                        <!-- <hr class="mt-4 mb-4" />

                        <div class="flex flex-wrap justify-between">
                            <p class="inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-orange-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                                <span class="ml-2 text-gray-600">10 - 15 Mins</span>
                                <span class="mx-2">•</span>
                                <span class="text-gray-400">1Km</span>
                            </p>
                        </div> -->
                    </div>
                </div>
            </template>
        </div>
    </div>

    <template v-if="isModalOpen">
        <ProductDetailModal :category-name="category.name" :is-modal-open="isModalOpen" :close-modal="closeModal"
            :product-id="selectedProduct.id" :product-name="selectedProduct.name"
            :product-description="selectedProduct.description" :price="selectedProduct.price"
            :discount="selectedProduct.discount" :add-order-item="props.addOrderItem">
        </ProductDetailModal>
    </template>
</template>

<style scoped>
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}
</style>
