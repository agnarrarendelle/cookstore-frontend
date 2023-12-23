<script setup lang="ts">
import { FwbModal } from "flowbite-vue"
import { reactive, ref } from "vue";
import { ProductResult, CategoryResult } from "../service/response-type";
import { ProductBody, ProductStatus } from "../service/request-body-types";
import { updateProduct } from "../service/api/admin/product";
const props = defineProps<{
    category: CategoryResult
    product: ProductResult
    closeModal: () => void,
}>()

const emit = defineEmits<{
    (e: 'changeProduct', product:ProductBody): ProductBody
}>()

const product: typeof props.product = reactive({ ...props.product })
const isAvailable = ref(product.status === ProductStatus.Available ? true : false)
const isSubmitting = ref(false)

const isFormValid = () => {
    if (!(1 <= product.name.length && product.name.length <= 200)) {
        alert("product name must be between 1 and 200 characters")
        return false
    }
    if (!(product.name.length <= 500)) {
        alert("product description cannot exceed 500 characters")
        return false
    }
    if (!(/^([1-9][0-9]{0,2}|1000)$/.test(`${product.price}`))) {
        alert("product price must be between 1 and 1000")
        return false
    }

    if (!(/^(?:0(?:\.\d{1,2})?|1(?:\.0{1,2})?)$/.test(`${product.discount}`))) {
        alert("product discount must be between 0.00 and 1.00")
        return false
    }

    return true

}

const onSubmitClicked = async () => {
    console.log(product)
    console.log(isAvailable.value)

    if (!isFormValid())
        return

    const body: ProductBody = {
        productId: props.product.id,
        name: product.name,
        isAvailable: isAvailable.value,
        description: product.description,
        price: product.price,
        discount: product.discount,
        categoryId: props.category.id!,
    }

    isSubmitting.value = true

    try {
        await updateProduct(product.id, body)
        alert("Product updated successdully")
        emit("changeProduct", body)
        props.closeModal()
    } catch (e) {
        alert("Product updated failed")
    } finally {
        isSubmitting.value = false
    }
}
</script>
<template>
    <FwbModal size="5xl" @close="props.closeModal">
        <template #header>
            <div class="flex items-center text-lg">
                {{ product.name }}
            </div>
        </template>
        <template #body>
            <!-- <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {{ product.description }}
            </p> -->
            <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div class="lg:col-span-2">
                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                            <div class="md:col-span-5">
                                <label for="full_name">Name</label>
                                <input minlength="3" maxlength="5" v-model="product.name" :placeholder="product.name"
                                    type="text" name="full_name" id="full_name"
                                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                            </div>
                            <div class="md:col-span-5">
                                <label for="description">Description</label>
                                <input v-model="product.description" :placeholder="product.description" type="text"
                                    name="description" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                            </div>

                            <div class="md:col-span-3">
                                <label for="price">Price</label>
                                <input v-model.number="product.price" :placeholder="`${product.price}`" type="number"
                                    name="price" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                            </div>

                            <div class="md:col-span-2">
                                <label for="discount">Discount</label>
                                <input v-model.number="product.discount" :placeholder="`${product.discount}`" type="number"
                                    name="discount" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                            </div>
                            <div class="md:col-span-2">
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input v-model="isAvailable" type="checkbox" value="" class="sr-only peer"
                                        :checked="isAvailable">
                                    <div
                                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                    </div>
                                    <span
                                        class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Available?</span>
                                </label>
                            </div>
                            <div class="md:col-span-5 text-right">
                                <div class="inline-flex items-end">
                                    <button :disabled="isSubmitting" @click="onSubmitClicked"
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-between">

            </div>
        </template>

    </FwbModal>
</template>

<style scoped></style>
